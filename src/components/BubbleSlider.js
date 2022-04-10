import React from 'react';
import './BubbleSlider.css'

class BubbleSlider extends React.Component {
  constructor(props) {
    super(props);
    this.decreaseBubble = this.decreaseBubble.bind(this);
    this.increaseBubble = this.increaseBubble.bind(this);
  }

  // no-op: to be extended by sub-class
  updateBubbleCallback() {}

  decreaseBubble(e) {
    // need prevent default so this doesn't trigger form submissions
    e.preventDefault();
    if (this.state.selectedIdx > 0) {
      this.setState((state) => {
        return {selectedIdx: state.selectedIdx - 1}
      }, this.updateBubbleCallback);
    }
  }

  increaseBubble(e) {
    // need prevent default so this doesn't trigger form submissions
    e.preventDefault();
    if (this.state.selectedIdx < this.state.bubbleCount - 1) {
      this.setState((state) => {
        return {selectedIdx: state.selectedIdx + 1}
      }, this.updateBubbleCallback);
    }
  }

  selectBubble(index) {
    this.setState((state) => {
      return {selectedIdx: index}
    }, this.updateBubbleCallback);
  }

  render() {
    const { bubbleCount, selectedIdx } = this.state;
    const bubbles = [];
    for (let i = 0; i < bubbleCount; i++) {
      const className = (i === selectedIdx) ? 'bubble-radio-button-fill' : 'bubble-radio-button';
      bubbles.push(
          <div className={className}
               onClick={()=>{this.selectBubble(i)}}
               key={`bubble-button-${i}`}
               alt='select' />)
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
