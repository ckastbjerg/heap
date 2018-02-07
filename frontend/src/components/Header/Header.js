import React, { Component } from 'react';
import media from 'styled-media-query';
import styled from 'styled-components';
import { Menu as Burger } from 'react-feather';

import { baseSize, headerHeight } from '../../tokens';

import Logo from './Logo';
import Menu from './Menu';

const Root = styled.header`
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.25);
  height: ${headerHeight}px;
  padding: ${baseSize}px;
  justify-content: space-between;
`;

const Navigation = styled.div`
  ${media.lessThan('medium')`
    width: 100%;
    z-index: 1;
    background: white;
    height: calc(100% - 60px);
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: absolute;
    top: 60px;
    left: 0;
  `} ${media.greaterThan('medium')`
    display: flex;
    align-items: center;
    margin-left: auto;
    justify-content: flex-end;
  `};
`;

const Avatar = styled.img`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  filter: grayscale(1);
  cursor: pointer;
  border: 2px solid
    ${props => (props.isMenuOpen ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)')};
`;

const BurgerWrapper = styled.div`
  ${media.greaterThan('medium')`
    display: none;
  `};
`;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      isMenuOpen: false
    };
    this.onClickBurger = this.onClickBurger.bind(this);
  }

  onClickBurger() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  }

  render() {
    return (
      <Root>
        <Logo />
        <BurgerWrapper>
          <Burger onClick={this.onClickBurger} />
        </BurgerWrapper>
        <Navigation isOpen={this.state.isMenuOpen}>
          <Menu onNavigate={this.onClickBurger} />
        </Navigation>
        <Avatar
          isMenuOpen={this.props.isMenuOpen}
          src={this.props.user.photoURL}
          onClick={this.props.onToggleMenu}
        />
      </Root>
    );
  }
}

export default Header;
