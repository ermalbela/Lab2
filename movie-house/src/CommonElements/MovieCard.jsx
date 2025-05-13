import React, { useContext } from "react";
import {Card, CardImg, CardBody, CardTitle, CardText, Button, CardFooter, CardHeader} from "react-bootstrap";
import teddy from "../assets/images/teddy.jpg";

const MovieCard = ({ props }) => {

  return (
    <>
      <Card className="movie-card-wrapper w-100">
        <div className="movie-card-img d-flex flex-column" style={{ backgroundImage: `url(${props.poster ?? '../src/assets/images/teddy.jpg'})` }}>
          <CardTitle className="movie-name">{props.title}</CardTitle>
          <CardBody className="p-0">
            <CardTitle className="movie-text text-center">
              {props.genres.map((genre, index) => (
                <span key={index}> 
                  {genre}
                  {index < props.genres.length - 1 && ', '}
                </span>
              ))}
            </CardTitle>
          </CardBody>
          <CardFooter className="movie-text">
            <CardText className="">
              {new Date(props.released).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </CardText>
          </CardFooter>
          {/* <CardText className="movie-text">{props.plot}</CardText> */}
        </div>
      </Card>
    </>
  );
};

export default MovieCard;
