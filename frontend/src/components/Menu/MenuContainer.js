import flow from 'lodash.flow';
import { connect as connectStore } from 'unistore/react';
import { connect as connectFirebase } from 'react-firebase';

import {
  signOut,
  addFriend,
  acceptFriendRequest,
  declineFriendRequest
} from '../../firebase';
import { viewAsFriend, viewFriendShared } from '../../actions';

import Menu from './Menu';

const mapFirebaseToProps = ({ user, filter }, ref) => ({
  users: 'users',
  friends: {
    path: `users/${user.uid}/friends`,
    orderByChild: 'confirmed',
    equalTo: true
  },
  friendsPending: {
    path: `users/${user.uid}/friends`,
    orderByChild: 'confirmed',
    equalTo: false
  }
});

export default flow(
  connectFirebase(mapFirebaseToProps),
  connectStore(['user', 'viewAsUid'], {
    onAcceptFriendRequest: acceptFriendRequest,
    onAddFriend: addFriend,
    onDeclineFriendRequest: declineFriendRequest,
    onSignOut: signOut,
    onViewFriendProfile: viewAsFriend
  })
)(Menu);
