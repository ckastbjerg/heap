import flow from 'lodash.flow';
import { connect as connectStore } from 'unistore/react';
import { connect as connectFirebase } from 'react-firebase';

import { signOut, addFriend } from '../../firebase';
import { viewAsFriend, toggleMenu } from '../../actions';

import Header from './Header';

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
  connectStore(['user', 'viewAsUid', 'isMenuOpen'], {
    onSignOut: signOut,
    onToggleMenu: toggleMenu,
    onViewFriendProfile: viewAsFriend,
    onAddFriend: addFriend
  })
)(Header);
