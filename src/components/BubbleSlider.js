import React from 'react';
import * as _ from 'lodash';
import './BubbleSlider.css'

class BubbleSlider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bubbleCount: props.bubbleCount
    };
  }

  render() {
    const { bubbleCount } = this.state
    return (
      <div className='bubble-slider'>
        <div className='decrease-bubble-button'></div>
        {
          _.times(bubbleCount, () => {
            return (
              <div className='bubble-radio-button'>
              </div>
            )
          })
        }
        <div className='increase-bubble-button'></div>
      </div>
    )
  }
}

export default BubbleSlider;
