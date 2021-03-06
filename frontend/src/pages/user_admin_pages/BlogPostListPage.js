import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Image, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import {
  listBlogPosts,
  createBlogPost,
  deleteBlogPost,
} from "../../redux/actions/blogPostActions";
import { BLOGPOST_CREATE_RESET } from "../../redux/constants/blogPostConstants";
import CreatePostModal from "../../components/CreatePostModal";
import "../../css/Admin.css";
import BlogPaginate from "../../components/BlogPaginate";
import "../../css/Table.css";

const BlogPostListPage = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const blogPostList = useSelector((state) => state.blogPostList);
  const { loading, error, blogPosts, page, pages } = blogPostList;

  console.log("blog posts", blogPosts);

  const blogPostDelete = useSelector((state) => state.blogPostDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = blogPostDelete;

  const blogPostCreate = useSelector((state) => state.blogPostCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = blogPostCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: BLOGPOST_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/blogPostList`);
    } else {
      let keyword;
      dispatch(listBlogPosts(keyword, pageNumber));
    }
    // ADDING THE SUCCESSDELETE TO USEFFECT WILL RELOAD/REFRESH PAGE AFTER AN ITEM HAS BEEN DELETED
  }, [dispatch, history, userInfo, successCreate, successDelete, pageNumber]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteBlogPost(id));
    }
  };

  const truncateText = (text, textLength) => {
    if (text.length > 20) {
      return text.slice(0, textLength - 1) + "...";
    } else return text;
  };

  return (
    <Container className="admin-blog-post-list">
      <Row className="align-items-center">
        <Col>
          <h1>Blog Post List</h1>
          <BlogPaginate pages={pages} page={page} isAdmin={true} />
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => handleShow()}>
            <i className="fas fa-plus"></i> Add Post
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
          <table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>BODY</th>
                <th>AUTHOR</th>
                <th>IMAGE URL</th>
                <th>LIKE COUNT</th>
                <th>LAST UPDATED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((blogPost) => (
                <tr key={blogPost._id}>
                  <td>{truncateText(blogPost._id, 10)}</td>
                  <td>{blogPost.title}</td>
                  <td>{truncateText(blogPost.body, 50)}</td>
                  <td>{truncateText(blogPost.author, 10)}</td>
                  <td>
                    <div className="image-wrapper">
                      <Image
                        className="small-image"
                        src={blogPost.imageUrl}
                        alt="blog post image"
                      />
                    </div>
                  </td>
                  <td>{blogPost.likeCount}</td>
                  <td>{blogPost.updatedAt}</td>
                  <td>
                    <LinkContainer to={`/admin/blogPosts/${blogPost._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(blogPost._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <CreatePostModal
            handleClose={handleClose}
            show={show}
            setShow={setShow}
          />
        </>
      )}
    </Container>
  );
};

export default BlogPostListPage;
