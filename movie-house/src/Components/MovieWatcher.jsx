import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Layout/Loader';
import { Card, CardHeader, CardBody, Row, Col, Button, ListGroup } from 'react-bootstrap';
import MovieContext from '../_helper/MovieContext';
import ReactPlayer from 'react-player';
import CommonModal from '../CommonElements/CommonModal';
import { useNavigate } from 'react-router-dom';
import CommentForm from '../Forms/CommentForm';
import { getComments, getFavorites, toggleFavoriteApi } from '../Endpoint';
import axios from 'axios';
import CustomPagination from '../CommonElements/Pagination';
import { Star } from 'react-feather';

const MovieWatcher = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const {movieProps, setMovieProps} = useContext(MovieContext);
  const [addComment, setAddComent] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const history = useNavigate();

  console.log(movieProps);

  async function fetchComments(){
    const response = await axios.get(getComments + movieProps?.id, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
      withCredentials: true
   });
    setComments(response.data);
    console.log(response.data);
  }

  async function fetchFavorites(){
    const response = await axios.get(getFavorites + JSON.parse(localStorage.getItem('userId')), {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
      withCredentials: true
   })
    setIsFavorite(response.data.some(favorite => favorite.movieId === movieProps.id) ? true : false);
    console.log(response.data);
  }

  useEffect(() => {
    if(movieProps.length !== 0){
      setIsLoading(false);
    }
    if(movieProps === undefined || !movieProps || movieProps.length === 0){
      history('/')
    }
    fetchComments();
    fetchFavorites();
  }, [movieProps, setMovieProps])


  const [currentPage, setCurrentPage] = useState(1);
  let commentsPerPage = 6;
  const lastVisitIndex = currentPage * commentsPerPage;
  const firstVisitIndex = lastVisitIndex - commentsPerPage;

  let filteredPaginationComments = comments?.slice(firstVisitIndex, lastVisitIndex);


  const toggleFavorite = async () => {
    await axios.post(toggleFavoriteApi, {MovieId: movieProps.id, UserId: JSON.parse(localStorage.getItem('userId'), {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
      withCredentials: true
   })})
    .then(res => {
      console.log(res.data);
      setIsFavorite(res.data.some(favorite => favorite.movieId === movieProps.id) ? true : false);
      console.log(res.data.some(favorite => favorite.movieId === movieProps.id));
    });
  };

  return isLoading ? (
    <Loader isLoading={isLoading}/>
  ) : (
    <>
      <div className="title">
        <h2>Movie Watcher</h2>
      </div>
      <Card>
        <CardHeader>
          <Col className='d-flex justify-content-between'>
            <Button>Rate Movie</Button>
            <Button onClick={() => setAddComent(true)}>Add Comment</Button>
          </Col>
        </CardHeader>
        <CardBody>
          <Card>
            <CardHeader className='d-flex justify-content-between'>
              <h4>{movieProps.title}</h4>
              <div
                onClick={toggleFavorite}
                style={{ cursor: 'pointer' }}
                title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              >
                <Star
                  size={24}
                  color="#f5c518"
                  fill={isFavorite ? '#f5c518' : 'none'}
                />
              </div>
            </CardHeader>
            <CardBody>
              <Row>
                <ReactPlayer className='react-player' url={movieProps.video} width='100%' height='100%' controls={true} playing={false} />
              </Row>
            </CardBody>
          </Card>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h4>Movie Plot</h4>
                </CardHeader>
                <CardBody className='d-flex justify-content-between flex-row'>
                  <Col className='d-flex justify-content-between flex-column'>
                    <div>
                      <h6>{movieProps.plot}</h6>
                    </div>
                    <Row className='d-flex justify-content-between'>
                        <p className='d-block'>Rating: <span>4.3</span></p>
                        <p>Votes: <span> 41302</span></p>
                        <p className='d-block'>Actors: <span>&nbsp; {movieProps?.actors.join(', ')}</span></p>
                        <p>Directors: <span>&nbsp; {movieProps.directors.join(', ')}</span></p>
                    </Row>
                  </Col>
                  <Col sm={3} style={{marginLeft: '30px'}}>
                    <img src={movieProps.poster} alt="" style={{height: '100%', width: '100%'}}/>
                  </Col>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Card>
            <CardHeader>
              <h4>Comments</h4>
            </CardHeader>
            <CardBody>
              {comments && comments.length > 0 ? (
                <Row className="g-4 align-items-stretch">
                  {filteredPaginationComments.map((comment, idx) => (
                    <Col key={idx} md={6} lg={4} className="d-flex" style={{height: '250px'}}>
                      <Card className="comment-card h-100 w-100">
                        <CardHeader className="comment-card-header">
                          <h6 className="mb-0" style={{color: '#24695c'}}>{comment.userName}</h6>
                        </CardHeader>
                        <CardBody className="d-flex flex-column justify-content-between flex-grow-1 mt-0 pt-0">
                          <p className="comment-content flex-grow-1">{comment.content}</p>
                          <div className="comment-timestamp text-end">
                            {new Date(comment.createdAt).toLocaleString()}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : (
                <p className="text-muted text-center">No comments yet...</p>
              )}

              <Row className="justify-content-center mt-4">
                <CustomPagination totalUnits={comments.length} unitsPerPage={commentsPerPage} setTheCurrentPage={setCurrentPage} currentPage={currentPage} />
              </Row>
            </CardBody>
          </Card>

          <CommonModal size={'lg'} show={addComment} onHide={() => setAddComent(false)} title={"Add Comment"} FormComponent={CommentForm} formProps={{setAddComent, fetchComments}} />              
        </CardBody>
      </Card>
    </>
  )
}

export default MovieWatcher
