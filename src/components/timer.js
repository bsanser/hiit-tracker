import React, { useState, useEffect } from "react"
import { zeroPad } from "./../utils/timeUtils"
import { useInterval } from "../hooks/useInterval"

const Timer = ({ timeLeft }) => (
  <div style={{ fontSize: "150px" }}>00:{zeroPad(timeLeft)}</div>
)

export default Timer