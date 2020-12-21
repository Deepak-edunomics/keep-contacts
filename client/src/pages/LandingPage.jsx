import React from 'react'
import {Jumbotron, Button, Container, Row, Col } from 'react-bootstrap'
import { Link} from 'react-router-dom'
const LandingPage = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col md={8} sm={12} className="m-auto">
                    <Jumbotron>
                        <h1>WELCOME TO KEEP CONTACTS</h1>
                        <p>
                            This is a simple and secure web application where user can add another
                            user in his contact list and perform CRUD operation.
  </p>
                        <p>
                            <Button as={Link} to="/sign-up" variant="primary">Register</Button>
                        </p>
                    </Jumbotron>
                </Col>
            </Row>
        </Container>
        
    )
}

export default LandingPage
