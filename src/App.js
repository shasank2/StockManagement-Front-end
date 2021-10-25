import React from 'react'
import Admin from './Pages/Admin'
import Dashboard from './Pages/Dashboard';
import BuySell from './Pages/BuySell';
import Transaction from './Pages/Transaction'

import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { LinkContainer } from 'react-router-bootstrap'
import { Nav, Navbar, Container } from 'react-bootstrap';
export const App = () => {
  return (
    <div style={{ backgroundColor: '#f9fafb' }} >
      <Router>
        <div>
          <Navbar style={{ backgroundColor: '#dcdee1' }}>
            <Container>
              <Navbar.Brand><h3>Novelty Stocks</h3></Navbar.Brand>
              <Nav className="ms-auto" >
                <LinkContainer to="/">
                  <Nav.Link >Dashboard</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/BuySell">
                  <Nav.Link >Buy/Sell</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/Transaction">
                  <Nav.Link >Transaction</Nav.Link>
                </LinkContainer>
              </Nav>
            </Container>
          </Navbar>
          <Switch>
            <Route path="/BuySell">
              <BuySell />
            </Route>
            <Route path="/Transaction">
              <Transaction />
            </Route>
            <Route path="/Admin">
              <Admin />
            </Route>
            <Route path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App

