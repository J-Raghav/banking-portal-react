import React, { useContext, useState } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import UserContext from '../../contexts/UserContext';

export function NavMenu(props) {
  const [collapsed, setCollapsed] = useState(true)
  const [user, _,  logout] = useContext(UserContext);
  return (
    <header>
      <Navbar className="navbar-expand-sm navbar-toggleable-sm navbar-dark bg-dark ng-white border -bottom box-shadow mb-3" light>
        <Container>
          <NavbarBrand tag={Link} to="/">Banking Portal</NavbarBrand>
          <NavbarToggler onClick={() => setCollapsed(value => !value)} className="mr-2" />
          <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
            <ul className="navbar-nav flex-grow">
              {
                user.token
                  ? <>
                    <NavItem>
                      <NavLink tag={Link} to="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/ApplyLoan">Apply Loan</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/Update">Update Detail</NavLink>
                    </NavItem>
                    <NavItem>
                      <button className="btn btn-outline-danger ml-auto" onClick={logout}>Logout </button>
                    </NavItem>
                  </>
                  : <>
                    <NavItem>
                      <NavLink tag={Link} to="/Register">Register</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/Login">Login</NavLink>
                    </NavItem>
                  </>
              }
              {/* <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
                </NavItem> */}
            </ul>
          </Collapse>
        </Container>
      </Navbar>
    </header>
  );
}
