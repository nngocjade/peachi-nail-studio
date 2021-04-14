import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { listBlogPosts } from "../../redux/actions/blogPostActions";
import BlogPost from "../../components/blogPost/BlogPost";
import { Route } from "react-router";
import SearchBox from "../../components/SearchBox";
import BlogPaginate from "../../components/BlogPaginate";

const BlogPage = ({ match }) => {
  const keyword = match.params.keyword;

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const blogPostList = useSelector((state) => state.blogPostList);

  const { loading, error, blogPosts, page, pages } = blogPostList;

  useEffect(() => {
    dispatch(listBlogPosts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <Container>
      <h1>POSTS</h1>
      {blogPosts.map((blogPost) => (
        <Col md={6} className="m-5">
          <BlogPost blogPost={blogPost} />
        </Col>
      ))}
      {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
      <BlogPaginate
        pages={pages}
        page={page}
        keyword={keyword ? keyword : " "}
      />
    </Container>
  );
};

export default BlogPage;
