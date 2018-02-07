import React, { Component } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import FriendSearchField from './FriendSearchField';
import { Check, MinusCircle } from 'react-feather';

import { baseSize, headerHeight } from '../../tokens';

const FriendWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  padding: 10px;
`;

const NameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.div`
  font-weight: bold;
  font-size: 14px;
  cursor: pointer;

  span {
    font-weight: normal;
  }
`;

const Actions = styled.div`
  margin-left: auto;

  svg {
    cursor: pointer;
  }
`;

const Friend = ({
  displayName,
  isInvite,
  isRequest,
  onAcceptFriendRequest,
  onDeclineFriendRequest,
  onViewFriendProfile,
  uid
}) => (
  <FriendWrapper>
    <NameWrapper>
      <Name onClick={() => onViewFriendProfile(uid)}>{displayName}</Name>
    </NameWrapper>
    <Actions>
      {isRequest && (
        <Check size="16" onClick={() => onAcceptFriendRequest(uid)} />
      )}
      <MinusCircle size="16" onClick={() => onDeclineFriendRequest(uid)} />
    </Actions>
  </FriendWrapper>
);

export default Friend;
