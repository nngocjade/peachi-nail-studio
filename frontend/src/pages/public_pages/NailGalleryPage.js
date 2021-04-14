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
import NailPaginate from "../../components/NailPaginate";
import DesignDetailModal from "../../components/DesignDetailModal";

const NailGalleryPage = ({ match, history }) => {
  const [choosenId, setChoosenId] = useState("");
  const [keyword, setKeyword] = useState("");
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
  const matchedKeyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const nailDesignList = useSelector((state) => state.nailDesignList);

  console.log("nailDesignList", nailDesignList);

  const { loading, error, nailDesigns, page, pages } = nailDesignList;

  useEffect(() => {
    dispatch(listNailDesigns(matchedKeyword, pageNumber));
  }, [dispatch, matchedKeyword, pageNumber]);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };
  // ================ SEARCH BOX SUBMIT =======================
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/nail/search/${keyword}`);
    } else {
      history.push("/nailGallery");
    }
  };

  return (
    <>
      <Container className="nail-gallery" fluid="md">
        <Route
          render={({ history }) => (
            <SearchBox
              history={history}
              submitHandler={submitHandler}
              setKeyword={setKeyword}
            />
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
        <NailPaginate
          pages={pages}
          page={page}
          keyword={keyword ? keyword : " "}
        />
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
