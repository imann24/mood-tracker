import React from 'react';
import './MoodSlider.css'

class MoodSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  render() {
    const { value } = this.state;
    const labels = ['Extreme Low', 'Mid Low', 'Low', 'Neutral', 'High', 'Mid High', 'Extreme High'];
    return (
      <div className='mood-slider'>
        <div className='mood-title'>Mood</div>
        <div className='mood-slider-container'>
          <input type='range' min='0' max={labels.length - 1} value={value} className='mood-slider-bar' id='myRange'  onChange={v => {
              console.log(v.target.value)
              this.setState({ value: v.target.value });
              }}/>
        </div>
        <div className='mood-label'>{labels[value]}</div>
      </div>
    );
  }
}

export default MoodSlider;
