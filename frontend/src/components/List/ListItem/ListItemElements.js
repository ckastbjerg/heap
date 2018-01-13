import styled from 'styled-components';

export const Root = styled.li`
  position: relative;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  &:after {
    transition: 250ms;
    content: '';
    background: linear-gradient(
      to right,
      white 0%,
      rgba(255, 255, 255, 0.75) 100%
    );
    width: 50%;
    height: 100%;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const Meta = styled.div`
  position: relative;
  z-index: 1;
`;

export const Top = styled.div`
  display: flex;
  align-items: center;
`;

export const Bottom = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  color: #999;

  > *:not(:first-child) {
    margin-left: 10px;
    padding-left: 10px;
    border-left: 1px solid #ddd;
  }
`;

export const Title = styled.a`
  font-size: 13px;
  font-weight: 700;
  line-height: 1.2;
  max-width: 180px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Rating = styled.h3`
  font-size: 12px;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

export const Date = styled.h3`
  font-size: 12px;
  font-weight: 400;
  display: flex;
`;

export const Actions = styled.div`
  display: flex;
  visibility: hidden;
  opacity: 0;
  position: relative;
  z-index: 1;
  transition: 250ms;

  > *:not(:first-child) {
    margin-left: 5px;
  }

  li:hover > & {
    opacity: 1;
    visibility: visible;
  }
`;

export const Badge = styled.div`
  position: absolute;
  z-index: 1;
  transition: 250ms;
  pointer-events: none;
  right: 12px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 900;
  border: 1px solid;
  letter-spacing: 1px;
  padding: 3px 6px;
  border-radius: 3px;
  color: #999;

  li:hover > & {
    opacity: 0;
    visibility: hidden;
  }
`;

export const Action = styled.div`
  cursor: pointer;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: -15%;
  right: 0;
  width: 50%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 80%
  );
  z-index: 0;
  filter: grayscale(100%);
`;

export const CountryFlag = styled.div`
  filter: grayscale(100%);
  margin-left: 4px;
  font-size: 14px;
  height: 12px;
  opacity: 0.5;
`;
