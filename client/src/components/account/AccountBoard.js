import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Icon,
  Message,
  Grid,
  Card
} from "semantic-ui-react";
import SessionList from "./SessionList";
import CreateSessionModal from "./CreateSessionModal";
import io from "socket.io-client";
import { setInitialSocket } from "../../actions/socketActions";
import { getQueriesByUserId } from "../../actions/queryActions";
import {
  getCurrentUser,
  getSessions,
  deleteAccount,
  updateDeleteSession
} from "../../actions/accountActions";
import QueryHistoryModal from "./QueryHistoryModal";

let socket;

const AccountBoard = ({
  getCurrentUser,
  getSessions,
  getQueriesByUserId,
  query: { queries },
  deleteAccount,
  updateDeleteSession,
  setInitialSocket,
  account: { sessions, loading, user },
  socketState,
  authentication
}) => {
  useEffect(() => {
    getCurrentUser();
    getSessions();
    getQueriesByUserId();

    if (!socketState.socket_connected) {
      socket = io.connect("http://localhost:5000", {
        query: "user_id=" + localStorage.getItem("user_id")
      });
      setInitialSocket(socket);
    } else {
      socket = socketState.socket;
    }

    socket.on("newUserAddedToSession", function(payload) {
      getSessions();
    });

    socket.on("sessionDeleted", function(payload) {
      updateDeleteSession(payload.deletedSession._id);
    });
  }, [
    getCurrentUser,
    getSessions,
    getQueriesByUserId,
    setInitialSocket,
    socketState.socket,
    socketState.socket_connected,
    updateDeleteSession
  ]);

  const [message, setMessage] = useState({ visible: true });

  return sessions && user === null ? (
    <Container className="main container">
      <CreateSessionModal />
      <Link
        style={{ marginLeft: "0.3rem", marginTop: "0.3rem" }}
        to="/edit-personal-details"
        className="ui button"
      >
        Edit Personal Details <Icon name="settings" />
      </Link>
      <Button
        style={{ marginLeft: "0.3rem", marginTop: "0.3rem" }}
        onClick={() => deleteAccount()}
      >
        Delete Account
      </Button>
    </Container>
  ) : (
    <Container className="main container">
      {message.visible && (
        <Fragment>
          <Message
            onDismiss={() => setMessage({ visible: false })}
            color="blue"
          >
            <Message.Header>
              Welcome back{" "}
              {authentication.user && authentication.user.firstName}
            </Message.Header>
          </Message>
        </Fragment>
      )}
      <Grid columns={3} textAlign="center">
        <Grid.Row textAlign="center">
          <Grid.Column textAlign="center">
            <Card>
              <Card.Content>
                <Card.Header>Sessions: {sessions.length}</Card.Header>
                <Card.Description>Your active sessions count</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Header>Queries: {queries && queries.length}</Card.Header>
                <Card.Description>Your search history</Card.Description>
                {queries && <QueryHistoryModal />}
              </Card.Content>
            </Card>
          </Grid.Column>
          <Grid.Column>
            <Card>
              <Card.Content>
                <Card.Description textAlign="center">
                  <CreateSessionModal />
                </Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <SessionList userSessions={sessions} user={user} loading={loading} />
    </Container>
  );
};

AccountBoard.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  getSessions: PropTypes.func.isRequired,
  getQueriesByUserId: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  authentication: state.authenticationReducer,
  account: state.accountReducer,
  query: state.queryReducer,
  socketState: state.socketReducer
});

export default connect(
  mapStateToProps,
  {
    getCurrentUser,
    getSessions,
    getQueriesByUserId,
    deleteAccount,
    updateDeleteSession,
    setInitialSocket
  }
)(AccountBoard);
