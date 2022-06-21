import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import "./genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { Genre, onBackClick } = this.props;
    return (
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="genre-view">
            <Card.Body>
              <Card.Title>{Genre.Name}</Card.Title>
              <Card.Text>Bio: {Genre.Description}</Card.Text>
              <Button
                variant="outline-primary"
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
}

GenreView.propTypes = {
  Genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
};
