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

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container fluid>
          <Route path="/about" component={AboutPage} />
          <Route path="/nailGallery" component={NailGalleryPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/reservation" component={ReservationPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/register" component={RegisterPage} />

          <Route path="/admin/userlist" component={UserListPage} />
          <Route path="/admin/nailDesignList" component={NailDesignListPage} />
          <Route path="/admin/blogPostList" component={BlogPostListPage} />

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
          <Route path="/" component={HomePage} exact />
        </Container>
      </main>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;
