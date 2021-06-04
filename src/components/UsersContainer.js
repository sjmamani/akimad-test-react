import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-bootstrap/Modal";
import { Figure } from "react-bootstrap";
import {
  getUsers,
  getUserDetails,
  getUserRepositories,
} from "../redux/actions/userActions";

const mapStateToProps = (state) => {
  return {
    users: state.users.users,
    loading: state.users.loading,
    userDetail: state.userDetails.user,
    loadingUserDetail: state.userDetails.loading,
    repositories: state.userRepositories.repositories,
  };
};

const mapActionsToProps = { getUsers, getUserDetails, getUserRepositories };

class UsersContainer extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      showModal: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleKeyUp() {
    if (this.state.value.length === 0) {
      return;
    }
    this.props.getUsers(this.state.value);
  }

  handleShowModal(username) {
    this.props.getUserDetails(username);
    this.props.getUserRepositories(username);
    this.setState({ showModal: true });
  }

  render() {
    let { users, userDetail, loadingUserDetail, repositories } = this.props;
    let loading = this.props.loading ? (
      <Row className="my-5 justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden"></span>
        </Spinner>
      </Row>
    ) : null;
    let modal = (
      <Modal
        show={this.state.showModal}
        onHide={() => this.setState({ showModal: false })}
      >
        {loadingUserDetail || userDetail === null ? (
          <p>Cargando...</p>
        ) : (
          <React.Fragment>
            <Modal.Header closeButton>
              <Modal.Title>{userDetail.login}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Información:</h4>
              <p>Nombre: {userDetail.name}</p>
              <p>Ubicación: {userDetail.location}</p>
              <h4>Repositorios:</h4>
              <ul>
                {repositories.map((repository) => (
                  <li>{repository.full_name}</li>
                ))}
              </ul>
            </Modal.Body>
          </React.Fragment>
        )}
      </Modal>
    );
    return (
      <React.Fragment>
        <Row className="my-5 justify-content-center">
          <Col xs md="6">
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group>
                <Form.Control
                  value={this.state.value}
                  onChange={this.handleChange}
                  placeholder="Buscar usuario"
                  onKeyUp={this.handleKeyUp}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
        {loading}
        {modal}
        <Container>
          <Row className="justify-content-center">
            {users.length > 0
              ? users.map((user) => {
                  return (
                    <Col md="4" lg="3" xs="6" className="mb-4">
                      <Figure>
                        <Figure.Image
                          src={user.avatar_url}
                          width={100}
                          height={100}
                          roundedCircle
                        />
                      </Figure>
                      <Col>
                        <h3>{user.login}</h3>
                        <p>{user.html_url}</p>
                      </Col>
                      <Button
                        variant="primary"
                        onClick={() => this.handleShowModal(user.login)}
                      >
                        Ver detalle
                      </Button>
                    </Col>
                  );
                })
              : null}
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapActionsToProps)(UsersContainer);
