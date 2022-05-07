import React from 'react';
import './ProgressBar.css';

type ProgressBarProps = {
  isActive: boolean;
};
type ProgressBarState = {
  percent: number;
  show: boolean;
  canSuccess: boolean;
  duration: number;
  height: string;
  color: string;
  failedColor: string;
  timer: ReturnType<typeof setTimeout> | null;
  cut: number;
};
type ProgressBarStyles = {
  width: string;
  height: string;
  backgroundColor: string;
  opacity: number;
};

class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {
  constructor(props: ProgressBarProps) {
    super(props);
    this.state = {
      percent: 0,
      show: false,
      canSuccess: true,
      duration: 3000,
      height: '2px',
      color: '#ffca2b',
      failedColor: '#ff0000',
      timer: null,
      cut: 0,
    };

    this.start = this.start.bind(this);
    this.finish = this.finish.bind(this);
  }

  shouldComponentUpdate({ isActive }: ProgressBarProps) {
    const { isActive: propsIsActive } = this.props;
    if (isActive === propsIsActive) return false;

    if (isActive) {
      this.start();
    } else {
      this.finish();
    }
    return false;
  }

  public start() {
    const {
      timer, duration, cut, percent,
    } = this.state;
    this.setState({ show: true, canSuccess: true });
    if (timer) {
      clearInterval(timer);
      this.setState({ percent: 0 });
    }
    const newCut = 10000 / Math.floor(duration);
    const newTimer = setInterval(() => {
      this.increase(cut * Math.random());
      if (percent > 95) {
        this.finish();
      }
    }, 100);

    this.setState({ cut: newCut, timer: newTimer });
  }

  public finish() {
    this.setState({ percent: 100 });
    this.hide();
  }

  private increase(num: number) {
    const { percent } = this.state;
    const newPercent = percent + Math.floor(num);
    this.setState({ percent: newPercent });
  }

  private hide() {
    const { timer } = this.state;
    if (timer) {
      clearInterval(timer);
    }
    this.setState({ timer: null });
    setTimeout(() => {
      this.setState({ show: false });
      setTimeout(() => {
        this.setState({ percent: 0 });
      }, 200);
    }, 500);
  }

  render() {
    const {
      percent, height, canSuccess, color, failedColor, show,
    } = this.state;
    const styles: ProgressBarStyles = {
      width: `${percent}%`,
      height,
      backgroundColor: canSuccess ? color : failedColor,
      opacity: show ? 1 : 0,
    };

    return <div className="progress" style={styles} />;
  }
}

export default ProgressBar;
