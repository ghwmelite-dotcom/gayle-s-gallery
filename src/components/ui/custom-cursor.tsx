'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[data-hoverable]') ||
        target.classList.contains('artwork-card')
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseOut = () => {
      setIsHovering(false)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null
  }

  return (
    <>
      {/* Main paintbrush cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovering ? 1.5 : 1,
            rotate: isHovering ? 15 : 0,
          }}
          transition={{ duration: 0.15 }}
          className="relative -translate-x-1 -translate-y-1"
        >
          {/* Paintbrush SVG */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-all duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Brush handle */}
            <path
              d="M26 2L30 6L12 24L8 20L26 2Z"
              fill={isHovering ? '#FF6B6B' : '#1a1a1a'}
              className="transition-colors duration-200"
            />
            {/* Metal ferrule */}
            <path
              d="M12 24L8 20L6 22L10 26L12 24Z"
              fill="#C0C0C0"
            />
            {/* Brush bristles */}
            <path
              d="M6 22L2 30L10 26L6 22Z"
              fill={isHovering ? '#FF6B6B' : '#8B4513'}
              className="transition-colors duration-200"
            />
            {/* Paint drip */}
            {isHovering && (
              <motion.circle
                cx="4"
                cy="28"
                r="2"
                fill="#FF6B6B"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </svg>
        </motion.div>
      </motion.div>

      {/* Paint trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-accent-coral/30"
          animate={{
            scale: isHovering ? [1, 1.5, 0] : [1, 0.5, 0],
            opacity: [0.5, 0.3, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 0.1,
          }}
        />
      </motion.div>

      {/* Hide default cursor globally */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        @media (hover: none) and (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  )
}
