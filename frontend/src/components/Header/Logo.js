import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { color1, color2, color3, color4 } from '../../tokens';

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 28px;
  letter-spacing: 3px;
  font-weight: 900;
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.75);
  text-transform: uppercase;
  border-radius: 3px;

  span {
    color: ${color1};
  }

  span:nth-child(2) {
    color: ${color2};
  }

  span:nth-child(3) {
    color: ${color3};
  }

  span:nth-child(4) {
    color: ${color4};
  }
`;

export default () => (
  <Link to="/">
    <Logo>
      <span>h</span>
      <span>e</span>
      <span>a</span>
      <span>p</span>
    </Logo>
  </Link>
);
