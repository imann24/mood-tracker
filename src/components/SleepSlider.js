import React from 'react';
import BubbleSlider from './BubbleSlider'

class SleepSlider extends BubbleSlider {
  constructor(props) {
    super(props);
    this.state = {
      bubbleCount: 3,
      selectedIdx: 1
    };
  }

  render() {
    const bubbles = super.render();
    return (
      <div className='sleep-slider'>
        <label>Poor</label>
        {bubbles}
        <label>Great</label>
      </div>
    )
  }
}

export default SleepSlider;
