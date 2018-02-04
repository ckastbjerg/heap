import React, { Component } from 'react';
import styled from 'styled-components';

import { baseSize, headerHeight } from '../../tokens';

const Root = styled.header`
  position: relative;
`;

const Avatar = styled.img`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  filter: grayscale(1);
`;

const Menu = styled.ul`
  background: white;
  position: absolute;
  top: calc(100% + 5px);
  right: 0;
  width: 220px;
  border-radius: 3px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.25);
  z-index: 1;
  padding: 10px 0;
`;
const MenuItem = styled.li`
  cursor: pointer;
  padding: 10px;
`;

const Separator = styled.div`
  background: #ddd;
  padding: 3px;
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false
    };
    this.onToggleMenuVisibility = this.onToggleMenuVisibility.bind(this);
  }

  onToggleMenuVisibility() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    const { isMenuOpen } = this.state;
    const { user, users = [], onSignOut, onViewAsFriend } = this.props;
    return (
      <Root>
        <Avatar src={user.photoURL} onClick={this.onToggleMenuVisibility} />
        {isMenuOpen && (
          <Menu>
            <Separator>Your friends profiles</Separator>
            {Object.keys(users).map(id => (
              <MenuItem
                onClick={() => {
                  onViewAsFriend(id);
                  this.onToggleMenuVisibility();
                }}
              >
                {id}
              </MenuItem>
            ))}
            <Separator>Account</Separator>
            <MenuItem onClick={onSignOut}>Sign out</MenuItem>
          </Menu>
        )}
      </Root>
    );
  }
}

export default Header;
