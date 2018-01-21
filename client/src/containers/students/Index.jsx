import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

class StudentsIndex extends Component {

  	render() {
    	return (
            <div>student</div>
	    )
	}
}

StudentsIndex.propTypes = { 
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
)(StudentsIndex)
