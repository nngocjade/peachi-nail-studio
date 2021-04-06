import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import EachDesign from "../../components/EachDesign";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listNailDesigns } from "../../redux/actions/nailDesignActions";
import Masonry from "react-masonry-css";
import "../../css/Masonry.css";

const NailGalleryPage = () => {
  const dispatch = useDispatch();

  const nailDesignList = useSelector((state) => state.nailDesignList);

  console.log("nailDesignList", nailDesignList);

  const { loading, error, nailDesigns } = nailDesignList;

  useEffect(() => {
    dispatch(listNailDesigns());
  }, [dispatch]);

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Container className="nail-gallery" fluid="md">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Masonry
            breakpointCols={breakpoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {nailDesigns.map((eachDesign) => (
              <div>
                <EachDesign eachDesign={eachDesign} />
              </div>
            ))}
          </Masonry>
        </>
      )}
    </Container>
  );
};

export default NailGalleryPage;
