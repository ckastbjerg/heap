import styled from 'styled-components';
import media from 'styled-media-query';

import { baseSize, borderColor } from '../tokens';

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: scroll;

  ${media.lessThan('medium')`
    height: calc(100% - 54px);
  `};
`;

export const Row = styled.div`
  height: 100%;

  ${media.greaterThan('medium')`
    flex: 1;
    display: flex;
  `} &:not(:last-child) {
    margin-bottom: ${baseSize}px;
  }
`;

export const Col = styled.div`
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  height: 100%;

  ${media.lessThan('medium')`
    display: ${props => (props.isVisible ? 'flex' : 'none')};
  `} &:not(:last-child) {
    ${media.greaterThan('medium')`
      margin-right: ${baseSize}px;
    `};
  }
`;

export default Grid;
