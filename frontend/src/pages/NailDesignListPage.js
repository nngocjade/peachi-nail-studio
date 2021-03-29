import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listNailDesigns,
  deleteNailDesign,
} from "../redux/actions/nailDesignActions";

const NailDesignListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const nailDesignList = useSelector((state) => state.nailDesignList);
  const { loading, error, nailDesigns } = nailDesignList;

  const nailDesignDelete = useSelector((state) => state.nailDesignDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = nailDesignDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listNailDesigns());
    }
    // ADDING THE SUCCESSDELETE TO USEFFECT WILL RELOAD/REFRESH PAGE AFTER AN ITEM HAS BEEN DELETED
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteNailDesign(id));
    }
  };

  const createProductHandler = (product) => {
    // CREATE PRODUCTS
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Nail Design List</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Add Design
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>STYLE</th>
                <th>DESCRIPTION</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {nailDesigns.map((nailDesign) => (
                <tr key={nailDesign._id}>
                  <td>{nailDesign._id}</td>
                  <td>{nailDesign.name}</td>
                  <td>{nailDesign.category}</td>
                  <td>{nailDesign.style}</td>
                  <td>{nailDesign.description}</td>
                  <td>
                    <LinkContainer
                      to={`/admin/nailDesign/${nailDesign._id}/edit`}
                    >
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(nailDesign._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default NailDesignListPage;
