import React from 'react';
import styled from 'styled-components';
import { Check, Trash, Filter, Clock } from 'react-feather';
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
  min-width: 300px;
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

const SelectWrapper = styled.div`
  position: relative;
  margin-left: ${baseSize}px;
`;

const StyledSelect = styled.select`
  -webkit-appearance: none;
  border: none;
  font-size: 16px;
  line-height: 1.3;
  padding: 1px 5px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  color: transparent;
  background: none;
`;

const SelectIcon = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ddd;

  svg {
    width: 20px;
    height: 20px;
  }

  select:hover + & {
    color: ${textColor};
  }
`;

export const Select = ({ children, type, ...rest }) => (
  <SelectWrapper>
    <StyledSelect {...rest}>{children}</StyledSelect>
    {type === 'filter' && (
      <SelectIcon>
        <Clock />
      </SelectIcon>
    )}
  </SelectWrapper>
);

export const Tabs = styled.ul`
  display: flex;
  height: 54px;
  align-items: stretch;

  ${media.greaterThan('medium')`
    display: none;
  `};
`;

export const Tab = styled.li`
  flex: 1;
  cursor: pointer;
  padding: 10px;
  text-align: center;
  color: rgba(255, 255, 255, 0.75);
  line-height: 24px;
  font-weight: 900;
  text-transform: uppercase;
  font-size: 2.5vw;
  letter-spacing: 0.25vw;
  display: flex;
  align-items: center;
  justify-content: center;

  &:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.5);
  }
`;

export const Page = styled.div`
  height: 100%;
  width: 100%;
`;

export default Module;
