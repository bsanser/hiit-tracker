import React, { useState } from "react"

import Layout from "../components/layout"
import Form from "../components/form"
import SEO from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import PlayListPlayer from "../components/playlistPlayer"
import TimerPanel from "./timerPanel"

const IndexPage = () => {
  const [isTimerCreated, setIsTimerCreated] = useState(false)
  const [formData, setFormData] = useState({})
  const [playlistUrl, setPlaylistUrl] = useState(null)

  const [exerciseStructure, setExerciseStructure] = useState([])

  const handleFormSubmit = formData => {
    setFormData(formData)
    setIsTimerCreated(true)
    setExerciseStructure([
      { name: "warmup", value: 2 },
      { name: "exercise1", value: 3 },
      { name: "exercise2", value: 4 },
    ])
  }

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <Row>
          <Col xs={12} md={6}>
            {!isTimerCreated && <Form onSubmit={handleFormSubmit} />}
            {isTimerCreated && (
              <div>
                {/* https://open.spotify.com/embed/playlist/37i9dQZF1DXbeUHEkt5uXG */}
                {/* <PlayListPlayer playlistUrl={playListUrl} /> */}
              </div>
            )}
          </Col>

          <Col xs={12} md={12}>
            {isTimerCreated && (
              <TimerPanel exerciseStructure={exerciseStructure} />
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
