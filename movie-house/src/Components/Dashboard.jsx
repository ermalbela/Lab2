import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Layout/Loader'
import { Card, CardHeader, CardBody, Row, Col, Button, FormGroup, FormLabel, Form, FormControl, Modal, DropdownButton } from 'react-bootstrap'
import MovieCard from '../CommonElements/MovieCard';
import axios from 'axios';
import { addMovie, getMovies, selectMovie } from '../Endpoint';
import { useNavigate } from 'react-router-dom';
import { actors, directors, genres, languages } from '../Menu';
import MySelect from '../CommonElements/MySelect';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';
import { components } from 'react-select';
import Swal from 'sweetalert2';
import CustomPagination from '../CommonElements/Pagination'
import CommonModal from '../CommonElements/CommonModal';
import MovieForm from '../Forms/MovieForm';
import AuthContext from '../_helper/AuthContext';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [createMovie, setCreateMovie] = useState(false);
  const [errors, setErrors] = useState({});

  const initialData = {
    title: '',
    plot: '',
    genres: [],
    actors: [],
    poster: '',
    languages: [],
    released: '',
    directors: [],
    video: '',
    imageFile: null,
    imageName: '',
    videoFile: null,
    videoName: ''
  }
  
  const [movie, setMovie] = useState(initialData);
  const history = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;

  const lastVisitIndex = currentPage * moviesPerPage;
  const firstVisitIndex = lastVisitIndex - moviesPerPage;

  let filteredPaginationMovies = movies?.slice(firstVisitIndex, lastVisitIndex);

  async function fetchData(){
    const response = await axios.get(getMovies, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
      withCredentials: true
   });
    setMovies(response.data);
    console.log(response.data);
    setIsLoading(false);
  }
  useEffect(() =>  {
    fetchData();
  }, []);
  
  //  const validate = (vals) => {
  //   const errors = {};
  //   if(!patterns.name.test(vals.name)){
  //     errors.name = 'Enter a valid Company Name!';
  //   }
  //   if(!patterns.name.test(vals.originCountry)){
  //     errors.originCountry = 'Enter a valid Origin Country!';
  //   }
  //   if(!patterns.name.test(vals.destinationCountry)){
  //     errors.destinationCountry = 'Enter a valid Destination Country!';
  //   }
  //   if(vals.tickets < 50){
  //     errors.tickets = 'Ticket number should be bigger than 50!';
  //   }
  //   if(vals.ticketPrice < 40){
  //     errors.ticketPrice = 'Ticket price should be bigger than 40!';
  //   }
  //   if(vals.date == '' || vals.date == undefined){
  //     errors.date = 'Please choose a date!';
  //   }
  //   if(vals.arrival == '' || vals.arrival == undefined){
  //     errors.arrival = 'Please choose a valid Arrival!';
  //   }
  //   if(vals.departure == '' || vals.departure == undefined){
  //     errors.departure = 'Please choose a valid Departure!';
  //   }
  //   if(vals.selectedPlane == null || vals.selectedPlane == '' || vals.selectedPlane == 'Select Plane'){
  //     errors.selectedPlane = 'Please choose a Plane!';
  //   }
  //   return errors;
  // }
  const {role} = useContext(AuthContext)
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
            {role === 'Superadmin' ? <Button className='admin-buttons' onClick={() => setCreateMovie(true)}>Add Movie</Button> : ''}          
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
                    {filteredPaginationMovies.map((movie, idx) => (
                      <Col sm={3} className="d-flex" key={idx} onClick={(e) => {
                        e.preventDefault();
                        history('/get_movie?id=' + [movie][0].id);
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

        <CommonModal
          size="lg"
          show={createMovie}
          onHide={() => setCreateMovie(false)}
          title={"Create Movie"}
          FormComponent={MovieForm}
          formProps={{setCreateMovie, setMovies}}
        />
      </CardBody>
    </Card>
    </>
  )
}

export default Dashboard
