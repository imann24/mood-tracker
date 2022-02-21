import React from 'react';
import BubbleSlider from './BubbleSlider'
import './SleepSlider.css'
import './Main.css'

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
        <div><h1>Sleep</h1></div>
        <label>Poor</label>
        {bubbles}
        <label>Great</label>
      </div>
    )
  }
}

export default SleepSlider;
