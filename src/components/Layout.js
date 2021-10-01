import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './navmenu/NavMenu';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div className="bg-light" style={{minHeight: 100 + 'vh'}}>
        <NavMenu />
        <Container className="pb-4">
          {this.props.children}
        </Container>
      </div>
    );
  }
}
