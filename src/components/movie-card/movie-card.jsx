import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import "./movie-card.scss";
import Navbar from "../navbar/navbar";

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
    return (
      <Card className="movie-card-wrapper">
        <Card.Img
          variant="top"
          src={movie.ImagePath}
          crossOrigin="true"
          alt="Movie Image"
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-primary">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
};
