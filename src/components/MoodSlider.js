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
    const labels = ['ExtremeLow', 'Mid Low', 'Low', 'Neutral', 'High', 'Mid High', 'Extreme High'];

    return (
      <div class='mood-slider'>
        <div className="mood-segment" id="down-high">

        </div>
        <div className="mood-segment" id="down-mid">

        </div>
        <div className="mood-segment" id="down-low">

        </div>
        <div className="mood-segment" id="neutral">

        </div>
        <div className="mood-segment" id="up-low">

        </div>
        <div className="mood-segment" id="up-mid">

        </div>
        <div className="mood-segment"id="up-high">

        </div>
      </div>
    );
  }
}

export default MoodSlider;
