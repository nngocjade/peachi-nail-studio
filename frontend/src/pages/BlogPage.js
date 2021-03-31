import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import BlogPosts from "../components/Posts/BlogPosts";
import { listBlogPosts } from "../redux/actions/blogPostActions";

const BlogPage = () => {
  const dispatch = useDispatch();

  const blogPostList = useSelector((state) => state.blogPostList);

  const { loading, error, blogPosts } = blogPostList;

  console.log("blogPost", blogPosts);

  useEffect(() => {
    dispatch(listBlogPosts());
  }, [dispatch]);

  return (
    <Container>
      <h1>POSTS</h1>
      {blogPosts.map((blogPost) => (
        <BlogPosts blogPost={blogPost} />
      ))}
    </Container>
  );
};

export default BlogPage;
