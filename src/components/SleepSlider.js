import BubbleSlider from './BubbleSlider'

class SleepSlider extends BubbleSlider {
  constructor(props) {
    super(props);
    this.state = {
      bubbleCount: 3,
      selectedIdx: 1
    };
  }
}

export default SleepSlider;
