import React, { Component } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { TextField, List, Item, Name, Cover } from '../composers/Module';
import { ENDPOINT } from '../constants';

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  top: 0;
  box-shadow: 0 0 10px #999;
  z-index: 2;
`;

class Search extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      items: [],
      value: ''
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
  }

  onValueChange(e) {
    this.setState({ value: e.target.value, items: [] });
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      this.setState({ isLoading: true });
      axios(`${ENDPOINT}/${this.props.media}/find/${this.state.value}`).then(
        res => {
          this.setState({ items: res.data, isLoading: false });
        }
      );
    }
  }

  onAddItem(id, name) {
    const items = [{ id, name }];
    axios.post(`${ENDPOINT}/${this.props.media}`, { items }).then(res => {
      this.props.add(res.data[0]);
      this.setState({ value: '', items: [] });
    });
  }

  render() {
    const { value, items } = this.state;

    return (
      <div>
        <TextField
          type="text"
          value={value}
          onChange={this.onValueChange}
          onKeyPress={this.onKeyPress}
          placeholder={`Add ${this.props.media}...`}
        />
        <div style={{ position: 'relative' }}>
          <Overlay>
            <List>
              {items.map(item => (
                <Item key={item.id}>
                  <Cover src={item.coverSrc} />
                  <Name onClick={() => this.onAddItem(item.id, item.name)}>
                    {item.name} {item.hint ? `(${item.hint})` : ''}
                  </Name>
                </Item>
              ))}
            </List>
          </Overlay>
        </div>
      </div>
    );
  }
}

export default Search;
