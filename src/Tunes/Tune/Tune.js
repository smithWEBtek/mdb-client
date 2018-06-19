import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import '../../App.css'
import ResourcesList from '../../Resources/ResourcesList/ResourcesList'
import LessonsList from '../../Lessons/LessonsList/LessonsList'
import EditTune from '../EditTune/EditTune'

const Tune = (props) => {
	const tune = props.tunes.find(tune => tune.id === +props.match.params.id)
	let tuneHeader = <div><p>Tune component is loading...</p></div>
	let tuneLessons = <div><h5>No lessons recorded</h5></div>
	let tuneResources = <div><h5>No resources assigned</h5></div>

	if (tune) {
		tuneHeader = (
			<div>
				<h5 className="TuneHeaderBackground"><strong>{tune.firstname} {tune.lastname}</strong></h5>
				<p>Level: <strong>{tune.level}</strong></p>
				<p><Link to={`/teachers/${tune.teacher.id}`}>Teacher: <strong>{tune.teacher.lastname}</strong></Link></p>
				<p>Last lesson date: <strong>{tune.lessons.length !== 0 ? tune.lessons[tune.lessons.length - 1].date : 'no lessons on record for this tune'}</strong></p>
				<p className={tune.active.toString()}>Active: {tune.active.toString()}</p>
				<Link
					to={`/tunes/${tune.id}/edit`}
					component={<EditTune />}>EditTune</Link>
			</div>
		)
	}

	if (tune && tune.lessons) {
		tuneLessons = (
			<div>
				<hr />
				<h6 className="LessonHeaderBackground"><strong>{tune.firstname}'s LESSONS</strong></h6>
				<div><LessonsList lessons={tune.lessons} /></div>
			</div>
		)
	}

	if (tune && tune.resources) {
		tuneResources = (
			<div>
				<hr />
				<h6 className="ResourceHeaderBackground"><strong>{tune.firstname}'s assigned RESOURCES</strong> </h6>
				<div><ResourcesList resources={tune.resources} /></div>
			</div >
		)
	}

	return (
		<div>
			<div>
				{tuneHeader}
			</div>
			<div>
				{tuneLessons}
			</div>
			<div>
				{tuneResources}
			</div>
		</div >
	)
}

const mapStateToProps = state => {
	return {
		tunes: state.stu.tunes
	}
}

export default connect(mapStateToProps)(Tune)
