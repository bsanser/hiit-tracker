import React, { useState, useEffect } from "react"
import Timer from "./../components/timer"
import Button from "react-bootstrap/Button"

const TimerPanel = ({ formData }) => {
  let [index, setIndex] = useState(0)
  let [timeLeft, setTimeLeft] = useState(0)
  const exerciseStructure = [{ warmup: 2 }, { exercise1: 10 }, { exercise2: 5 }]

  useEffect(() => {
    setTimeLeft(Object.values(exerciseStructure[index])[0])
  }, [index])

  const handleChangeIndex = () => {
    setIndex(index++)
  }

  const startTimer = () => {
    let interval = setInterval(() => {
      setTimeLeft(timeLeft--)
      if (timeLeft < 0) {
        handleChangeIndex()
        clearInterval(interval)
      }
    }, 1000)
    return () => clearInterval(interval)
  }

  return (
    <div>
      <div style={{ fontSize: "40px" }}>
        Current exercise: {Object.keys(exerciseStructure[index])[0]}{" "}
      </div>
      <Timer timeLeft={timeLeft} />
      <Button onClick={startTimer}>Start timer</Button>
    </div>
  )
}

export default TimerPanel
