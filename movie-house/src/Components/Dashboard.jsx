import React, { useState } from 'react'
import Loader from '../Layout/Loader'
import { Card, CardHeader, CardBody, Row, Col, Button } from 'react-bootstrap'
import MovieCard from '../CommonElements/MovieCard';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);


  const handleClick = () => {
    console.log(123);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
    <div className="title">
      <h2>Dashboard</h2>
    </div>
    <Card>
      <CardHeader>
      <Row className='justify-content-between'>
          <Col>
          <Button>Rate Movie</Button>
          </Col>
          <Col className='d-flex justify-content-end'>
            <Button className='admin-buttons' onClick={() => handleClick()}>Add Movie</Button>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col className="d-flex flex-column">
            <Card className="flex-grow-1 d-flex flex-column">
              <CardHeader className='d-flex justify-content-between'>
                <h4>Enjoy Movies</h4>
              </CardHeader>
              <CardBody className="d-flex flex-column">
                <div className='offers flex-grow-1'>
                  <Row className="g-4">
                    <Col sm={3} className="d-flex">
                      <MovieCard />
                    </Col>
                    <Col sm={3} className="d-flex">
                      <MovieCard />
                    </Col>
                    <Col sm={3} className="d-flex">
                      <MovieCard />
                    </Col>
                    <Col sm={3} className="d-flex">
                      <MovieCard />
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
    </>
  )
}

export default Dashboard
