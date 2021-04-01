import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { listBlogPosts } from "../redux/actions/blogPostActions";
import BlogPost from "../components/blogPost/BlogPost";
import BlogPostForm from "../components/blogPost/BlogPostForm";

const BlogPage = () => {
  const dispatch = useDispatch();

  const blogPostList = useSelector((state) => state.blogPostList);

  const { loading, error, blogPosts } = blogPostList;

  useEffect(() => {
    dispatch(listBlogPosts());
  }, [dispatch]);

  return (
    <Container>
      <BlogPostForm />
      <h1>POSTS</h1>
      {blogPosts.map((blogPost) => (
        <BlogPost blogPost={blogPost} />
      ))}
    </Container>
  );
};

export default BlogPage;
