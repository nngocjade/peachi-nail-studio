import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { listNailDesignDetails } from "../../redux/actions/nailDesignActions";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const NailGalleryDetailPage = ({ history, match }) => {
  // const [qty, setQty] = useState(1);

  const dispatch = useDispatch();

  const nailDesignDetails = useSelector((state) => state.nailDesignDetails);

  const { loading, error, nailDesign } = nailDesignDetails;

  useEffect(() => {
    dispatch(listNailDesignDetails(match.params.id));
  }, [dispatch, match]);

  return <></>;
};

export default NailGalleryDetailPage;
