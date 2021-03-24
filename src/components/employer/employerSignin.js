import React, { Component } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import './employer.css'

class EmployerSignin extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
    };
  }

  userTyping = (type, e) => {
    switch (type) {
      case "email":
        this.setState({ email: e.target.value });
        break;

      case "password":
        this.setState({ password: e.target.value });
        break;
      default:
        break;
    }
  };

  submitSignin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/employer/signin", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.error) {
          alert(res.data.error);
        } else {
          console.log(
            "Token: ",
            res.data.token,
            "User Details: ",
            res.data.user
          );
          alert("Signin Successfull");
        }
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };

  render() {
    return (
      <>
        <div style={{ padding: "4vh 0" }}>
          <Card
            style={{
              width: "40vw",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "4vh",
              marginBottom: "4vh",
              backgroundImage: "linear-gradient(to right, white , #ffc107)",
            }}
            className='employer_form_card_custom'
          >
            <Card.Header
              style={{
                backgroundColor: "#6c6c6c",
                color: "#ffc107",
                fontFamily: '"Merriweather", serif',
                fontSize: "1.25rem",
              }}
              as="h5"
            >
              Employer Signin
            </Card.Header>
            <Card.Body>
              <Form onSubmit={(e) => this.submitSignin(e)}>
                <Form.Group
                  style={{ textAlign: "left" }}
                  controlId="formBasicEmail"
                  onChange={(e) => this.userTyping("email", e)}
                >
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Email address
                  </Form.Label>
                  <Form.Control
                    style={{ borderColor: "#ffc107", color: "#000000" }}
                    type="email"
                    placeholder="Enter email"
                  />
                </Form.Group>

                <Form.Group
                  style={{ textAlign: "left" }}
                  controlId="formBasicPassword"
                  onChange={(e) => this.userTyping("password", e)}
                >
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Password
                  </Form.Label>
                  <Form.Control
                    style={{ borderColor: "#ffc107", color: "#000000" }}
                    type="password"
                    placeholder="Password"
                  />

                  <Form.Group
                    style={{
                      textAlign: "left",
                      fontSize: "1.5vh",
                      marginTop: "10px",
                    }}
                  >
                    <Link to="/employer-signup">
                      <a style={{ fontWeight: "bold" }}>
                        Don't have an account? Sign up
                      </a>
                    </Link>
                  </Form.Group>
                </Form.Group>
                <Button
                  style={{ color: "#ffc107", fontWeight: "bold" }}
                  variant="secondary"
                  type="submit"
                >
                  Signin
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </>
    );
  }
}
export default EmployerSignin;
