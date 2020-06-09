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

  return <TimerPanel formData={formData} />

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <Row>
          <Col xs={12} md={6}>
            {!isTimerCreated && (
              <Form
                handleDisplayTimerPanel={() => setIsTimerCreated(true)}
                handleFormData={setFormData}
              />
            )}
            {isTimerCreated && (
              <div>
                {/* https://open.spotify.com/embed/playlist/37i9dQZF1DXbeUHEkt5uXG */}
                {/* <PlayListPlayer playlistUrl={playListUrl} /> */}
              </div>
            )}
          </Col>

          <Col xs={12} md={12}>
            {isTimerCreated && <TimerPanel formData={formData} />}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
