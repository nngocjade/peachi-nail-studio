import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listBlogPostDetails,
  createBlogPostReview,
} from "../../redux/actions/blogPostActions";
import "../../css/BlogPostDetail.css";
import Moment from "react-moment";
import Loader from "../../components/Loader";
import { BLOGPOST_CREATE_REVIEW_RESET } from "../../redux/constants/blogPostConstants";
import Message from "../../components/Message";

const BlogPostDetailPage = ({ match, history }) => {
  const dispatch = useDispatch();

  const [likeCount, setLikeCount] = useState(0);
  const [comment, setComment] = useState(" ");

  const blogPostDetails = useSelector((state) => state.blogPostDetails);
  const { loading, error, blogPost } = blogPostDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogPostCreateReview = useSelector(
    (state) => state.blogPostCreateReview
  );
  const {
    success: successBlogPostReview,
    error: errorBlogPostReview,
  } = blogPostCreateReview;

  useEffect(() => {
    if (successBlogPostReview) {
      alert("Review Submitted!");
      setLikeCount(0);
      setComment("");
      dispatch({ type: BLOGPOST_CREATE_REVIEW_RESET });
    }
    dispatch(listBlogPostDetails(match.params.id));
  }, [dispatch, match, successBlogPostReview]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBlogPostReview(match.params.id, {
        // likeCount,
        comment,
      })
    );
  };

  return (
    <Container className="blog-post-detail">
      {!blogPost ||
      blogPost === undefined ||
      blogPost.author === undefined ||
      blogPost.reviews === undefined ? (
        <Loader />
      ) : (
        <>
          <Row>
            <Col className="image">
              <Image
                style={{ width: "30rem", borderRadius: "50%" }}
                src={blogPost.imageUrl}
              />
            </Col>
            <Col className="text-body">
              <div>
                <h2>
                  <strong>{blogPost.title}</strong>
                </h2>
              </div>
              <div>{blogPost.body}</div>
              <div className="artist-date">
                <div className="last-updated">
                  Last updated: <Moment fromNow>{blogPost.updatedAt}</Moment>
                </div>
                <div>
                  {blogPost.author.name}
                  <Image
                    style={{ with: "10em", height: "10em" }}
                    src={blogPost.author.imageUrl}
                  />
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {blogPost.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {blogPost.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    {/* add  Ratin component here */}
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                {/* {!blogPost.reviews.some((rev) => rev.user === userInfo._id) && ( */}
                <ListGroup.Item>
                  <h2>Write a Comment</h2>
                  {errorBlogPostReview && (
                    <Message>{errorBlogPostReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      {/* <Form.Group controlId="likeCount">
                        <Form.Label>Like Count</Form.Label>
                        <Form.Control
                          as="select"
                          value={likeCount}
                          onChange={(e) => setLikeCount(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group> */}

                      {/* COMMENT */}
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      {/* SUBMIT BUTTON */}
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a comment
                    </Message>
                  )}
                </ListGroup.Item>
                {/* )} */}
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default BlogPostDetailPage;
