import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import Login from './Login'
import StudentsIndex from './students/Index'
import TeachersIndex from './teachers/Index'

class Index extends Component {
  	render() {
        if(this.props.isLogined === false) {
           return <Login />
        } else if(this.props.isLogined === true && this.props.identity === '1') {
           return <StudentsIndex />
        } else if(this.props.isLogined === true && this.props.identity === '2') {
           return <TeachersIndex />
        }
	}
}

Index.propTypes = { 
    isLogined: PropTypes.bool,
    identity: PropTypes.string,
} 

const mapStateToProps = (state) => {
    return {
        isLogined: state.isLogined,
        identity: state.identity,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)
