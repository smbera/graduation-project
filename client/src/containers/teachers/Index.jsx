import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class TeachersIndex extends Component {

  	render() {
    	return (
            <div>teacher</div>
	    )
	}
}

TeachersIndex.propTypes = { 
    languageType: PropTypes.string,
} 

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TeachersIndex)
