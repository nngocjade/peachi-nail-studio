import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  listNailDesigns,
  deleteNailDesign,
  createNailDesign,
} from "../../redux/actions/nailDesignActions";
import { NAILDESIGN_CREATE_RESET } from "../../redux/constants/nailDesignConstants";
import NailPaginate from "../../components/NailPaginate";

const NailDesignListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const nailDesignList = useSelector((state) => state.nailDesignList);
  const { loading, error, nailDesigns, page, pages } = nailDesignList;

  const nailDesignDelete = useSelector((state) => state.nailDesignDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = nailDesignDelete;

  const nailDesignCreate = useSelector((state) => state.nailDesignCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    nailDesign: createdNailDesign,
  } = nailDesignCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: NAILDESIGN_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/nailDesign/${createdNailDesign._id}/edit`);
    } else {
      dispatch(listNailDesigns(" ", pageNumber));
    }
    // ADDING THE SUCCESSDELETE TO USEFFECT WILL RELOAD/REFRESH PAGE AFTER AN ITEM HAS BEEN DELETED
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    createdNailDesign,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteNailDesign(id));
    }
  };

  const createDesignHandler = () => {
    dispatch(createNailDesign());
  };

  return (
    <div className="admin-nail-design-list">
      <Row className="align-items-center">
        <Col>
          <h1>Nail Design List</h1>
          <NailPaginate pages={pages} page={page} isAdmin={true} />
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createDesignHandler}>
            <i className="fas fa-plus"></i> Add Design
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
                <th>IMAGE</th>
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
                  <td>
                    <div className="image-wrapper">
                      <Image
                        className="small-image"
                        src={nailDesign.image}
                        alt="nail design image"
                      />
                    </div>
                  </td>
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
    </div>
  );
};

export default NailDesignListPage;

// title,
// body,
// tags,
// imageUrl,
// author,
