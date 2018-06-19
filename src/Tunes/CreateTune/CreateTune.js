import React, { Component } from 'react';
import './CreateTune.css'
import * as actions from '../../store/actions/index'
import { connect } from 'react-redux'

class CreateTune extends Component {
	constructor(props) {
		super(props)

		this.state = {
			firstname: '',
			lastname: '',
			email: '',
			level: '',
			teacher_id: 1,
			teacher: ''
		}
	}

	componentWillMount() {
		this.props.onFetchTeachers()
	}

	handleOnChange = (event) => {
		const { name, value } = event.target;
		this.setState({ [name]: value })
	}

	handleTeacherSelect = (event) => {
		this.setState({
			teacher_id: this.props.teachers.find(teacher => teacher.lastname === event.target.value).id
		})
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const newTuneData = this.state;
		this.props.createTune(newTuneData)
		this.setState({
			firstname: '',
			lastname: '',
			email: '',
			level: '',
			teacher_id: ''
		});
		this.props.createTuneCancel()
	}

	render() {
		const teacherOptions = this.props.teachers.map(teacher => {
			return <option value={teacher.lastname} id={teacher.id} key={teacher.id}>{teacher.lastname}</option>
		})

		return (
			<div>
				<p>Complete form and click 'Add Tune'</p>
				<form onSubmit={this.handleSubmit}>
					<p><label htmlFor="tune_name">First name </label>
						<input
							type="text"
							name="firstname"
							value={this.state.firstname}
							onChange={(event) => this.handleOnChange(event)}
							placeholder="firstname"
							required />
					</p>
					<p><label>Last name </label>
						<input
							type="text"
							name="lastname"
							value={this.state.lastname}
							onChange={(event) => this.handleOnChange(event)}
							placeholder="lastname"
							required />
					</p>
					<p><label>Email </label>
						<input
							type="text"
							name="email"
							value={this.state.email}
							onChange={(event) => this.handleOnChange(event)}
							placeholder="email"
							required />
					</p>
					<p><label>Level</label>
						<input
							type="text"
							name="level"
							value={this.state.level}
							onChange={(event) => this.handleOnChange(event)}
							placeholder="level"
							required />
					</p>
					<p><label>Select Teacher</label>
						<select
							value={this.state.teacher.lastname}
							onChange={(event) => this.handleTeacherSelect(event)}>
							{teacherOptions}
						</select>
					</p>
					<button
						type="button"
						onClick={this.props.createTuneCancel}
						className="Danger"
					>CANCEL</button>
					<button className="Success"
					>CREATE Tune</button>
				</form>
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		teachers: state.tch.teachers
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchTeachers: () => dispatch(actions.fetchTeachers())
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTune)
