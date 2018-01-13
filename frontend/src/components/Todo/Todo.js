import React, { Component } from 'react';
import axios from 'axios';

import Module, {
  Header,
  Item,
  List,
  Name,
  TextField,
  Title,
  Remove,
  Archive
} from '../../composers/Module';
import { ENDPOINT } from '../../constants';

const urlRegex = /[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

class Todo extends Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.onValueChange = this.onValueChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onValueChange(e) {
    this.setState({ value: e.target.value });
  }

  onKeyPress(e) {
    const value = this.state.value;
    if (e.key !== 'Enter') {
      return;
    }

    if (value.match(urlRegex)) {
      axios.post(`${ENDPOINT}/scrape`, { url: value }).then(res => {
        this.props.add(res.data);
        this.setState({ value: '' });
      });
    } else {
      this.props.add(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    const { value } = this.state;
    const { todos } = this.props;

    return (
      <Module>
        <Header>
          <Title>{this.props.title}</Title>
        </Header>
        <TextField
          type="text"
          value={value}
          onChange={this.onValueChange}
          onKeyPress={this.onKeyPress}
          placeholder="What needs to be done?"
        />
        <List>
          {todos &&
            Object.keys(todos).map(key => (
              <Item>
                <Archive onClick={() => this.props.archive(key)} />
                <Name href={todos[key].link}>{todos[key].title}</Name>
                <Remove onClick={() => this.props.remove(key)} />
              </Item>
            ))}
        </List>
      </Module>
    );
  }
}

export default Todo;
