import React, { Component } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';

import { baseSize } from '../../tokens';

const Wrapper = styled.div`
  position: relative;
`;

const Textfield = styled.input`
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.075);
  background: none;
  padding: 0 10px;
  height: 40px;
  font-family: 'Open Sans', sans-serif;
  width: 100%;
  font-size: 14px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.075);
`;

const Options = styled.ul`
  position: absolute;
  top: 100%;
  background: white;
  box-shadow: 0px 5px 5px #ddd;
  width: 100%;
`;

const Option = styled.li`
  font-size: 14px;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
  width: 100%;
`;

const initialState = {
  searchValue: '',
  searchResults: []
};

class FriendSearchField extends Component {
  constructor() {
    super();
    this.state = initialState;
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onAddFriend = this.onAddFriend.bind(this);
  }

  onChange(e) {
    const users = Object.keys(this.props.users).map(key => ({
      ...this.props.users[key],
      uid: key
    }));
    const options = { keys: ['displayName'] };
    const fuse = new Fuse(users, options);
    const results = fuse.search(e.target.value);
    this.setState({
      searchValue: e.target.value,
      searchResults: results.filter(user => user.uid !== this.props.user.uid)
    });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({ searchValue: '' });
    }
  }

  onAddFriend(result) {
    this.setState(initialState);
    this.props.onAddFriend(result);
  }

  render() {
    const { searchValue, searchResults } = this.state;
    const { onAddFriend } = this.props;

    return (
      <Wrapper>
        <Textfield
          type="text"
          value={searchValue}
          placeholder="Add friend..."
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
        />
        <Options>
          {searchResults.map(result => (
            <Option onClick={() => this.onAddFriend(result)}>
              {result.displayName}
            </Option>
          ))}
        </Options>
      </Wrapper>
    );
  }
}

export default FriendSearchField;
