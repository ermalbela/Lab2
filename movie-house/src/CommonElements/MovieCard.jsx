import React, { useContext } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button, Col } from 'react-bootstrap';
import teddy from '../assets/images/teddy.jpg'

const MovieCard = ({props}) => {


  return (
    <>
      <Card className='movie-card-wrapper w-100'>
          <div className="movie-card-img" style={{backgroundImage: 'url(../src/assets/images/teddy.jpg)'}}>
            <CardText className='movie-name'>Teddy Bear</CardText>
            <CardText className="movie-text text-center">Comedy</CardText>
            <CardText className='movie-text'>20 Jan 2024</CardText>
            <CardText className="movie-text">A comedy movie description</CardText>
          </div>
      </Card>
    </>
  )
}

export default MovieCard;