import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Layout/Loader';
import { Card, CardHeader, CardBody, Row, Col, Button } from 'react-bootstrap';
import MovieContext from '../_helper/MovieContext';
import ReactPlayer from 'react-player';

const MovieWatcher = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const {movieProps, setMovieProps} = useContext(MovieContext);

  useEffect(() => {
    if(movieProps){
      setIsLoading(false);
    }
  }, [movieProps, setMovieProps])

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="title">
        <h2>{movieProps.title}</h2>
      </div>
      <Card>
        <CardHeader>
          <Col className='d-flex justify-content-between'>
            <Button>Rate Movie</Button>
            <Button>Add Favorite</Button>
          </Col>
        </CardHeader>
        <CardBody>
          <Row>
            <ReactPlayer
              className='react-player'
              url={movieProps.video}
              width='100%'
              height='100%'
              controls={true}
              playing={true}
            />
          </Row>
          <Row className='mt-5'>
            <Col lg={9} className='d-flex justify-content-between flex-column'>
              <div>
                <h3 className='mb-4'>{movieProps.title}</h3>
                <h6>{movieProps.plot}</h6>
              </div>
              <Row className='d-flex justify-content-between'>
                <Col sm={2} className='d-flex flex-column justify-content-end'>
                  <p className='d-block'>Rating: <span>4.3</span></p>
                  <p>Votes: <span> 41302</span></p>
                </Col>
                <Col lg={10} className='text-end d-flex align-items-end flex-column justify-content-end'>
                  <p className='d-block'>Actors: <span>&nbsp; {movieProps.actors.join(', ')}</span></p>
                  <p>Directors: <span>&nbsp; {movieProps.directors.join(', ')}</span></p>
                </Col>
              </Row>
            </Col>
            <Col sm={3} className='d-flex justify-content-end'>
              <img src={movieProps.poster} alt="" />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </>
  )
}

export default MovieWatcher
