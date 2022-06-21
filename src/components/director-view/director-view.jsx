import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Button } from "react-bootstrap";
import "./director-view.scss";

import { Link } from "react-router-dom";

export class DirectorView extends React.Component {
  render() {
    const { Director, onBackClick } = this.props;
    return (
      <Row className="justify-content-md-center">
        {console.log("Success")}
        <Col md={6}>
          <Card className="director-view">
            <Card.Body>
              <Card.Title>{Director.Name}</Card.Title>
              <Card.Text>Bio: {Director.Bio}</Card.Text>
              <Card.Text>Birth: {Director.Birth}</Card.Text>
              <Card.Text>Death: {Director.Death}</Card.Text>
              <Link></Link>
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

DirectorView.propTypes = {
  Director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string,
  }),
};
