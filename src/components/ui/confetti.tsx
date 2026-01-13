'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ConfettiPiece {
  id: number
  x: number
  color: string
  rotation: number
  scale: number
  type: 'circle' | 'square' | 'star' | 'heart'
}

const colors = [
  '#FF6B6B', // coral
  '#C9B1FF', // lavender
  '#98D8AA', // mint
  '#FFE66D', // sunshine
  '#FFB5BA', // blush
  '#FF9F43', // orange
  '#54A0FF', // blue
]

const confettiTypes = ['circle', 'square', 'star', 'heart'] as const

function ConfettiShape({ type, color }: { type: string; color: string }) {
  switch (type) {
    case 'circle':
      return <circle cx="6" cy="6" r="6" fill={color} />
    case 'square':
      return <rect width="10" height="10" rx="2" fill={color} />
    case 'star':
      return (
        <path
          d="M6 0l1.8 3.6L12 4.4l-3 2.9.7 4.1L6 9.2l-3.7 2.2.7-4.1L0 4.4l4.2-.8L6 0z"
          fill={color}
        />
      )
    case 'heart':
      return (
        <path
          d="M6 10.8l-.7-.6C2.4 7.5 0 5.3 0 2.9 0 1 1.5 0 3.3 0c1 0 2 .5 2.7 1.2C6.7.5 7.7 0 8.7 0 10.5 0 12 1 12 2.9c0 2.4-2.4 4.6-5.3 7.3l-.7.6z"
          fill={color}
        />
      )
    default:
      return <circle cx="6" cy="6" r="6" fill={color} />
  }
}

interface ConfettiProps {
  isActive: boolean
  duration?: number
  pieces?: number
}

export function Confetti({ isActive, duration = 3000, pieces = 50 }: ConfettiProps) {
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([])

  const generateConfetti = useCallback(() => {
    const newPieces: ConfettiPiece[] = Array.from({ length: pieces }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage across screen
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      type: confettiTypes[Math.floor(Math.random() * confettiTypes.length)],
    }))
    setConfettiPieces(newPieces)
  }, [pieces])

  useEffect(() => {
    if (isActive) {
      generateConfetti()
      const timer = setTimeout(() => {
        setConfettiPieces([])
      }, duration)
      return () => clearTimeout(timer)
    }
  }, [isActive, duration, generateConfetti])

  return (
    <AnimatePresence>
      {confettiPieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{
                x: `${piece.x}vw`,
                y: -20,
                rotate: piece.rotation,
                scale: piece.scale,
                opacity: 1,
              }}
              animate={{
                y: '110vh',
                rotate: piece.rotation + Math.random() * 720 - 360,
                x: `${piece.x + (Math.random() * 20 - 10)}vw`,
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2 + Math.random() * 2,
                ease: 'easeIn',
              }}
              className="absolute"
            >
              <svg width="12" height="12" viewBox="0 0 12 12">
                <ConfettiShape type={piece.type} color={piece.color} />
              </svg>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

// Celebration burst effect from a point
interface CelebrationBurstProps {
  isActive: boolean
  originX?: number
  originY?: number
  pieces?: number
}

export function CelebrationBurst({
  isActive,
  originX = 50,
  originY = 50,
  pieces = 30,
}: CelebrationBurstProps) {
  const [burstPieces, setBurstPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (isActive) {
      const newPieces: ConfettiPiece[] = Array.from({ length: pieces }, (_, i) => ({
        id: i,
        x: originX,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: 0.5 + Math.random() * 0.5,
        type: confettiTypes[Math.floor(Math.random() * confettiTypes.length)],
      }))
      setBurstPieces(newPieces)

      const timer = setTimeout(() => {
        setBurstPieces([])
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isActive, originX, originY, pieces])

  return (
    <AnimatePresence>
      {burstPieces.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          {burstPieces.map((piece, i) => {
            const angle = (i / pieces) * Math.PI * 2
            const distance = 100 + Math.random() * 200
            const targetX = originX + Math.cos(angle) * distance * (window.innerWidth / 100)
            const targetY = originY + Math.sin(angle) * distance * (window.innerHeight / 100)

            return (
              <motion.div
                key={piece.id}
                initial={{
                  left: `${originX}%`,
                  top: `${originY}%`,
                  rotate: 0,
                  scale: 0,
                  opacity: 1,
                }}
                animate={{
                  left: targetX,
                  top: targetY,
                  rotate: piece.rotation + 360,
                  scale: piece.scale,
                  opacity: 0,
                }}
                transition={{
                  duration: 1 + Math.random() * 0.5,
                  ease: 'easeOut',
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <svg width="12" height="12" viewBox="0 0 12 12">
                  <ConfettiShape type={piece.type} color={piece.color} />
                </svg>
              </motion.div>
            )
          })}
        </div>
      )}
    </AnimatePresence>
  )
}

// Hook for triggering confetti
export function useConfetti() {
  const [isActive, setIsActive] = useState(false)

  const trigger = useCallback(() => {
    setIsActive(true)
    setTimeout(() => setIsActive(false), 100)
  }, [])

  return { isActive, trigger }
}
