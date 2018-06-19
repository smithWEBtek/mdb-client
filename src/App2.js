import React, { Component } from 'react'
import MainNav from './UI/MainNav/MainNav'
import 'bootstrap/dist/css/bootstrap.css'
import { Route } from 'react-router-dom'
import Aux from '../src/hoc/Aux/Aux'
import { connect } from 'react-redux'
import * as actions from '../src/store/actions/index'

import Tunes from '../src/Tunes/Tunes'
import Teachers from '../src/Teachers/Teachers'
import Lessons from '../src/Lessons/Lessons'
import Resources from '../src/Resources/Resources'
import LessonResources from '../src/Lessons/LessonResources/LessonResources'

class App extends Component {

	componentDidMount() {
		this.props.onFetchTunes()
		this.props.onFetchTeachers()
		this.props.onFetchResources()
		this.props.onFetchLessons()
	}

	render() {
		return (
			<div>
				<MainNav />
				<Aux>
					<Route path="/tunes" component={Tunes} />
					<Route path="/teachers" component={Teachers} />
					<Route path="/lessons/" component={Lessons} />
					<Route path="/resources" component={Resources} />
					<Route path="/lesson_resources" component={LessonResources} />
				</Aux>
			</div>)
	}
}

const mapStateToProps = state => {
	return {
		tunes: state.stu.tunes,
		teachers: state.tch.teachers,
		resources: state.res.resources,
		lessons: state.les.lessons
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchTunes: () => dispatch(actions.fetchTunes()),
		onFetchTeachers: () => dispatch(actions.fetchTeachers()),
		onFetchResources: () => dispatch(actions.fetchResources()),
		onFetchLessons: () => dispatch(actions.fetchLessons())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

