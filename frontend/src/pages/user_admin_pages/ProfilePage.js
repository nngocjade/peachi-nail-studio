import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Table,
  Container,
  Tab,
  Nav,
  Card,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message.js";
import Loader from "../../components/Loader.js";
import {
  getUserDetails,
  updateUserProfile,
} from "../../redux/actions/userActions.js";
import { USER_UPDATE_PROFILE_RESET } from "../../redux/constants/userConstants";

const ProfilePage = ({ history, location }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  console.log("user detail", userDetails);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
        setImageUrl(user.imageUrl);
      }
    }
  }, [history, userInfo, dispatch, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({ id: user._id, name, email, password, imageUrl })
      );
    }
  };
  const updateProfile = (
    <Row>
      <Col md={5}>
        <h2>User Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          {!imageUrl ? (
            <Loader />
          ) : (
            <Image
              src={
                imageUrl
                // ? "https://pbs.twimg.com/profile_images/602729491916435458/hSu0UjMC_400x400.jpg"
                // : imageUrl
              }
            />
          )}
          {/* NAME */}
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* EMAIL */}
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* PASSWORD */}
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* CONFIRM PASSWORD */}
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button onClick={() => myWidget.open()} variant="primary">
            Upload
          </Button>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>
    </Row>
  );

  const favorite = (
    <>
      {!userDetails ||
      userDetails === undefined ||
      userDetails.user === undefined ||
      userDetails.user.favorites === undefined ? (
        <Loader />
      ) : (
        userDetails.user.favorites.map((f) => (
          <Card.Body style={{ width: "18rem" }}>
            <Card.Img variant="top" src={f.image} />
            <Card.Body>
              <Card.Title>{f.name}</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>

            <Card.Body>
              <Card.Link href="#">Card Link</Card.Link>
              <Card.Link href="#">Another Link</Card.Link>
            </Card.Body>
          </Card.Body>
        ))
      )}
    </>
  );

  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "nngocjade",
      uploadPreset: "peachi",
    },
    (error, result) => {
      if (!error && result && result.event === "success") {
        console.log("Done! Here is the image info: ", result.info);
        setImageUrl(result.info.url);
      }
    }
  );

  return (
    <Container className="text-center">
      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="first">Update Profile</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">Favorite</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="first">{updateProfile}</Tab.Pane>
              <Tab.Pane eventKey="second">{favorite}</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default ProfilePage;
