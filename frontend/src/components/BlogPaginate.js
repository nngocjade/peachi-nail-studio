import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "../css/Paginate.css";

const BlogPaginate = ({ pages, page, isAdmin = false, keyword }) => {
  console.log("page and pages", page, pages);
  console.log("keyword", keyword);
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/blog/search/${keyword}/page/${x + 1}`
                  : `/blog/page/${x + 1}`
                : `/admin/blogPostList/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default BlogPaginate;
