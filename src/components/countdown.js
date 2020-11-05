import React, { useState, useEffect } from "react"
import { Heading, Text } from "gestalt"
import "./countdown.css"

const divisors = {
  days: 24 * 60 * 60 * 1000,
  hours: 60 * 60 * 1000,
  minutes: 60 * 1000,
  seconds: 1000
}

const getTimeRemaining = to => to.getTime() - Date.now()

const pad = value => {
  if (value < 10) {
    return `0${value}`
  } else {
    return value
  }
}

const Countdown = ({ to, children, placeholder }) => {
  const breakdown = {}
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining(to))

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(getTimeRemaining(to))
    }, 1000)

    return () => clearTimeout(timer)
  })

  Object.keys(divisors).reduce((remainder, key) => {
    breakdown[key] = Math.floor(remainder / divisors[key])
    return remainder % divisors[key]
  }, timeRemaining)

  const { days, hours, minutes, seconds } = breakdown
  const dayLabel = days ? (
    <span>
      {days} Day{days != 1 ? "s" : ""},{" "}
    </span>
  ) : null
  const countdown = (
    <>
      <div className="countdown-container">
        <Heading accessibilityLevel={5} size="sm" align="center">
          Ready in
        </Heading>
        <div className="countdown">
          {dayLabel} {pad(hours)}:{pad(minutes)}:{pad(seconds)}
        </div>
      </div>

      {placeholder}
    </>
  )
  return timeRemaining > 0 ? countdown : children
}

export default Countdown
