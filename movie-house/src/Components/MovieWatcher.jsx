import React, { useContext, useEffect, useState } from 'react'
import Loader from '../Layout/Loader';
import { Card } from 'react-bootstrap';
import MovieContext from '../_helper/MovieContext';

const MovieWatcher = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const {movieProps, setMovieProps} = useContext(MovieContext);
  console.log(movieProps[0]);

  useEffect(() => {
    if(movieProps){
      setIsLoading(false);
    }
  }, [movieProps, setMovieProps])

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="title">
        <h2>{movieProps.title}</h2>
      </div>
      <Card>
        {movieProps.title}
      </Card>
    </>
  )
}

export default MovieWatcher
