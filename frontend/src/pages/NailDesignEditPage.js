// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Form, Button, Container, Row, Col } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import Message from "../components/Message.js";
// import Loader from "../components/Loader.js";
// import { listNailDesigns } from "../redux/actions/nailDesignActions";
// import { USER_UPDATE_RESET } from "../redux/constants/userConstants";

// const UserEditPage = ({ match, history }) => {
//   const userId = match.params.id;

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);

//   const dispatch = useDispatch();

//   const userDetails = useSelector((state) => state.userDetails);
//   const { loading, error, user } = userDetails;

//   const userUpdate = useSelector((state) => state.userUpdate);
//   const {
//     loading: loadingUpdate,
//     error: errorUpdate,
//     success: successUpdate,
//   } = userUpdate;

//   useEffect(() => {
//     if (successUpdate) {
//       dispatch({ type: USER_UPDATE_RESET });
//       history.push("/admin/userlist");
//     } else {
//       if (!user.name || user._id !== userId) {
//         dispatch(getUserDetails(userId));
//       } else {
//         setName(user.name);
//         setEmail(user.email);
//         setIsAdmin(user.isAdmin);
//       }
//     }
//   }, [user, dispatch, userId, successUpdate, history]);

//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({ _id: userId, name, email, isAdmin }));
//   };

//   return (
//     <>
//       <Link to="/admin/userList" className="btn btn-light my-3">
//         Go Back
//       </Link>
//       <Container className="text-center">
//         <Row>
//           <Col md={5}>
//             <h1>Edit User</h1>
//             {loadingUpdate && <Loader />}
//             {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
//             {loading ? (
//               <Loader />
//             ) : error ? (
//               <Message variant="danger">{error}</Message>
//             ) : (
//               <Form onSubmit={submitHandler}>
//                 {/* NAME */}
//                 <Form.Group controlId="name">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     type="name"
//                     placeholder="Enter name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                   ></Form.Control>
//                 </Form.Group>

//                 {/* EMAIL */}
//                 <Form.Group controlId="email">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   ></Form.Control>
//                 </Form.Group>

//                 {/* PASSWORD */}
//                 <Form.Group controlId="isadmin">
//                   <Form.Check
//                     type="checkbox"
//                     label="Is Admin"
//                     value={isAdmin}
//                     checked={isAdmin}
//                     onChange={(e) => setIsAdmin(e.target.checked)}
//                   ></Form.Check>
//                 </Form.Group>
//                 <Button type="submit" variant="primary">
//                   Update
//                 </Button>
//               </Form>
//             )}
//           </Col>
//         </Row>
//       </Container>
//     </>
//   );
// };

// export default UserEditPage;
