import React, { useState, useEffect } from "react"
import { zeroPad } from "./../utils/timeUtils"
import "./../styles/timer.css"

const Timer = ({ timeLeft }) => (
  <div className="timer">00:{zeroPad(timeLeft)}</div>
)

export default Timer
