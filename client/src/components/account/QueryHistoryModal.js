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

const QueryHistory = ({ getQueriesByUserId, query: { queries } }) => {
  useEffect(() => {
    getQueriesByUserId();
  }, [getQueriesByUserId]);

  const [modal, setModal] = useState(false);

  const onClick = () => {
    setModal(!modal);
  };

  return (
    <Fragment>
      <Button onClick={e => onClick(e)}> View query history</Button>
      <Modal isOpen={modal} toggle={() => onClick()} scrollable>
        <ModalHeader toggle={e => onClick(e)}>Query History</ModalHeader>
        <ModalBody>
          {queries.map(({ _id, keyword, date }) => (
            <ListGroup key={_id}>
              <ListGroupItem>
                <p>Keyword: {keyword}</p>
                <p>
                  Added On: <Moment format="DD/MM/YYYY">{date}</Moment>
                </p>
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
  session: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  session: state.sessionReducer,
  query: state.queryReducer
});

export default connect(
  mapStateToProps,
  { getQueriesByUserId }
)(QueryHistory);
