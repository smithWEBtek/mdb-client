import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../store/actions/index'

import { Container } from 'reactstrap'
import Modal from '../UI/Modal/Modal'

import Tune from './Tune/Tune'
import CreateTune from './CreateTune/CreateTune'
import EditTune from './EditTune/EditTune'
import TunesList from './TunesList/TunesList'

class Tunes extends Component {
	state = {
		tune: null,
		createTune: false,
		editTune: false,
		rerender: false
	}

	componentDidMount() {
		this.props.onFetchTunes()
	}

	//********SHOW_STUDENT handling*****************
	showTuneClose = () => {
		this.setState({ showTune: false })
	}

	//********CREATE_STUDENT form handling ***************
	createTuneForm = () => {
		this.setState({ createTune: true })
	}

	createTuneFormCancel = () => {
		this.setState({ createTune: false })
	}

	createTune = (newTuneData) => {
		const { history } = this.props
		this.props.onCreateTune(newTuneData, history)
		this.setState({ createTune: false })
	}

	//********EDIT_STUDENT handling****************
	showEditTuneForm = (id) => {
		let tune = this.props.tunes.find(tune => tune.id === id)
		let copyOfTune = { ...tune }
		this.setState({
			tune: copyOfTune,
			editTune: true
		})
	}

	editTuneUpdate = (data) => {
		let { history } = this.props
		this.props.onUpdateTune(data, history)
		this.setState({
			editTune: false,
			tune: null
		})
	}

	closeEditTuneForm = () => {
		this.setState({
			editTune: false,
			tune: null
		})
	}

	//********DELETE_STUDENT handling****************
	deleteTune = (id) => {
		let { history } = this.props
		this.props.onDeleteTune(id, history)
	}

	//********LIKE_STUDENT handling****************
	likeTune = (id) => {
		let { history } = this.props
		history.push('/tunes')
		let tune = this.props.tunes.find(stu => stu.id === id)
		let data = Object.assign({}, tune, { likes: tune.likes + 1 })
		this.props.onUpdateTune(data, history)
	}

	render() {
		const { match, tunes } = this.props

		return (
			<Container>
				<hr />
				{/*********CREATE STUDENT MODAL********************/}
				<button onClick={this.createTuneForm}>Add Tune</button>
				<Modal
					show={this.state.createTune}
					modalClosed={this.createTuneFormCancel}>
					<CreateTune
						createTune={(newTuneData) => this.createTune(newTuneData)}
						createTuneCancel={this.createTuneFormCancel} />
				</Modal>

				{/**********EDIT STUDENT MODAL********************/}
				<Modal
					show={this.state.editTune}
					modalClosed={this.closeEditTuneForm}>
					{this.state.tune ? <EditTune
						tune_id={this.state.tune.id}
						// id={this.state.tune.id}
						// firstname={this.state.tune.firstname}
						// lastname={this.state.tune.lastname}
						// email={this.state.tune.email}
						// level={this.state.tune.level}
						// teacher_id={this.state.tune.teacher_id}
						// teacher={this.state.tune.teacher}
						// teachers={this.props.teachers}
						// active={this.state.tune.active}
						close={() => this.closeEditTuneForm()}
					// editTuneUpdate={(data) => this.editTuneUpdate(data)}
					/> : null}
				</Modal>

				{/**********STUDENTS LIST************************/}
				<div>
					<Switch>
						<Route path={`${match.url}/:id/edit`} exact component={EditTune} />
						<Route path={`${match.url}/new`} exact component={CreateTune} />
						<Route path={`${match.url}/:id`} exact component={Tune} />
						<Route path={match.url} exact />
					</Switch>
				</div>
				<div>
					<div><h5 className="IndexHeaderBackground">ALL tunes</h5>
						<TunesList
							tunes={tunes}
							edit={(id) => this.showEditTuneForm(id)}
							deleteTune={(id) => this.deleteTune(id)}
							likeTune={(id) => this.likeTune(id)}
						/></div>
				</div>
				<hr />
			</Container>
		)
	}
}

const mapStateToProps = state => {
	return {
		tunes: state.stu.tunes,
		teachers: state.tch.teachers
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchTunes: () => dispatch(actions.fetchTunes()),
		onCreateTune: (data, history) => dispatch(actions.createTune(data, history)),
		// onUpdateTune: (data, history) => dispatch(actions.updateTune(data, history)),
		onDeleteTune: (id, history) => dispatch(actions.deleteTune(id, history))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tunes)
