import React, { useContext, useState } from 'react'
import { Form, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { rateMovie } from '../Endpoint';
import Swal from 'sweetalert2';
import { Star } from 'react-feather';

const RateForm = (formProps) => {
  const [rate, setRate] = useState(null);
  const [hover, setHover] = useState(0);

  function useQuery(){
      return new URLSearchParams(useLocation().search);
    }
  
  const query = useQuery();
  const id = query.get("id");

  const handleClick = (score) => {
    const userId = JSON.parse(localStorage.getItem('userId'));
    const movieId = id;

    axios.post(rateMovie + movieId, {UserId: userId, Score: score}, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
      withCredentials: true
    })
    .then(res => {
      Swal.fire('Success!', res?.data?.message , 'success')
      formProps.setAddRate(false);
      formProps.getMovie();
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
      Swal.fire('Error!', err?.response?.data ?? 'An error occured', 'error');
    })
  }

  return (
    <Form>
      <FormGroup>
        <FormLabel>How much do you like this movie?</FormLabel>
          <div className="star-rating" style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={28}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRate(star)}
                fill={star <= (hover || rate) ? "gold" : "none"} // yellow if hovered or rated
                stroke={star <= (hover || rate) ? "gold" : "gray"} // outline color
              />
            ))}
            <p className="invalidFeedback fullWidth ">{errors.score}</p>
          </div>
      </FormGroup>
      <FormGroup className='formGroup d-flex justify-content-between'>
        <Button variant='secondary' onClick={() => formProps.setAddRate(false)}>Close</Button>
        <Button className="admin-buttons" onClick={() => handleClick(rate)}>Rate</Button>
      </FormGroup>
    </Form>
  )
}

export default RateForm
