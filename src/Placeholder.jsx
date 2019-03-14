import React, {Component} from 'react';
import Icebreaker from './Icebreaker.jsx';

class Placeholder extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className="placeholder-spacer"></div>
        <div className="placeholder">
          <h1>{`Good ${this.props.time} to you, ${this.props.currentUser}! Looks like no one has written anything. Here's a conversation starter:`}<Icebreaker /></h1>
        </div>
      </div>
    );
  }
}
export default Placeholder;