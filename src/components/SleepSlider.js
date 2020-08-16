import BubbleSlider from './BubbleSlider'

class SleepSlider extends BubbleSlider {
  constructor(props) {
    super(Object.assign({}, props, {
      bubbleCount: 3
    }));
  }
}

export default SleepSlider;
