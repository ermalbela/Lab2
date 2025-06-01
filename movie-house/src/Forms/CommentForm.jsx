import React, { useContext, useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap'
import MovieContext from '../_helper/MovieContext';
import axios from 'axios';
import { addComment } from '../Endpoint';
import Swal from 'sweetalert2';

const CommentForm = (formProps) => {
  const [comment, setComment] = useState('');
  const {movieProps} = useContext(MovieContext);

  const handleClick = (comment) => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const movieId = movieProps.id;
    const userName = JSON.parse(localStorage.getItem('name'));

    const finalVals = {
      Content: comment,
      UserId: userId,
      MovieId: movieId,
      CreatedAt: new Date().toISOString(),
      UserName: userName
    }
    console.log(finalVals);

    axios.post(addComment, {Content: comment, UserId: userId, MovieId: movieId, CreatedAt: new Date().toISOString(), UserName: userName})
    .then(res => {
      Swal.fire('Success!', res?.data?.message , 'success')
      formProps.setAddComent(false);
      formProps.fetchComments()
    })
  }

  return (
    <Form>
      <FormGroup>
        <FormLabel>What do you think about this movie?</FormLabel>
          <div className="input-group">
            <FormControl className="form-control" as={'textarea'} type="text" name='title' placeholder="e.g. Mr.Bean" value={comment} onChange={e => setComment(e.target.value)} />
          </div>
      </FormGroup>
      <FormGroup className='formGroup d-flex justify-content-between'>
        <Button variant='secondary' onClick={() => formProps.setAddComent(false)}>Close</Button>
        <Button className="admin-buttons" onClick={() => handleClick(comment)}>Add Comment</Button>
      </FormGroup>
    </Form>
  )
}

export default CommentForm
