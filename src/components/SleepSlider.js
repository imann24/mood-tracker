import React from 'react';
import BubbleSlider from './BubbleSlider'
import './SleepSlider.css'
import './Main.css'

class SleepSlider extends BubbleSlider {
  constructor(props) {
    super(props);
    this.labelClasses = ['follow-left', 'follow-middle', 'follow-right'];
    this.labelValues = ['Poor', 'Neutral', 'Great'];
    this.state = {
      bubbleCount: 3,
      selectedIdx: 1,
      labelClass: this.labelClasses[1],
      labelVal: this.labelValues[1]
    };
  }

  updateBubbleCallback() {
    super.updateBubbleCallback();
    this.setState((state) => {
      return {
        labelClass: this.labelClasses[this.state.selectedIdx],
        labelVal: this.labelValues[this.state.selectedIdx],
      };
    })
  }

  render() {
    const bubbles = super.render();
    return (
      <div>
        <div className='sleep-slider'>
          <div><h1>Sleep</h1></div>
          <label className='side'>{this.labelValues[0]}</label>
          {bubbles}
          <label className='side'>{this.labelValues[2]}</label>
        </div>
        <div>
          <label id='follow-label' className={this.state.labelClass}>{this.state.labelVal}</label>
        </div>
      </div>
    )
  }
}

export default SleepSlider;
