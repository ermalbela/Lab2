import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Layout/Loader'
import { Card, CardHeader, CardBody, Row, Col, Button, FormGroup, FormLabel, Form, FormControl, Modal, DropdownButton } from 'react-bootstrap'
import MovieCard from '../CommonElements/MovieCard';
import axios from 'axios';
import { addMovie, getMovies } from '../Endpoint';
import MovieContext from '../_helper/MovieContext';
import { useNavigate } from 'react-router-dom';
import { actors, directors, genres, languages } from '../Menu';
import MySelect from '../CommonElements/MySelect';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';
import { components } from 'react-select';
import Swal from 'sweetalert2';
import CustomPagination from '../CommonElements/Pagination'

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const {movieProps, setMovieProps} = useContext(MovieContext);
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
    const response = await axios.get(getMovies);
    setMovies(response.data);
    console.log(response.data);
    setIsLoading(false);
  }
  useEffect(() =>  {
    fetchData();
  }, []);
  
  const handleChange = (e) => {
    const {name, value} = e.target;
    setMovie({...movie, [name]: value})
  }

  const Option = props => {
    return (
      <div>
        <components.Option {...props}>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label>{props.label}</label>
        </components.Option>
      </div>
    );
  };

  const MultiValue = props => (
    <components.MultiValue {...props}>
      <p>{props.data.label}</p>
    </components.MultiValue>
  );

  const customStyles = { // Customizing react-select styles 
    container: (provided) => ({
      ...provided,
      borderColor: 'rgb(164, 206, 212);',
      borderRadius: '4px',
      borderStyle: 'solid',
      borderWidth: '1px'
    }),
    control: (provided) => ({
      ...provided,
      width: '100%',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      msOverflowStyle: 'auto',
    }),
    multiValue: (provided) => ({
      ...provided,
      marginRight: '4px',
      maxHeight: '30px',
      margin: 0,
      minWidth: 'unset',
      height: '25px',
      padding: 0,
      alignItems: 'center'
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      height: '100%'
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: '8px',
      overflow: 'hidden'
    }),
    option: (styles, {isFocused, isSelected}) => {
      return{
        ...styles,
        backgroundColor: isSelected ? '#6ea4c2' : isFocused ? '#cee6e2' : '#fff',
        color: !isSelected ? '#000' : isSelected || isFocused ? '#000' : '',
        borderRadius: '5px'
      }
    }
  }

  const showPreview = e => {
    if(e.target.files && e.target.files[0]){
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        setMovie({...movie, poster: x.target.result, imageFile, imageName: imageFile.name});
      }
      reader.readAsDataURL(imageFile);
    } else{
      setMovie({...movie, poster: ''})
    }
  }

  const showVideoPreview = e => {
    if (e.target.files && e.target.files[0]) {
      let videoFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        setMovie({...movie, video: x.target.result, videoFile, videoName: videoFile.name});
      };
      reader.readAsDataURL(videoFile);
    } else {
      setMovie({ ...movie, video: '' });
    }
  };

  const handleClick = (movie) => {
    const formData = new FormData();
    formData.append("title", movie.title);
    formData.append("plot", movie.plot);
    movie.genres.forEach(g => formData.append("genres", g.value));
    movie.actors.forEach(a => formData.append("actors", a.value));
    movie.directors.forEach(d => formData.append("directors", d.value));
    movie.languages.forEach(l => formData.append("languages", l.value));
    formData.append("Released",new Date(movie.released).toISOString());
    formData.append("poster", 'http://localhost:5064/' + movie.imageName); //image source
    formData.append("video", 'http://localhost:5064/' + movie.videoName); //video source
    formData.append('ImageFile', movie.imageFile);
    formData.append('ImageName', movie.imageName);
    formData.append('VideoFile', movie.videoFile);
    formData.append('VideoName', movie.videoName);

    console.log(movie)
    axios.post(addMovie, formData)
    .then(data => {
      Swal.fire('Success', 'Movie added successfully', 'success');
      setCreateMovie(false);
      console.log(data)
      fetchData();
    })  
  }
  
   const validate = (vals) => {
    const errors = {};
    if(!patterns.name.test(vals.name)){
      errors.name = 'Enter a valid Company Name!';
    }
    if(!patterns.name.test(vals.originCountry)){
      errors.originCountry = 'Enter a valid Origin Country!';
    }
    if(!patterns.name.test(vals.destinationCountry)){
      errors.destinationCountry = 'Enter a valid Destination Country!';
    }
    if(vals.tickets < 50){
      errors.tickets = 'Ticket number should be bigger than 50!';
    }
    if(vals.ticketPrice < 40){
      errors.ticketPrice = 'Ticket price should be bigger than 40!';
    }
    if(vals.date == '' || vals.date == undefined){
      errors.date = 'Please choose a date!';
    }
    if(vals.arrival == '' || vals.arrival == undefined){
      errors.arrival = 'Please choose a valid Arrival!';
    }
    if(vals.departure == '' || vals.departure == undefined){
      errors.departure = 'Please choose a valid Departure!';
    }
    if(vals.selectedPlane == null || vals.selectedPlane == '' || vals.selectedPlane == 'Select Plane'){
      errors.selectedPlane = 'Please choose a Plane!';
    }
    return errors;
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
          <Col className='d-flex justify-content-end'>
            <Button className='admin-buttons' onClick={() => setCreateMovie(true)}>Add Movie</Button>
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
                        setMovieProps([movie][0]);
                        history('/movie_watcher');
                      }}>
                        <MovieCard props={movie} />
                      </Col>
                    ))}
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Create Movie Modal */}
        <Modal size="lg" show={createMovie} onHide={() => setCreateMovie(false)} aria-labelledby="example-modal-sizes-title-lg">
          <Modal.Header>
            <Modal.Title id="example-modal-sizes-title-lg">
              Create Movie
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="d-flex justify-content-center flex-column">
              <Col className='d-flex justify-content-between'>
                <FormGroup className='formGroup modal-inputs'>
                  <FormLabel>Movie Title</FormLabel>
                  <div className="input-group login-form-inputs">
                    <FormControl className="form-control" type="text" name='title' placeholder="e.g. Mr.Bean" value={movie.title} onChange={handleChange} />
                  </div>
                  <p className='invalidFeedback fullWidth'>{errors.title}</p>
                </FormGroup>
                <FormGroup className='formGroup modal-inputs'>
                  <FormLabel>Released</FormLabel>
                  <div className="input-group login-form-inputs fullWidth">
                    <DatePicker
                      className='form-control modal-datepicker' 
                      isClearable
                      maxDate={new Date()}
                      placeholderText="e.g. 06/25/2024" 
                      selected={movie.released} 
                      onChange={(newDate) => setMovie({...movie, released: newDate})} 
                    />
                  </div>
                  <p className='invalidFeedback fullWidth'>{errors.released}</p>
                </FormGroup>
              </Col>
              <Col className='d-flex justify-content-between'>
                <FormGroup className='formGroup modal-inputs'>
                  <FormLabel>Actors</FormLabel>
                  <MySelect
                    options={actors}
                    styles={customStyles}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{ Option, MultiValue }}
                    onChange={(selected) => {
                      setMovie({...movie, actors: selected});
                    }}
                    value={movie.actors}
                    className="react-select-container fullWidth"
                    classNamePrefix="react-select"
                    maxMenuHeight={"160px"}
                    placeholder="Actors"
                    isClearable
                  />
                  <p className='invalidFeedback fullWidth'>{errors.actors}</p>
                </FormGroup>
                <FormGroup className='formGroup modal-inputs'>
                  <FormLabel>Genres</FormLabel>
                  <MySelect
                    options={genres}
                    styles={customStyles}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{ Option, MultiValue }}
                    onChange={(selected) => {
                      setMovie({...movie, genres: selected});
                    }}
                    value={movie.genres}
                    className="react-select-container fullWidth"
                    classNamePrefix="react-select"
                    maxMenuHeight={"160px"}
                    placeholder="Genres"
                    isClearable
                  />
                  <p className='invalidFeedback fullWidth'>{errors.genres}</p>
                </FormGroup>  
              </Col>
              <Col className='d-flex justify-content-between'>
                <FormGroup className='formGroup modal-inputs'>
                  <FormLabel>Languages</FormLabel>
                  <MySelect
                    options={languages}
                    styles={customStyles}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{ Option, MultiValue }}
                    onChange={(selected) => {
                      setMovie({...movie, languages: selected});
                    }}
                    value={movie.languages}
                    className="react-select-container fullWidth"
                    classNamePrefix="react-select"
                    maxMenuHeight={"160px"}
                    placeholder="Languages"
                    isClearable
                  />
                  <p className='invalidFeedback fullWidth'>{errors.languages}</p>
                </FormGroup>
                <FormGroup className='formGroup modal-inputs'>
                  <FormLabel>Directors</FormLabel>
                  <MySelect
                    options={directors}
                    styles={customStyles}
                    isMulti
                    closeMenuOnSelect={false}
                    hideSelectedOptions={false}
                    components={{ Option, MultiValue }}
                    onChange={(selected) => {
                      setMovie({...movie, directors: selected});
                    }}
                    value={movie.directors}
                    className="react-select-container fullWidth"
                    classNamePrefix="react-select"
                    maxMenuHeight={"160px"}
                    placeholder="Directors"
                    isClearable
                  />
                  <p className='invalidFeedback fullWidth'>{errors.directors}</p>
                </FormGroup>  
              </Col>
              <Col className='d-flex flex-row justify-content-between'>
                <FormGroup className='formGroup modal-inputs'>
                <FormLabel>Movie Poster</FormLabel>
                  <label className='btn btn-primary m-0 admin-buttons fullWidth d-flex align-items-center justify-content-center' style={{height: '50px'}} htmlFor="input">Select Image
                    <input id='input' style={{display: 'none'}} type="file" accept='image/*' onChange={showPreview} />
                  </label>
                </FormGroup>
                <FormGroup className='formGroup modal-inputs'>
                <FormLabel>Movie Video</FormLabel>
                  <label className='btn btn-primary m-0 admin-buttons fullWidth d-flex align-items-center justify-content-center' style={{ height: '50px' }} htmlFor="videoInput">Select Video
                    <input id='videoInput' style={{ display: 'none' }} type="file" accept='video/*' onChange={showVideoPreview} />
                  </label>
                </FormGroup>
              </Col>
              <Col>
                <FormGroup className='formGroup mb-4'>
                  <FormLabel>Movie Plot</FormLabel>
                  <div className="input-group login-form-inputs">
                      <FormControl as={'textarea'} rows={2} className="form-textarea" type="text" name="plot" placeholder="e.g. " value={movie.plot} onChange={handleChange} />
                  </div>
                  <p className='invalidFeedback fullWidth'>{errors.plot}</p>
                </FormGroup>
              </Col>
              <FormGroup className='formGroup d-flex justify-content-between'>
                {/* <Button className='admin-buttons' onClick={() => addRandom()}>ADD RANDOM</Button> */}
                <Button variant='secondary' onClick={() => setCreateMovie(false)}>Close</Button>
                <Button className="admin-buttons" onClick={() => handleClick(movie)}>Create Movie</Button>
                {/* <Button className="admin-buttons" onClick={() => handleClick(createMovie, movie)}>Create Movie</Button> */}
              </FormGroup>
            </Form>
          </Modal.Body>
        </Modal>
        <Row className="justify-content-center">
          <CustomPagination totalMovies={movies.length} moviesPerPage={moviesPerPage} setTheCurrentPage={setCurrentPage} currentPage={currentPage} />
        </Row>
      </CardBody>
    </Card>
    </>
  )
}

export default Dashboard
