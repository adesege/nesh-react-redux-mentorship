import React, { Component } from 'react';

import { connect } from 'react-redux';

import logo from './logo.svg';
import './App.css';

const setCounter = (type) => ({
    type,
  })

const setPosts = (posts) => ({
  type: 'SET_POSTS',
  posts
})

const getPosts = () => (dispatch) => {
  return fetch('https://jsonplaceholder.typicode.com/posts?userId=2')
    .then((response) => response.json())
    .then((response) => dispatch(setPosts(response)))
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    }
  }

  handleIncrement = () => {
    this.props.setCounter('INCREMENT');
  }

  handleDecrement = () => {
    this.props.setCounter('DECREMENT');
  }

  handlePosts = () => {
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <button onClick={this.handlePosts}>Get Posts</button>
        <button onClick={this.handleIncrement}>Increment</button>
        <button onClick={this.handleDecrement}>Decrement</button>
        <p>{this.props.counter}</p>

        <table>
          <thead>
            <tr>
              <td>Title</td>
              <td>Body</td>
            </tr>
          </thead>
          <tbody>
            {this.props.posts.map(post => (
              <tr key={Math.random()*100}>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
  posts: state.posts,
});


export default connect(mapStateToProps, { setCounter, getPosts })(App);
