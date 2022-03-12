import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./HomeScreen.scss";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container>
        <div className="home-page-container">
          <div className="left-side">
            <img src={require("../assets/images/interview.png")} alt="Pic" />
          </div>
          <div className="right-side">
            <h1>The largest community of developers and companies.</h1>
            <div className="info-section">
              <div className="info-item">
                <h2>For Companies</h2>
                <p>
                  Use our platform to interview, identify and hire developers
                  wherever they are.
                </p>
                <Button
                  variant="primary"
                  onClick={(e) => navigate("/owner/signup/")}
                >
                  Start Hiring
                </Button>
              </div>
              <div className="info-item">
                <h2>For Developers</h2>
                <p>
                  Join the largest developers community to practise coding
                  skills, prepare for job interviews and get hired.
                </p>
                <Button
                  variant="primary"
                  onClick={(e) => navigate("/candidate/signup/")}
                >
                  Start Coding
                </Button>
              </div>
            </div>
            <br />
          </div>
        </div>
      </Container>
    </>
  );
};

export default HomeScreen;
