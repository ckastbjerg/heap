import React, { Component } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import { LogOut, XCircle } from 'react-feather';

import { baseSize, headerHeight } from '../../tokens';
import FriendSearchField from './FriendSearchField';
import Friend from './Friend';
import Settings from './Settings';

const Wrapper = styled.ul`
  background: rgba(255, 255, 255, 0.25);
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Header = styled.li`
  align-items: center;
  display: flex;
  font-size: 14px;
  height: 40px;
  justify-content: space-between;
  padding: 10px;
  color: rgba(5, 102, 141, 1);
`;
const Footer = styled.li`
  align-items: center;
  display: flex;
  font-size: 13px;
  height: 40px;
  justify-content: space-between;
  margin-top: auto;
  padding: 10px;
  border-top: 1px solid rgba(0, 0, 0, 0.075);
`;
const Separator = styled.div`
  padding: 5px 10px;
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.075);
`;
const ClearIcon = styled(XCircle)`
  cursor: pointer;
`;

const Menu = props => {
  const {
    friends = {},
    onSignOut,
    user,
    friendsPending = {},
    viewAsUid,
    onViewFriendProfile
  } = props;
  const array = Object.keys(friendsPending).map(uid => ({
    ...friendsPending[uid],
    uid
  }));
  const invites = array.filter(item => item.inviteSentBy === user.uid);
  const requests = array.filter(item => item.inviteSentBy !== user.uid);
  const friendsArray = Object.keys(friends).map(uid => ({
    uid,
    ...friends[uid]
  }));

  return (
    <Wrapper>
      {viewAsUid && (
        <Header>
          Viewing as {friends[viewAsUid].displayName}{' '}
          <ClearIcon size={16} onClick={() => onViewFriendProfile(null)} />
        </Header>
      )}
      {viewAsUid && (
        <div>
          <Separator>View settings</Separator>
          <Settings />
        </div>
      )}
      {requests.length > 0 && <Separator>Friend requests</Separator>}
      {requests.map(friend => (
        <Friend key={friend.uid} isRequest {...friend} {...props} />
      ))}
      {invites.length > 0 && <Separator>Your invites</Separator>}
      {invites.map(friend => (
        <Friend key={friend.uid} isInvite {...friend} {...props} />
      ))}
      <Separator>Friends</Separator>
      <FriendSearchField {...props} user={user} />
      {friendsArray.map(friend => (
        <Friend key={friend.uid} {...friend} {...props} />
      ))}
      <Footer>
        Logged in as {user.displayName} <LogOut size={16} onClick={onSignOut} />
      </Footer>
    </Wrapper>
  );
};

export default Menu;
