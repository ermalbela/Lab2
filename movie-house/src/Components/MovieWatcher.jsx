import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Layout/Loader';
import { Card, CardHeader, CardBody, Row, Col, Button, ListGroup } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import CommonModal from '../CommonElements/CommonModal';
import { useNavigate, useLocation   } from 'react-router-dom';
import CommentForm from '../Forms/CommentForm';
import { deleteComment, getComments, getFavorites, selectMovie, toggleFavoriteApi } from '../Endpoint';
import axios from 'axios';
import CustomPagination from '../CommonElements/Pagination';
import { Star, X } from 'react-feather';
import RateForm from '../Forms/RateForm';
import FractionalStar from '../CommonElements/FractionalStar';
import Swal from 'sweetalert2';
import AuthContext from '../_helper/AuthContext';

const MovieWatcher = () => {
  function useQuery(){
      return new URLSearchParams(useLocation().search);
    }
  
  const query = useQuery();
  const id = query.get("id");

  const [movie, setMovie] = useState([]);

  async function getMovie(){
    setIsLoading(true);
    try{
      const response = await axios.get(selectMovie + `?id=${id}`, {headers: {
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('token'))
      }});
      setMovie(response.data);
      console.log(response.data);
    } catch(err){
      console.log(err);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchFavorites();
    setIsLoading(true);
    getMovie();
    fetchComments();
  }, [id])

  const [isLoading, setIsLoading] = useState(true); 
  const [addComment, setAddComent] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [addRate, setAddRate] = useState(false);
  const {role} = useContext(AuthContext);
  // const history = useNavigate();


  async function fetchComments(){
    const response = await axios.get(getComments + id, {
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
    setIsFavorite(response.data.some(favorite => favorite.movieId === id) ? true : false);
    console.log(response.data);
  }

  const [currentPage, setCurrentPage] = useState(1);
  let commentsPerPage = 6;
  const lastVisitIndex = currentPage * commentsPerPage;
  const firstVisitIndex = lastVisitIndex - commentsPerPage;

  let filteredPaginationComments = comments?.slice(firstVisitIndex, lastVisitIndex);


  const toggleFavorite = async () => {
    await axios.post(toggleFavoriteApi, {MovieId: id, UserId: JSON.parse(localStorage.getItem('userId'), {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
      withCredentials: true
   })})
    .then(res => {
      console.log(res.data);
      setIsFavorite(res.data.some(favorite => favorite.movieId === id) ? true : false);
      console.log(res.data.some(favorite => favorite.movieId === id));
    });
  };

  const handleDeleteComment = async (commentId) => {
      try {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!'
        });
  
        if (result.isConfirmed) {
          await axios.delete(deleteComment + commentId , {
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`
            },
            withCredentials: true,
            data: {UserId: JSON.parse(localStorage.getItem("userId"))}
          });
          Swal.fire('Deleted!', 'Your comment has been deleted.', 'success');
          fetchComments();
        }
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'Failed to delete comment', 'error');
      }
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
            <Button onClick={() => setAddRate(true)}>Rate Movie</Button>
            <Button onClick={() => setAddComent(true)}>Add Comment</Button>
          </Col>
        </CardHeader>
        <CardBody>
          <Card>
            <CardHeader className='d-flex justify-content-between'>
              <h4>{movie.title}</h4>
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
                <ReactPlayer className='react-player' url={movie.video} width='100%' height='100%' controls={true} playing={false} />
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
                      <h6>{movie.plot}</h6>
                    </div>
                    <Row className='d-flex justify-content-between'>
                        <div className='d-block mb-3 mt-3'>Rating: 
                          {[1,2,3,4,5].map((star) => {
                            let fillPercent = 0;
                            let rating = movie.averageRating;

                            if (star <= Math.floor(rating)) {
                              fillPercent = 100; // fully filled
                            } else if (star === Math.ceil(rating)) {
                              fillPercent = (rating % 1) * 100; // partial fill
                            }
                            return <FractionalStar key={star} fillPercent={fillPercent} />
                          })}
                        </div>
                        <p>Rating Count: <span> {movie.ratingCount}</span></p>
                        <p className='d-block'>Actors: <span>&nbsp; {movie?.actors?.join(', ')}</span></p>
                        <p>Directors: <span>&nbsp; {movie?.directors?.join(', ')}</span></p>
                    </Row>
                  </Col>
                  <Col sm={3} style={{marginLeft: '30px'}}>
                    <img src={movie.poster} alt="" style={{height: '100%', width: '100%'}}/>
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
                  {filteredPaginationComments.map((comment, idx) => {
                    console.log(comment)
                    return (
                    <Col key={idx} md={6} lg={4} className="d-flex" style={{height: '250px'}}>
                      <Card className="comment-card h-100 w-100">
                        <CardHeader className="comment-card-header d-flex justify-content-between">
                          <h6 className="mb-0" style={{color: '#24695c'}}>{comment.userName}</h6>
                            {comment.userId === JSON.parse(localStorage.getItem("userId")) || role === 'Superadmin' ? (
                                <X  onClick={() => handleDeleteComment(comment.id)} className='action-btn' color='darkred'/>
                            ) : ''}
                        </CardHeader>
                        <CardBody className="d-flex flex-column justify-content-between flex-grow-1 mt-0 pt-0">
                          <p className="comment-content flex-grow-1">{comment.content}</p>
                          <div className="comment-timestamp text-end">
                            {new Date(comment.createdAt).toLocaleString()}
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  )})}
                </Row>
              ) : (
                <p className="text-muted text-center">No comments yet...</p>
              )}

              <Row className="justify-content-center mt-4">
                <CustomPagination totalUnits={comments.length} unitsPerPage={commentsPerPage} setTheCurrentPage={setCurrentPage} currentPage={currentPage} />
              </Row>
            </CardBody>
          </Card>

          <CommonModal size={'md'} show={addRate} onHide={() => setAddRate(false)} title={"Rate Movie"} FormComponent={RateForm} formProps={{setAddRate, getMovie}} />

          <CommonModal size={'lg'} show={addComment} onHide={() => setAddComent(false)} title={"Add Comment"} FormComponent={CommentForm} formProps={{setAddComent, fetchComments}} />              
        </CardBody>
      </Card>
    </>
  )
}

export default MovieWatcher
