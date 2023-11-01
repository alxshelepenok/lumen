import React, { Component } from 'react';

export class LikeButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false, // Initially not liked
      count: 0
    };
  }

  componentDidMount() {
    // Check local storage to see if the user has liked this post before
    const liked =
      localStorage.getItem(
        window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]
      ) === 'true';
    this.setState({ liked });
    this.updateCount('none');
  }

  handleButtonClick = () => {
    if (this.state.liked) {
      // If already liked, unlike
      this.setState({ liked: !this.state.liked });
      this.updateCount('decrement');
      localStorage.setItem(
        window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
        'false'
      );
    } else {
      // If not liked, like
      this.setState({ liked: !this.state.liked });
      this.updateCount('increment');
      localStorage.setItem(
        window.location.pathname.split('/')[window.location.pathname.split('/').length - 1],
        'true'
      );
    }
  };

  updateCount(change) {
    // Make an XHR request to the CountAPI to increment or decrement the count
    const url = `https://script.google.com/macros/s/AKfycbysSMMR75dSSryX9nW2VFvXYnd09JEC6vuEt-uTQXVcqWGOy0AwmSECEawVOpLQdTqkfw/exec?POST_NAME=${window.location.pathname.split("/")[window.location.pathname.split("/").length-1]}&ACTION=${change}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    if (change === 'increment') {
      this.setState({ count: this.state.count + 1 });
      return;
    } else if (change === 'decrement') {
      this.setState({ count: this.state.count + -1 });
      return;
    }
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        this.setState({ count: parseInt(response) + this.state.count });
      }
    };
  }

  render() {
    const svgNotPressed = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='19px'
        viewBox='-24 -24 560 560'
      >
        <path
          d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5'
          fill='#ffffff'
          stroke='#FF3399'
          stroke-width='40'
        />
      </svg>
    );

    const svgPressed = (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        height='19px'
        viewBox='-24 -24 560 560'
      >
        <path
          d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5'
          fill='#FF99CC'
          stroke='#FF3399'
          stroke-width='40'
        />
      </svg>
    );

    return (
      <div>
        <div onClick={this.handleButtonClick} style={{alignItems: "center", display: "flex", paddingLeft: 11}}>
          {this.state.liked ? svgPressed : svgNotPressed}
          <span style={{paddingLeft: 3}}>{this.state.count > 0 ? this.state.count : ''}</span>
        </div>
      </div>
    );
  }
}
