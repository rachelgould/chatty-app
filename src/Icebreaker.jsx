import React, {Component} from 'react';

class Icebreaker extends Component {
  render() {
    const iceBreakers = [
      'Who\'s the worst character on Game of Thrones?',
      'Tell the group about a time when you were truly afraid...',
      'What\'s your fave chat app? Hint: There\'s only one right answer!',
      'What\'s the BEST thing about you?',
      'Who do you secretly wish you could be?',
      'What\'s your favorite color?',
      'If you found $500, what would you spend it on?',
      'What\'s the most underrated show on TV?',
      'If you were to gain one superpower, what would you want it to be?',
      'What song do you sing in the shower?'
    ]
    let chosenIceBreaker = iceBreakers[(Math.floor(Math.random() * 10))];
    return (
      <p>{chosenIceBreaker}</p>
    );
  }
}
export default Icebreaker;