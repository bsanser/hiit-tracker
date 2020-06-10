import React, { useState, useEffect, useRef } from "react"
import Timer from "./../components/timer"
import Button from "react-bootstrap/Button"
import { useInterval } from "../hooks/useInterval"

const TimerPanel = ({
  index,
  timeLeft,
  exerciseStructure,
  onStartButtonClick,
}) => {
  return (
    <div>
      <div style={{ fontSize: "40px" }}>
        Current exercise: {exerciseStructure[index].name}
      </div>
      <Timer timeLeft={timeLeft} />
      <Button onClick={onStartButtonClick}>Start timer</Button>
    </div>
  )
}

export default TimerPanel
