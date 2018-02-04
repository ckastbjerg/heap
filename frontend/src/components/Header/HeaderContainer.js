import flow from 'lodash.flow';
import { connect as connectStore } from 'unistore/react';
import { connect as connectFirebase } from 'react-firebase';

import { signOut } from '../../firebase';
import { viewAsFriend } from '../../actions';

import Header from './Header';

const mapFirebaseToProps = ({ user, filter }, ref) => ({
  users: 'users'
});

export default flow(
  connectFirebase(mapFirebaseToProps),
  connectStore('user', { onSignOut: signOut, onViewAsFriend: viewAsFriend })
)(Header);
