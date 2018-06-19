import React, { Component } from 'react';
import './EditTune.css';
import { connect } from 'react-redux'
import * as actions from '../../store/actions/tuneActions'

class EditTune extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tune: '',
			id: '',
			firstname: '',
			lastname: '',
			email: '',
			level: '',
			teacher_id: '',
			teacher: '',
			active: '',
			teachers: [],
			close: null
		}
	}

	componentDidMount() {
		let tune = this.state.tune
		if (this.props.tune_id) {
			tune = this.props.tunes.find(stu => stu.id === this.props.tune_id)
			this.setState({
				tune: tune,
				close: this.props.close
			})
		} else {
			tune = this.props.tunes.find(stu => stu.id === +this.props.match.params.id)
			this.setState({ tune: tune })
		}

		this.setState({
			id: tune.id,
			firstname: tune.firstname,
			lastname: tune.lastname,
			email: tune.email,
			level: tune.level,
			teacher_id: tune.teacher_id,
			teacher: tune.teacher,
			active: tune.active,
			teachers: this.props.teachers
		})
	}

	handleTeacherSelect = (event) => {
		this.setState({
			teacher: this.props.teachers.find(teacher => teacher.lastname === event.target.value)
		})
	}

	toggleActiveSelect = () => {
		let toggle = this.state.active
		this.setState({ active: !toggle })
	}

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
		e.preventDefault()
	}

	handleCancel = () => {
		if (this.state.close) {
			this.props.close()
		} else {
			this.props.history.goBack()
		}
	}

	handleSubmit = (e) => {
		let { history } = this.props
		let data = {
			id: this.state.id,
			firstname: this.state.firstname,
			lastname: this.state.lastname,
			email: this.state.email,
			level: this.state.level,
			teacher_id: this.state.teacher.id,
			active: this.state.active
		}
		this.props.onUpdateTune(data, history)
		if (this.state.close) {
			this.props.close()
		}
		e.preventDefault();
	}

	render() {
		const teacherSelectOptions = this.props.teachers.map(teacher => {
			return <option value={teacher.lastname} id={teacher.id} key={teacher.id}>{teacher.lastname}</option>
		})

		return (
			<div>
				<p className="FormInstructions">Edit form and click 'Update Tune'</p>
				<form className="Form">
					<p><label htmlFor="tune_name">First name </label>
						<input
							type="text"
							name="firstname"
							value={this.state.firstname}
							onChange={this.handleChange}
						/></p>
					<p><label>Last name </label>
						<input
							type="text"
							name="lastname"
							value={this.state.lastname}
							onChange={this.handleChange}
						/></p>
					<p><label>Email </label>
						<input
							type="text"
							name="email"
							value={this.state.email}
							onChange={this.handleChange}
						/></p>
					<p><label>Level </label>
						<input
							type="text"
							name="level"
							value={this.state.level}
							onChange={this.handleChange}
						/></p>
					<p>
						<label>TeacherSelector</label>
						<select
							value={this.state.teacher.lastname}
							onChange={(event) => this.handleTeacherSelect(event)}>
							{teacherSelectOptions}
						</select>
					</p>
					<p><label>Active?</label>
						<button
							type="button"
							name="active"
							value={this.state.active}
							onClick={() => this.toggleActiveSelect()}
							className={this.state.active ? "true" : "false"}
						>{this.state.active.toString()}</button></p>
					<button
						type="button"
						name="cancel"
						onClick={this.handleCancel}
						className="Danger"
					>CANCEL</button>
					<button
						type='button'
						className="Success"
						onClick={(e) => this.handleSubmit(e)}
					>SAVE</button>
				</form>
			</div>
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
		onUpdateTune: (data, history) => dispatch(actions.updateTune(data, history))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTune)
