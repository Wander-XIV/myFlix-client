import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";

import { Button, Card, Col } from "react-bootstrap";

import "./profile-view.scss";

export function FavoriteMoviesView(props) {
  const { movies, favoriteMovies, currentUser, token } = props;

  const favoriteMoviesId = favoriteMovies.map((m) => m._id);

  const favoriteMoviesList = movies.filter((m) => {
    return favoriteMoviesId.includes(m._id);
  });

  const handleMovieDelete = (movieId) => {
    axios
      .delete(
        `https://myflix-db14.herokuapp.com/users/${currentUser}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(() => {
        alert(`The movie was successfully deleted.`);
        window.open("/users/:username", "_self");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Fragment>
      {favoriteMoviesList.length === 0 ? (
        <p>You have no favorite movies yet.</p>
      ) : (
        favoriteMoviesList.map((movie) => {
          return (
            <Col xs={12} md={6} lg={4} key={movie._id}>
              <Card
                className="bg-light text-black"
                border="danger"
                style={{ width: "20rem", height: "20rem", margin: ".5rem" }}
              >
                <Card.Img
                  variant="top"
                  src={movie.ImagePath}
                  crossOrigin="true"
                  style={{ height: "12rem" }}
                />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {movie.Year}
                  </Card.Subtitle>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeFav(movie._id)}
                  >
                    Remove from Favorites
                  </Button>
                  <Button
                    className="ms-2"
                    variant="danger"
                    href={`/movies/${movie._id}`}
                  >
                    Details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })
      )}
    </Fragment>
  );
}
