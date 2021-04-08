import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { listBlogPosts } from "../../redux/actions/blogPostActions";
import BlogPost from "../../components/blogPost/BlogPost";

const BlogPage = () => {
  const dispatch = useDispatch();

  const blogPostList = useSelector((state) => state.blogPostList);

  const { loading, error, blogPosts } = blogPostList;

  useEffect(() => {
    dispatch(listBlogPosts());
  }, [dispatch]);

  return (
    <Container>
      <h1>POSTS</h1>
      {blogPosts.map((blogPost) => (
        <Col md={6} className="m-5">
          <BlogPost blogPost={blogPost} />
        </Col>
      ))}
    </Container>
  );
};

export default BlogPage;
