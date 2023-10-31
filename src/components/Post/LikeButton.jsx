import React, { Component } from 'react';

export class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false, // Initially not liked
      count: 0,
    };
  }

  componentDidMount() {
    // Check local storage to see if the user has liked this post before
    const liked = localStorage.getItem(window.location.pathname.split("/")[window.location.pathname.split("/").length-1]) === 'true';
    this.setState({ liked });
    this.fetchCount()
  }

  handleButtonClick = () => {
    if (this.state.liked) {
      // If already liked, unlike
      this.updateCount(-1);
      localStorage.setItem(window.location.pathname.split("/")[window.location.pathname.split("/").length-1], 'false');
    } else {
      // If not liked, like
      this.updateCount(1);
      localStorage.setItem(window.location.pathname.split("/")[window.location.pathname.split("/").length-1], 'true');
    }
    this.setState({ liked: !this.state.liked });
  };

  updateCount(change) {
    // Make an XHR request to the CountAPI to increment or decrement the count
    const url = `https://api.countapi.xyz/update/unaligned.world/${window.location.pathname.split("/")[window.location.pathname.split("/").length-1]}?amount=${change}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        this.setState({ count: response.value });
      }
    };
  }

  fetchCount() {
    const url = `https://api.countapi.xyz/get/unaligned.world/${window.location.pathname.split("/")[window.location.pathname.split("/").length-1]}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        this.setState({ count: response.value });
      }
    };
  }

  render() {
    const buttonStyle = {
      width: '40px',
      height: '40px',
      backgroundColor: this.state.liked ? 'blue' : 'white',
    };

    return (
      <div>
        <button onClick={this.handleButtonClick} style={buttonStyle}></button>
        <span>{this.state.count}</span>
      </div>
    );
  }
}
