import React, { useState, useEffect, useRef } from "react"
import Timer from "./../components/timer"
import Button from "react-bootstrap/Button"
import { useInterval } from "../hooks/useInterval"

const TimerPanel = ({ exerciseStructure }) => {
  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [delay, setDelay] = useState(null)

  useEffect(() => {
    setTimeLeft(exerciseStructure[index].value)
  }, [index])

  useInterval(() => {
    if (timeLeft <= 0) {
      if (index >= exerciseStructure.length - 1) {
        setDelay(null)
        return
      }
      setIndex(index + 1)
    }
    setTimeLeft(timeLeft - 1)
  }, delay)

  const handleStartButtonClick = () => {
    setDelay(1000)
  }

  return (
    <div>
      <div style={{ fontSize: "40px" }}>
        Current exercise: {exerciseStructure[index].name}
      </div>
      <Timer timeLeft={timeLeft} />
      <Button onClick={handleStartButtonClick}>Start timer</Button>
    </div>
  )
}

export default TimerPanel
