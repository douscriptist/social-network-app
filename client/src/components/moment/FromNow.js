import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class Moment extends Component {
  static propTypes = {
    children: PropTypes.func,
    date: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    format: PropTypes.string,
    liveUpdate: PropTypes.bool.isRequired,
    liveUpdateInterval: PropTypes.number,
  };

  static defaultProps = {
    format: 'MMMM Do YYYY, h:mm a',
    liveUpdate: false,
  };

  componentDidMount() {
    const { liveUpdate, liveUpdateInterval } = this.props;

    if (liveUpdate || liveUpdateInterval) {
      const interval = liveUpdateInterval || 10000;
      this.interval = setInterval(() => this.forceUpdate(), interval);
    }
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { date, children, format, ...rest } = this.props;

    return (
      <div {...rest}>
        {children ?
            children(moment(date))
          :
            moment(date).format(format)
        }
      </div>
    );
  }
}