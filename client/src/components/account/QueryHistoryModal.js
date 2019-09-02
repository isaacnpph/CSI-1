import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getQueriesByUserId } from "../../actions/queryActions";
import { connect } from "react-redux";
import Moment from "react-moment";
import { Button } from "semantic-ui-react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { Link } from "react-router-dom";
import { getSessionById } from "../../actions/sessionActions";

const QueryHistory = ({
  getQueriesByUserId,
  query: { queries },
  getSessionById
}) => {
  useEffect(() => {
    getQueriesByUserId();
  }, [getQueriesByUserId]);

  const [modal, setModal] = useState(false);

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <Fragment>
      <Button
        color="blue"
        style={{ marginTop: "10px" }}
        onClick={e => onClick(e)}
        inverted
      >
        {" "}
        View query history
      </Button>
      <Modal isOpen={modal} toggle={() => onClick()} scrollable>
        <ModalHeader toggle={e => onClick(e)}>Query History</ModalHeader>
        <ModalBody>
          {queries.map(({ _id, keyword, date, addedIn }) => (
            <ListGroup key={_id} style={{ marginTop: "5px" }}>
              <ListGroupItem>
                <p>Keyword: {keyword}</p>
                <p>
                  Added on: <Moment format="DD/MM/YYYY">{date}</Moment>
                </p>
                <Link
                  className="ui button inverted green"
                  to={`/sessions/${addedIn}`}
                >
                  Enter session
                </Link>
              </ListGroupItem>
            </ListGroup>
          ))}
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

QueryHistory.propTypes = {
  getQueriesByUserId: PropTypes.func.isRequired,
  getSessionById: PropTypes.func.isRequired,
  session: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  session: state.sessionReducer,
  query: state.queryReducer
});

export default connect(
  mapStateToProps,
  { getQueriesByUserId, getSessionById }
)(QueryHistory);
