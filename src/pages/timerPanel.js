import React, { useState, useEffect, useRef } from "react"
import Timer from "./../components/timer"
import Button from "react-bootstrap/Button"

const TimerPanel = ({ formData }) => {
  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const indexRef = useRef()
  const timeLeftRef = useRef()
  const exerciseStructure = [
    { name: "warmup", value: 2 },
    { name: "exercise1", value: 3 },
    { name: "exercise2", value: 4 },
  ]

  useEffect(() => {
    indexRef.current = index
  }, [index])

  useEffect(() => {
    timeLeftRef.current = timeLeft
  }, [timeLeft])

  useEffect(() => {
    setTimeLeft(exerciseStructure[index].value - 1)
  }, [index])

  const startTimer = () => {
    let interval = setInterval(() => {
      if (timeLeftRef.current <= 0) {
        console.log("clearInterval", indexRef.current)
        clearInterval(interval)
        if (indexRef.current < exerciseStructure.length - 1) {
          console.log("next", indexRef.current)
          setIndex(indexRef.current + 1)
          startTimer()
        } else {
          return
        }
      }
      setTimeLeft(timeLeft => {
        console.log("setTimeLeft")

        return timeLeft - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }

  return (
    <div>
      <div style={{ fontSize: "40px" }}>
        Current exercise: {exerciseStructure[index].name}
      </div>
      <Timer timeLeft={timeLeft} />
      <Button onClick={startTimer}>Start timer</Button>
    </div>
  )
}

export default TimerPanel
