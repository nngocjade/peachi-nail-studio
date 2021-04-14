import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/public_pages/HomePage";
import LoginPage from "./pages/auth_pages/LoginPage";
import RegisterPage from "./pages/auth_pages/RegisterPage";
import AboutPage from "./pages/public_pages/AboutPage";
import ReservationPage from "./pages/public_pages/ReservationPage";
import ProfilePage from "./pages/user_admin_pages/ProfilePage";
import UserListPage from "./pages/user_admin_pages/UserListPage";
import UserEditPage from "./pages/user_admin_pages/UserEditPage";
import NailDesignListPage from "./pages/user_admin_pages/NailDesignListPage";
import NailDesignEditPage from "./pages/user_admin_pages/NailDesignEditPage";
import BlogPage from "./pages/public_pages/BlogPage";
import BlogPostListPage from "./pages/user_admin_pages/BlogPostListPage";
import BlogPostEditPage from "./pages/user_admin_pages/BlogPostEditPage";
import NailGalleryPage from "./pages/public_pages/NailGalleryPage";
import BlogPostDetailPage from "./pages/public_pages/BlogPostDetailPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container fluid>
          <Route exact path="/about" component={AboutPage} />

          <Route exact path="/nailGallery" component={NailGalleryPage} />
          <Route
            exact
            path="/nail/search/:keyword"
            component={NailGalleryPage}
          />
          <Route
            exact
            path="/nail/page/:pageNumber"
            component={NailGalleryPage}
          />
          <Route exact path="/blog/page/:pageNumber" component={BlogPage} />
          <Route
            exact
            path="/nail/search/:keyword/page/:pageNumber"
            component={NailGalleryPage}
          />

          <Route
            exact
            path="/blog/search/:keyword/page/:pageNumber"
            component={BlogPage}
          />

          <Route exact path="/blog" component={BlogPage} />
          <Route exact path="/blogPost/:id" component={BlogPostDetailPage} />

          <Route exact path="/reservation" component={ReservationPage} />

          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/profile" component={ProfilePage} />
          <Route exact path="/register" component={RegisterPage} />

          {/* ======================== ADMIN ========================= */}

          <Route exact path="/admin/userlist" component={UserListPage} />

          <Route
            exact
            path="/admin/nailDesignList"
            component={NailDesignListPage}
          />
          <Route
            exact
            path="/admin/nailDesignList/:pageNumber"
            component={NailDesignListPage}
          />

          <Route
            exact
            path="/admin/blogPostList/:pageNumber"
            component={BlogPostListPage}
          />

          <Route
            exact
            path="/admin/blogPostList"
            component={BlogPostListPage}
          />

          <Route exact path="/admin/user/:id/edit" component={UserEditPage} />
          <Route
            exact
            path="/admin/nailDesign/:id/edit"
            component={NailDesignEditPage}
          />
          <Route
            exact
            path="/admin/blogPosts/:id/edit"
            component={BlogPostEditPage}
          />
          <Route exact path="/" component={HomePage} />
        </Container>
      </main>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
