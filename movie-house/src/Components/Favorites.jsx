import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Layout/Loader'
import { Card, CardHeader, CardBody, Row, Col, Button, FormGroup, FormLabel, Form, FormControl, Modal, DropdownButton } from 'react-bootstrap'
import MovieCard from '../CommonElements/MovieCard';
import axios from 'axios';
import CustomPagination from '../CommonElements/Pagination'
import { getAllFavorites, deleteComment} from '../Endpoint';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  async function fetchAllFavorites(){
    const response = await axios.get(getAllFavorites + JSON.parse(localStorage.getItem('userId')), {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
      withCredentials: true
   })
    console.log(response.data);
    setFavorites(response.data);
    setIsLoading(false);
  }
  
  const history = useNavigate();

  useEffect(() => {
    fetchAllFavorites();
  }, []);

  
  return isLoading ? (
    <Loader isLoading={isLoading}/>
  ) : (
    <>
    <div className="title">
      <h2>Favorite Movies</h2>
    </div>
    <Card>
      <CardHeader>
        <Row className='justify-content-between'>
          <Col className='d-flex justify-content-end'>
            {/* <Button className='admin-buttons' onClick={() => setCreateMovie(true)}>Add Movie</Button> */}
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
                    {favorites.map((favorite, idx) => (
                      <Col sm={3} className="d-flex" key={idx} onClick={(e) => {
                        e.preventDefault();
                        history('/get_movie?id=' + [favorite][0].id);
                      }}>
                        <MovieCard props={favorite} />
                      </Col>
                    ))}
                  </Row>
                </div>

                {/* <Row className="justify-content-center mt-4">
                  <CustomPagination totalUnits={movies.length} unitsPerPage={moviesPerPage} setTheCurrentPage={setCurrentPage} currentPage={currentPage} />
                </Row> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
    </>
  )
}

export default Favorites
