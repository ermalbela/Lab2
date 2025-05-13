import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Layout/Loader'
import { Card, CardHeader, CardBody, Row, Col, Button } from 'react-bootstrap'
import MovieCard from '../CommonElements/MovieCard';
import axios from 'axios';
import { getMovies } from '../Endpoint';
import MovieContext from '../_helper/MovieContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const {movieProps, setMovieProps} = useContext(MovieContext);
  console.log(movieProps);
  
  useEffect(() =>  {
    async function fetchData(){
      const response = await axios.get(getMovies);
      setMovies(response.data);
      console.log(response.data);
      setIsLoading(false);
    }
    fetchData();
  }, []);
  

  const handleClick = () => {  
  }

  const history = useNavigate();

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
                    {movies.map((movie, idx) => (
                      <Col sm={3} className="d-flex" key={idx} onClick={(e) => {
                        e.preventDefault();
                        setMovieProps([movie][0]);
                        history('/movie_watcher');
                      }}>
                        <MovieCard props={movie} />
                      </Col>
                    ))}
                    {/* <Col sm={3} className="d-flex">
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
                    </Col> */}
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
