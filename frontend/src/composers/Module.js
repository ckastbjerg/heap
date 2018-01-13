import React from 'react';
import styled from 'styled-components';
import { Check, Trash } from 'react-feather';
import media from 'styled-media-query';

import {
  baseSize,
  textColor,
  borderColor,
  borderColorDiscreet,
  color1,
  color3,
  fontFamily
} from '../tokens';

const Module = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  padding: ${baseSize}px;
  border-bottom: 1px solid ${borderColor};
  display: flex;
  align-items: center;
  background-color: white;
`;

export const Title = styled.h1`
  color: ${textColor};
  text-transform: capitalize;
  margin-right: auto;
  line-height: 28px;
  font-weight: 900;
  font-size: 15px;
`;

export const Content = styled.div``;

export const List = styled.ul`
  flex: 1;
  overflow: scroll;
`;

export const Item = styled.li`
  border-bottom: 1px solid ${borderColorDiscreet};
  background: white;
  display: flex;
  justify-content: space-between;
`;

export const Name = styled.a`
  cursor: pointer;
  padding: ${baseSize}px;
  line-height: 1.3;
  flex: 1;
  text-decoration: none;
  color: initial;

  &:hover {
    color: ${color1};
  }
`;

export const Rating = styled.span`
  font-size: 9px;
`;

export const Time = styled.div`
  line-height: 1.3;
  padding: ${baseSize}px;
  color: #ddd;
  font-size: 14px;
`;

export const TextField = styled.input`
  height: 45px;
  background: white;
  padding: 0 ${baseSize}px;
  font-family: ${fontFamily};
  font-size: 16px;
  border: none;
  border-bottom: 1px solid ${borderColor};
  width: 100%;
  box-shadow: inset 0 0 10px #f2f2f2;
`;

const IconButton = styled.button`
  background: none;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  height: 24px;
  width: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  color: #ddd;

  &:first-child {
    margin-left: ${baseSize}px;
  }

  &:last-child {
    margin-right: ${baseSize}px;
  }

  &:hover {
    border-color: #000;
    color: ${textColor};
  }
`;

export const Archive = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <Check size="18px" />
  </IconButton>
);

export const Remove = ({ onClick }) => (
  <IconButton onClick={onClick}>
    <Trash size="16px" />
  </IconButton>
);

export const Cover = styled.img`
  height: 64px;
`;

const gearIcon = `
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="${color3}"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <circle cx="12" cy="12" r="10"/><path d="M12 6v6l3 3"/>
  </svg>
`;

export const Select = styled.select`
  -webkit-appearance: none;
  border: none;
  font-size: 16px;
  line-height: 1.3;
  padding: 1px 5px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  margin-left: ${baseSize}px;
  color: transparent;
  background: url('data:image/svg+xml;utf8,${gearIcon}') no-repeat;
  background-size: 22px;
  background-position: center;
  background-repeat: no-repeat;
`;

export const Tabs = styled.ul`
  display: flex;
  height: 50px;
  align-items: center;

  ${media.greaterThan('medium')`
    display: none;
  `};
`;

export const Tab = styled.li`
  flex: 1;
  cursor: pointer;
  padding: ${baseSize}px;
  text-align: center;
  color: ${props => (props.isActive ? color1 : borderColor)};
  line-height: 24px;

  &:not(:last-child) {
    border-right: 1px solid ${borderColorDiscreet};
  }
`;

export const Page = styled.div`
  height: 100%;
  width: 100%;
`;

export default Module;
