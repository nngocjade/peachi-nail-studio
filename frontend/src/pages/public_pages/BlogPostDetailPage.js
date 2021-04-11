import React, { useEffect } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listBlogPostDetails } from "../../redux/actions/blogPostActions";
import "../../css/BlogPostDetail.css";
import Moment from "react-moment";
import AuthorIcon from "../../images/girl-svgrepo-com.svg";
import Loader from "../../components/Loader";

const BlogPostDetailPage = ({ match, history }) => {
  const dispatch = useDispatch();

  const blogPostDetails = useSelector((state) => state.blogPostDetails);
  const { loading, error, blogPost } = blogPostDetails;

  console.log("blogPostDetails", blogPost);
  // console.log("blogPostAuthorImage", blogPost.author.imageUrl);

  useEffect(() => {
    dispatch(listBlogPostDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <Container className="blog-post-detail">
      {!blogPost || blogPost === undefined || blogPost.author === undefined ? (
        <Loader />
      ) : (
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
      )}
    </Container>
  );
};

export default BlogPostDetailPage;
