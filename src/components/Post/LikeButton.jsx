import React, { Component } from 'react';

// Define a function for JSONP requests
function jsonPRequest(url, callbackName) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = true;

    // Define a global callback function to handle the JSONP response
    window[callbackName] = (response) => {
      resolve(response);
      // Clean up by removing the script tag and global callback function
      document.body.removeChild(script);
      delete window[callbackName];
    };

    script.onerror = (error) => {
      reject(error);
      // Clean up by removing the script tag and global callback function
      document.body.removeChild(script);
      delete window[callbackName];
    };

    document.body.appendChild(script);
  });
}

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
    this.fetchCount();
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
    const apiUrl = `https://api.countapi.xyz/update/unaligned.world/${window.location.pathname.split("/")[window.location.pathname.split("/").length-1]}?amount=${change}`;
    jsonPRequest(apiUrl, 'updateCountCallback').then(response => {
      // Update the count in the component state
      this.setState({ count: this.state.count + change });
    });
  }

  fetchCount() {
    const apiUrl = `https://api.countapi.xyz/get/unaligned.world/${window.location.pathname.split("/")[window.location.pathname.split("/").length-1]}`;
    jsonPRequest(apiUrl, 'fetchCountCallback').then(response => {
      // Update the count in the component state
      this.setState({ count: response.value });
    });
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

export default LikeButton;
