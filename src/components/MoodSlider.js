import React from 'react';
import './MoodSlider.css'

const labels = ['Very Low', 'Low', 'Somewhat Low', 'Neutral', 'Somewhat High', 'High', 'Very High'];

class MoodSlider extends React.Component {
  constructor(props) {
    super(props);
    const neutralIdx = Math.floor(labels.length / 2);
    this.state = {
      value: neutralIdx,
      mood: labels[neutralIdx]
    };
  }

  render() {
    const { value } = this.state;
    return (
      <div className='mood-slider'>
        <div className='mood-title'>Mood</div>
        <div className='mood-slider-container'>
          <input type='range' min='0' max={labels.length - 1} value={value} className='mood-slider-bar' id='myRange'  onChange={v => {
              const idx = v.target.value;
              this.setState({ value: idx, mood: labels[idx] });
            }}/>
        </div>
        <div className='mood-label'>{labels[value]}</div>
      </div>
    );
  }
}

export default MoodSlider;
