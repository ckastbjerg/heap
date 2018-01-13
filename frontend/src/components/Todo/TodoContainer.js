import { connect } from 'react-firebase';

import Todo from './Todo';

const mapFirebaseToProps = (props, ref) => ({
  todos: {
    path: props.path,
    orderByChild: 'archived',
    equalTo: null
  },
  add: value => {
    if (typeof value === 'string') {
      ref(props.path).push({ title: value });
    } else {
      ref(props.path).push(value);
    }
  },
  remove: id => ref(`${props.path}/${id}`).remove(),
  archive: id => ref(`${props.path}/${id}/archived`).set(true)
});

export default connect(mapFirebaseToProps)(Todo);
