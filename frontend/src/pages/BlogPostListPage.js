import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listBlogPosts,
  createBlogPost,
  deleteBlogPost,
} from "../redux/actions/blogPostActions";
import { BLOGPOST_CREATE_RESET } from "../redux/constants/blogPostConstants";

const BlogPostListPage = ({ history, match }) => {
  const dispatch = useDispatch();

  const blogPostList = useSelector((state) => state.blogPostList);
  const { loading, error, blogPosts } = blogPostList;

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
    blogPost: createdBlogPost,
  } = blogPostCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: BLOGPOST_CREATE_RESET });
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/admin/blogPost/${createdBlogPost._id}/edit`);
    } else {
      dispatch(listBlogPosts());
    }
    // ADDING THE SUCCESSDELETE TO USEFFECT WILL RELOAD/REFRESH PAGE AFTER AN ITEM HAS BEEN DELETED
  }, [
    dispatch,
    history,
    userInfo,
    successCreate,
    createdBlogPost,
    successDelete,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteBlogPost(id));
    }
  };

  const createBlogPostHandler = () => {
    dispatch(createBlogPost());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Blog Post List</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createBlogPostHandler}>
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
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>TITLE</th>
                <th>DESCRIPTION</th>
                <th>CREATOR</th>
                <th>IMAGE</th>
                <th>LINK COUNT</th>
                <th>CREATED AT</th>
                <th>LAST UPDATED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {blogPosts.map((blogPost) => (
                <tr key={blogPost._id}>
                  <td>{blogPost._id}</td>
                  <td>{blogPost.title}</td>
                  <td>{blogPost.description}</td>
                  <td>{blogPost.creator}</td>
                  <td>{blogPost.image}</td>
                  <td>{blogPost.likeCount}</td>
                  <td>{blogPost.createdAt}</td>
                  <td>{blogPost.updated}</td>
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
          </Table>
        </>
      )}
    </>
  );
};

export default BlogPostListPage;
