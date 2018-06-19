import React from 'react'
import TuneRow from '../TuneRow/TuneRow'
import { Table } from 'reactstrap'
import './TunesList.css'

const TunesList = (props) => {

	// let sortedTunes = props.tunes.sort((a, b) => a.lastname.toLowerCase() < b.lastname.toLowerCase() ? -1 : a.lastname.toLowerCase() > b.lastname.toLowerCase() ? 1 : 0)
	console.log(props.tunes)
	let sortedTunes = props.tunes.sort((a, b) => a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0)

	let renderTunes = sortedTunes.map((tune, index) => {
		return (
			<TuneRow
				key={index}
				tune={tune}
				edit={props.edit}
				deleteTune={props.deleteTune}
				likeTune={props.likeTune}
			/>
		)
	})

	return (
		<div>
			<Table striped size="sm" className="TunesList">
				<thead>
					<tr>
						<th>ID</th>
						<th>Last</th>
						<th>First</th>
						<th>Email</th>
						<th>TeacherID</th>
						<th>Level</th>
						<th>Active?</th>
						<th>Show</th>
						{props.edit ? <th>Edit</th> : null}
						{props.deleteTune ? <th>X</th> : null}
						{props.likeTune ? <th>Like</th> : null}
						{props.likeTune ? <th>Count</th> : null}
					</tr>
				</thead>
				<tbody>
					{renderTunes}
				</tbody>
			</Table>
		</div>
	)
}

export default TunesList
