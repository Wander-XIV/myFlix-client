import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies, setUser } from "../../actions/actions";
import MoviesList from "../movies-list/movies-list";

import { Navbar } from "../navbar/navbar";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Container } from "react-bootstrap/";

class MainView extends React.Component {
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      const { setUser } = this.props;
      setUser(localStorage.getItem("user"));
      this.getMovies(accessToken);
    }
  }

  onLoggedIn(authData) {
    const { setUser } = this.props;
    setUser(authData.user.Username);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios
      .get("https://myflix-db14.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    let { user, movies } = this.props;

    return (
      <Router>
        <Navbar user={user} />
        <Container>
          <Row className="main-view">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (movies.length === 0) return <div className="main-view" />;

                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (movies.length === 0)
                  return <div className="test main-view" />;

                if (user)
                  return (
                    <Col>
                      <MovieView
                        movie={movies.find(
                          (m) => m._id === match.params.movieId
                        )}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
              }}
            />
            <Route
              exact
              path="/genre/:name"
              render={({ match, history }) => {
                if (movies.length === 0) return <div className="main-view" />;

                if (user)
                  return (
                    <Col>
                      <GenreView
                        Genre={
                          movies.find((m) => m.Genre.Name === match.params.name)
                            .Genre
                        }
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
              }}
            />
            <Route
              exact
              path="/director/:name"
              render={({ match, history }) => {
                if (movies.length === 0) return <div className="main-view" />;
                console.log(match.params.name);
                const found = movies.find(
                  (m) => m.Director.Name === match.params.name
                );
                console.log(found);
                if (user)
                  return (
                    <Col>
                      <DirectorView
                        Director={found.Director}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                  );
              }}
            />
            <Route
              exact
              path="/users/:username"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );

                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <ProfileView
                      history={history}
                      movies={movies}
                      user={user === match.params.username}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    movies: state.movies,
    user: state.user,
  };
};
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
