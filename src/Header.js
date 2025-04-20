import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  return (
    <Navbar bg="black" variant="dark" expand="lg" className="py-3">
      <Container>
        <Nav className="w-100 d-flex justify-content-evenly">
          <Nav.Link as={Link} to="/home" className="text-white">HOME</Nav.Link>
          <Nav.Link as={Link} to="/results" className="text-white">RESULTS</Nav.Link>
          <Nav.Link as={Link} to="/players" className="text-white">PLAYERS</Nav.Link>
          <Nav.Link as={Link} to="/standings" className="text-white">STANDINGS</Nav.Link>
          <Nav.Link as={Link} to="/stats" className="text-white">STATS</Nav.Link>
          <Nav.Link as={Link} to="/clubinfo" className="text-white">CLUB INFO</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
