import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const getStripe = () => {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, name, email, message, isAnonymous } = body

    // Validate amount
    if (!amount || amount < 1) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Create Stripe Checkout Session
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: "Support Gayle's Art",
              description: message
                ? `Donation with message: "${message.slice(0, 100)}${message.length > 100 ? '...' : ''}"`
                : 'Supporting a young artist\'s creative journey',
              images: [`${process.env.NEXT_PUBLIC_URL}/images/logo.png`],
            },
            unit_amount: Math.round(amount * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      customer_email: !isAnonymous && email ? email : undefined,
      metadata: {
        type: 'donation',
        donor_name: isAnonymous ? 'Anonymous' : (name || 'Anonymous'),
        donor_email: isAnonymous ? '' : (email || ''),
        message: message || '',
        is_anonymous: String(isAnonymous),
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/support/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/support`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
