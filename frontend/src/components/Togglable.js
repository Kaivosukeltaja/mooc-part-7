import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  button: {
    backgroundColor: '#ffffff',
    color: '#333333',
    padding: '1em',
    borderWidth: 0,
    borderRadius: '4px',
    boxShadow: '2px 2px 2px rgba(0,0,0,.125)',
    margin: '0.5em 0',
  }
}

class Togglable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }

  toggleVisibility = () => {
    this.setState({visible: !this.state.visible})
  }

  render() {
    const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = { display: this.state.visible ? '' : 'none' }

    return (
      <div className={this.props.className}>
        <div style={hideWhenVisible}>
          <button style={styles.button} onClick={this.toggleVisibility}>{this.props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {this.props.children}
          <button onClick={this.toggleVisibility}>cancel</button>
        </div>
      </div>
    )
  }
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
}

export default Togglable
