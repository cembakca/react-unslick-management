import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';

// find better class name :D
class UnslickManagement extends React.Component {
  constructor() {
    super();
    this.state = {
      slideVersion: false
    }
  }

  componentDidMount() {
    this.breakpointChecker();
  }
  
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
  componentWillReceiveProps(nextProps) {
    if(this.props.matchMediaOption !== nextProps.matchMediaOption) {
      this.breakpointChecker();
    }
  }

  breakpointChecker = () => {
    // to: https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia
    //Polyfills for old IE support  
    // matchMedia support from media-match (https://github.com/weblinc/media-match)
    const breakpoint = window.matchMedia(this.props.matchMediaOption);
    if (breakpoint.matches) {
	    this.setState({ slideVersion: false });
    } else {
      this.setState({ slideVersion: true });
    }
  }

  renderSlideVersion = () => {
    return (
      <Slider
        {...this.props.settings}
        className={this.props.className}
        ref={(slider) => {
          this.props.sliderRef(slider);
          this.$sliderRef = slider
        }}
      >
         {this.props.children}
      </Slider>
    );
  }

  renderNormalVersion = () => (
    <div className={this.props.className}>
      {this.props.children}
    </div>
  );
  
  render() {
    return this.state.slideVersion ? this.renderSlideVersion() : this.renderNormalVersion();
  }
}

UnslickManagement.propTypes = {
  className: PropTypes.string,
  matchMediaOption: PropTypes.string,
  children: PropTypes.any.isRequired,
  sliderRef: PropTypes.func
};

UnslickManagement.defaultProps = {
  className: '',
  matchMediaOption: '(min-width: 770px)',
  sliderRef() {}
};

export default UnslickManagement;
