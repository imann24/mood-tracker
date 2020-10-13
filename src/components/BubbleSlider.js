import React from 'react';
import './BubbleSlider.css'

class BubbleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.decreaseBubble = this.decreaseBubble.bind(this);
    this.increaseBubble = this.increaseBubble.bind(this);
  }

  decreaseBubble() {
    if (this.state.selectedIdx > 0) {
      this.setState((state) => {
        return {selectedIdx: state.selectedIdx - 1}
      });
    }
  }

  increaseBubble() {
    if (this.state.selectedIdx < this.state.bubbleCount - 1) {
      this.setState((state) => {
        return {selectedIdx: state.selectedIdx + 1}
      });
    }
  }

  render() {
    const { bubbleCount, selectedIdx } = this.state;
    const bubbles = [];
    for (let i = 0; i < bubbleCount; i++) {
      const className = (i === selectedIdx) ? 'bubble-radio-button-fill' : 'bubble-radio-button';
      bubbles.push(<div className={className} key={`bubble-button-${i}`} />)
    }

    return (
      <div className='bubble-slider'>
        <button className='decrease-bubble-button'
                onClick={this.decreaseBubble}
                alt='decrease' />
        <div className='bubbles'>
          { bubbles.map(bubble => bubble) }
        </div>
        <button className='increase-bubble-button'
                onClick={this.increaseBubble}
                alt='increase' />
      </div>
    )
  }
}

export default BubbleSlider;
