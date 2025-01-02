"use client"

import { useEffect, useState } from "react"

interface CountdownTimerProps {
  endTime: Date
}

export function CountdownTimer({ endTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = endTime.getTime() - now

      if (distance < 0) {
        clearInterval(timer)
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft({ hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  return (
    <div className="grid grid-cols-3 gap-4 text-center">
      <div>
        <span className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
        <p className="text-sm">Horas</p>
      </div>
      <div>
        <span className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <p className="text-sm">Minutos</p>
      </div>
      <div>
        <span className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <p className="text-sm">Segundos</p>
      </div>
    </div>
  )
}
