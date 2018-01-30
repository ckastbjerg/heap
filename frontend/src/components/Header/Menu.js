import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import media from 'styled-media-query';
import firebase from 'firebase';

import { baseSize, borderColor, textColor } from '../../tokens';

const Menu = styled.ul`
  ${media.greaterThan('medium')`
    display: flex;
  `};
`;

const Item = styled.li`
  ${media.lessThan('medium')`
    border-top: 1px solid ${borderColor};
  `} ${media.greaterThan('medium')`
    align-items: center;
    display: flex;

    &:not(:last-child) {
      margin-right: ${baseSize * 1}px;
    }
  `};
`;

const StyledLink = styled(NavLink)`
  color: ${textColor};
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 1px;
  font-weight: 900;
  padding: 7px 10px;
  border-radius: 3px;
  transition: 250ms;
  display: block;

  &:hover {
    background-color: rgba(0, 0, 0, 0.075);
  }

  &.is-active {
    color: white;
    background-color: rgba(0, 0, 0, 0.075);
  }

  ${media.lessThan('medium')`
    padding: 14px;
  `};
`;

export default ({ onNavigate }) => (
  <Menu>
    <Item>
      <StyledLink
        activeClassName="is-active"
        to="/theatrical-movies"
        onClick={onNavigate}
      >
        Theatrical movies
      </StyledLink>
    </Item>
    <Item>
      <StyledLink
        activeClassName="is-active"
        to="/digital-movies"
        onClick={onNavigate}
      >
        Digital movies
      </StyledLink>
    </Item>
    <Item>
      <StyledLink activeClassName="is-active" to="/series" onClick={onNavigate}>
        TV Shows
      </StyledLink>
    </Item>
    <Item>
      <StyledLink activeClassName="is-active" to="/games" onClick={onNavigate}>
        Video Games
      </StyledLink>
    </Item>
  </Menu>
);
