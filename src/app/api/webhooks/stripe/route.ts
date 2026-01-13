import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export const runtime = 'edge'
import { createAdminClient } from '@/lib/supabase/server'

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'No signature' },
      { status: 400 }
    )
  }

  const stripe = getStripe()
  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      // Check if this is a donation
      if (session.metadata?.type === 'donation') {
        await handleDonationCompleted(session)
      }
      break
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('Payment failed:', paymentIntent.id)
      // Could update database status here
      break
    }

    default:
      console.log(`Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleDonationCompleted(session: Stripe.Checkout.Session) {
  const supabase = createAdminClient()

  const donationData = {
    amount: (session.amount_total || 0) / 100,
    currency: session.currency || 'usd',
    email: session.metadata?.is_anonymous === 'true' ? null : (session.metadata?.donor_email || null),
    name: session.metadata?.donor_name || null,
    message: session.metadata?.message || null,
    is_anonymous: session.metadata?.is_anonymous === 'true',
    stripe_payment_intent_id: session.payment_intent as string,
    status: 'paid' as const,
  }

  const { error } = await supabase
    .from('donations')
    .insert(donationData)

  if (error) {
    console.error('Failed to save donation:', error)
  } else {
    console.log('Donation saved successfully:', donationData.amount)
  }
}
