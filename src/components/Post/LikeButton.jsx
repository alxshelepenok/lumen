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
    const liked = localStorage.getItem(window.location.pathname.split("/")[window.location.pathname.split("/").length-1]) === 'true';
    this.setState({ liked });
    this.updateCount("none");
  }

  handleButtonClick = () => {
    if (this.state.liked) {
      // If already liked, unlike
      this.setState({ liked: !this.state.liked });
      this.updateCount("decrement");
      localStorage.setItem(window.location.pathname.split("/")[window.location.pathname.split("/").length-1], 'false');
    } else {
      // If not liked, like
      this.setState({ liked: !this.state.liked });
      this.updateCount("increment");
      localStorage.setItem(window.location.pathname.split("/")[window.location.pathname.split("/").length-1], 'true');
    }
  };

  updateCount(change) {
    // Make an XHR request to the CountAPI to increment or decrement the count
    const url = `https://script.google.com/macros/s/AKfycbysSMMR75dSSryX9nW2VFvXYnd09JEC6vuEt-uTQXVcqWGOy0AwmSECEawVOpLQdTqkfw/exec?POST_NAME=${window.location.pathname.split("/")[window.location.pathname.split("/").length-1]}&ACTION=${change}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    if (change === "increment") {
      this.setState({ count: this.state.count + 1 });
      return;
    } else if (change === "decrement") {
      this.setState({ count: this.state.count - 1 });
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
    const svgNotPressed = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'1em\' viewBox=\'-24 -24 560 560\'%3E ...'; // Add the SVG data for not pressed state
    const svgPressed = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' height=\'1em\' viewBox=\'-24 -24 560 560\'%3E ...'; // Add the SVG data for pressed state

    const svgData = this.state.liked ? svgPressed : svgNotPressed;

    return (
      <div>
        <svg onClick={this.handleButtonClick} style={{ width: '40px', height: '40px' }} xmlns="http://www.w3.org/2000/svg" viewBox="-24 -24 560 560" dangerouslySetInnerHTML={{ __html: svgData }}></svg>
        <span>{this.state.count > 0 ? this.state.count : ""}</span>
      </div>
    );
  }
}
