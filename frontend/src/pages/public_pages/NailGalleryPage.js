import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Container, Row } from "react-bootstrap";
import EachDesign from "../../components/EachDesign";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listNailDesigns } from "../../redux/actions/nailDesignActions";
import Masonry from "react-masonry-css";
import "../../css/Masonry.css";
import SearchBox from "../../components/SearchBox";
import { Route } from "react-router";
import "../../css/Gallery.css";
import Paginate from "../../components/Paginate";
import DesignDetailModal from "../../components/DesignDetailModal";

const NailGalleryPage = ({ match, history }) => {
  const [choosenId, setChoosenId] = useState("");

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setChoosenId("");
  };
  const handleShow = (id) => {
    console.log("hererere");
    setShow(true);
    setChoosenId(id);
  };
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const nailDesignList = useSelector((state) => state.nailDesignList);

  console.log("nailDesignList", nailDesignList);

  const { loading, error, nailDesigns, page, pages } = nailDesignList;

  useEffect(() => {
    dispatch(listNailDesigns(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <>
      <Container className="nail-gallery" fluid="md">
        <Route
          render={({ history }) => (
            <SearchBox history={history} nailDesigns={nailDesigns} />
          )}
        />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {nailDesigns.map((eachDesign) => (
              <EachDesign eachDesign={eachDesign} handleShow={handleShow} />
            ))}
          </Masonry>
        )}
        <Paginate pages={pages} page={page} keyword={keyword ? keyword : " "} />
      </Container>
      <DesignDetailModal
        handleClose={handleClose}
        show={show}
        choosenId={choosenId}
      />
    </>
  );
};

export default NailGalleryPage;
