import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import { getFilteredMovies } from '../Endpoint';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../Layout/Loader';
import { Card, CardHeader, CardBody, Row, Col } from 'react-bootstrap';
import MovieCard from '../CommonElements/MovieCard';
import CustomPagination from '../CommonElements/Pagination';
import Swal from 'sweetalert2';
import MovieContext from '../_helper/MovieContext';

const FilteredMovies = () => {
  function useQuery(){
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const genre = query.get("genre");
  const history = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const {movieProps, setMovieProps} = useContext(MovieContext);

  async function fetchMovies(){
    setIsLoading(true);
    try{
      const response = await axios.get(getFilteredMovies + `genre=${query.get("genre")}`, {headers: {
        Authorization: `Bearer ` + JSON.parse(localStorage.getItem("token"))
      }});
      setMovies(response.data);
    } catch(err){
      console.log(err);
      Swal.fire("Error", err?.response?.data, "error");
      setMovies([]);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    fetchMovies();
    
  }, [genre])

  

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const lastVisitIndex = currentPage * moviesPerPage;
  const firstVisitIndex = lastVisitIndex - moviesPerPage;

  let filteredPaginationMovies = movies?.slice(firstVisitIndex, lastVisitIndex);

  return isLoading ? (
    <Loader isLoading={isLoading}/>
  ) : (
    <>
    <div className="title">
      <h2>Dashboard</h2>
    </div>
    <Card>
      <CardHeader>
        <Row className='justify-content-between'>
          <Col className='d-flex justify-content-end'>
            </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <Row>
          <Col className="d-flex flex-column">
            <Card className="flex-grow-1 d-flex flex-column">
              <CardHeader className='d-flex justify-content-between'>
                <h4>{genre.charAt(0).toUpperCase() + genre.slice(1).toLowerCase()} Movies</h4>
              </CardHeader>
              <CardBody className="d-flex flex-column">
                <div className='offers flex-grow-1'>
                  <Row className="g-4">
                    {filteredPaginationMovies.map((movie, idx) => (
                      <Col sm={3} className="d-flex" key={idx} onClick={(e) => {
                        e.preventDefault();
                        setMovieProps([movie][0]);
                        history('/movie_watcher');
                      }}>
                        <MovieCard props={movie} />
                      </Col>
                    ))}
                  </Row>
                </div>

                <Row className="justify-content-center mt-4">
                  <CustomPagination totalUnits={movies.length} unitsPerPage={moviesPerPage} setTheCurrentPage={setCurrentPage} currentPage={currentPage} />
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </CardBody>
    </Card>
    </>
  )
}

export default FilteredMovies
