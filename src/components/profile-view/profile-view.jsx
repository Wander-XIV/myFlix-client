import React from "react";
import "./profile-view.scss";
import PropTypes from "prop-types";

import {
  Container,
  Card,
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  FormControl,
} from "react-bootstrap";
import axios from "axios";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };
  }
  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  getUser(token) {
    const username = localStorage.getItem("user");

    axios
      .get(`https://myflix-db14.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: response.data.Birthday,
          favoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  editUser = (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .put(
        `https://myflix-db14.herokuapp.com/users/${username}`,
        {
          Username: this.state.username,
          Password: this.state.password,
          Email: this.state.email,
          Birthday: this.state.birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });

        localStorage.setItem("user", this.state.Username);
        alert("Profile updated");
        window.open(`/users/${user}`, "_self");
      });
  };

  removeFavorite = (e, movie) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://myflix-db14.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://myflix-db14.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile deleted");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      Birthday: value,
    });
  }

  render() {
    const { movies } = this.props;
    const { favoriteMovies, username, email, birthday } = this.state;

    if (!username) {
      return null;
    }

    return (
      <Container className="profile-page">
        <Row>
          <Col md={4}>
            <Card className="profile-info">
              <Card.Body>
                <Card.Title>Your Info</Card.Title>
                <Card.Text className="info-username">
                  Name: {username}
                </Card.Text>
                <Card.Text className="">Email: {email}</Card.Text>
                <Card.Text className="">Birthday: {birthday}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card className="profile-view">
              <Card.Body>
                <Card.Title>Update Profile</Card.Title>
                <Form
                  className="update-form"
                  onSubmit={(e) =>
                    this.editUser(
                      e,
                      this.Username,
                      this.Password,
                      this.Email,
                      this.Birthday
                    )
                  }
                >
                  <FormGroup>
                    <Form.Label>Name</Form.Label>
                    <FormControl
                      type="text"
                      className="username"
                      name="username"
                      placeholder="New username"
                      value={username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Form.Label>Password</Form.Label>
                    <FormControl
                      type="password"
                      name="password"
                      placeholder="New password"
                      value=""
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Form.Label>Email</Form.Label>
                    <FormControl
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Form.Label>Birthday</Form.Label>
                    <FormControl
                      type="date"
                      name="birthday"
                      value={birthday}
                      onChange={(e) => this.setBirthday(e.target.value)}
                      required
                    />
                  </FormGroup>
                  <Button
                    variant="outline-success"
                    type="submit"
                    onClick={this.editUser}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => this.deleteUser()}
                  >
                    Delete Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="favorite-container">
          {favoriteMovies.length === 0 && (
            <div className="text-center">No favorite movies</div>
          )}
          {favoriteMovies.length > 0 &&
            movies.map((movie) => {
              if (
                movie._id === favoriteMovies.find((fav) => fav === movie._id)
              ) {
                return (
                  <Col md={4} key={movie._id}>
                    <Card className="favorite-movie">
                      <Card.Img
                        variant="top"
                        src={movie.ImagePath}
                        crossOrigin="true"
                        alt="Movie Image"
                      />
                      <Card.Body>
                        <Card.Title className="movie-title">
                          {movie.Title}
                        </Card.Title>
                        <Button
                          value={movie._id}
                          variant="outline-danger"
                          onClick={(e) => this.removeFavorite(e, movie)}
                        >
                          Remove
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              }
            })}
        </Row>
      </Container>
    );
  }
}

ProfileView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
      }).isRequired,
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        Birth: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};
