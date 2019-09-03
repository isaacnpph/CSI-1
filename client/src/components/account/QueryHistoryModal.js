import React, { Fragment, useState } from "react";
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

const QueryHistory = ({ userQueries }) => {
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
          {userQueries.map(({ _id, keyword, date, addedIn }) => (
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

export default connect(
  null,
  {}
)(QueryHistory);
