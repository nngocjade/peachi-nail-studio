import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { listBlogPosts } from "../../redux/actions/blogPostActions";
import BlogPost from "../../components/blogPost/BlogPost";
import { Route } from "react-router";
import SearchBox from "../../components/SearchBox";
import BlogPaginate from "../../components/BlogPaginate";

const BlogPage = ({ match, history }) => {
  const matchedKeyword = match.params.keyword;
  const [keyword, setKeyword] = useState("");

  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const blogPostList = useSelector((state) => state.blogPostList);

  const { loading, error, blogPosts, page, pages } = blogPostList;

  useEffect(() => {
    dispatch(listBlogPosts(matchedKeyword, pageNumber));
  }, [dispatch, matchedKeyword, pageNumber]);

  // ================ SEARCH BOX SUBMIT =======================
  // ================ SEARCH BOX SUBMIT =======================
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/blog/search/${keyword}`);
    } else {
      history.push("/blog");
    }
  };

  console.log("blog page keyword", keyword);

  return (
    <Container className="blog">
      <h1>POSTS</h1>
      {blogPosts?.map((blogPost) => (
        <Col md={8} className="m-5">
          <BlogPost blogPost={blogPost} />
        </Col>
      ))}
      <Route
        render={({ history }) => (
          <SearchBox
            history={history}
            submitHandler={submitHandler}
            setKeyword={setKeyword}
          />
        )}
      />
      <BlogPaginate
        pages={pages}
        page={page}
        keyword={keyword ? keyword : null}
      />
    </Container>
  );
};

export default BlogPage;
