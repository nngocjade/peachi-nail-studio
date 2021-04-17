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
  createBlogPostComment,
} from "../../redux/actions/blogPostActions";
import "../../css/BlogPostDetail.css";
import Moment from "react-moment";
import Loader from "../../components/Loader";
import { BLOGPOST_CREATE_COMMENT_RESET } from "../../redux/constants/blogPostConstants";
import Message from "../../components/Message";

const BlogPostDetailPage = ({ match, history }) => {
  const dispatch = useDispatch();

  const [aComment, setAComment] = useState(" ");

  const blogPostDetails = useSelector((state) => state.blogPostDetails);
  const { loading, error, blogPost } = blogPostDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const blogPostCreateComment = useSelector(
    (state) => state.blogPostCreateComment
  );
  const {
    success: successBlogPostComment,
    error: errorBlogPostComment,
  } = blogPostCreateComment;

  useEffect(() => {
    if (successBlogPostComment) {
      alert("Comment Submitted!");
      setAComment("");
      dispatch({ type: BLOGPOST_CREATE_COMMENT_RESET });
    }
    dispatch(listBlogPostDetails(match.params.id));
  }, [dispatch, match, successBlogPostComment]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBlogPostComment(match.params.id, {
        aComment,
      })
    );
  };

  return (
    <Container className="blog-post-detail">
      {!blogPost ||
      blogPost === undefined ||
      blogPost.author === undefined ||
      blogPost.comments === undefined ? (
        <Loader />
      ) : (
        <>
          {/* HEADER */}
          <Row>
            <Col>
              <Image
                style={{ width: "30em", borderRadius: "15px" }}
                src={blogPost.imageUrl}
              />
            </Col>
            <Col className="text-body">
              <div>
                <h2>
                  <strong>{blogPost.title}</strong>
                </h2>
                <div className="last-updated">
                  <Moment fromNow>{blogPost.updatedAt}</Moment>
                </div>
              </div>
              <div>{blogPost.body}</div>
              <div className="artist-date-name">
                <div className="last-updated">
                  {/* Last updated: <Moment fromNow>{blogPost.updatedAt}</Moment> */}
                </div>
                <div className="author-and-image">
                  {blogPost.author.name}
                  <div className="author-image-wrapper">
                    <Image
                      style={{ with: "10em", height: "10em" }}
                      src={blogPost.author.imageUrl}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* BODY */}
          <Row className="body">
            <div className="paragraph">{blogPost.body}</div>

            <div className="paragraph">{blogPost.body}</div>
          </Row>

          <Row>
            <Col>
              <h3>
                {blogPost.numComments} Comment
                {blogPost.numComments > 0 ? "s" : ""}
              </h3>
              {blogPost.comments.length === 0 && <Message>No Comments</Message>}
              <ListGroup variant="flush">
                {blogPost.comments.map((comment) => (
                  <ListGroup.Item key={comment._id}>
                    <div className="comment-name-date">
                      <strong>{comment.name}</strong>
                      <p>{comment.createdAt.substring(0, 10)}</p>
                    </div>

                    <p>{comment.aComment}</p>
                  </ListGroup.Item>
                ))}
                {/* {!blogPost.Comments.some((rev) => rev.user === userInfo._id) && ( */}
                <ListGroup.Item>
                  <h3 className="write-comment">Write a Comment</h3>
                  {errorBlogPostComment && (
                    <Message>{errorBlogPostComment}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      {/* COMMENT */}
                      <Form.Group controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={aComment}
                          onChange={(e) => setAComment(e.target.value)}
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
