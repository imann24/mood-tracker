import React from 'react';
import { Slider } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css'

class MoodSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }
  render() {
    const labels = ['Extreme Low', 'Mid Low', 'Low', 'Neutral', 'High', 'Mid High', 'Extreme High'];
    const { value } = this.state;
    const handleStyle = {
      color: '#3498ff',
      backgroundColor: "#f2f2f5",
      fontSize: 12,
      width: 64,
      height: 32,
      zIndex: 100
    };

    return (
      <div >
        <div style={{ width: 400, marginLeft: 20 }}>
          <Slider
            min={0}
            max={labels.length - 1}
            value={value}
            className='mood-slider'
            handleStyle={handleStyle}
            graduated
            tooltip={false}
            handleTitle={labels[value]}
            onChange={v => {
              this.setState({ value: v });
            }}
          />
        </div>
      </div>
    );
  }
}

export default MoodSlider;
