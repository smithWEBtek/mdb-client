import React from 'react'
import './TuneRow.css'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Aux/Aux'

const TuneRow = (props) => {

	return (
		<Aux>
			<tr>
				<th scope="row">{props.tune.id}</th>
				<td>
					<Link
						to={`/tunes/${props.tune.id}`}
						style={{ marginRight: '5px' }}
						key={props.tune.id}>{props.tune.lastname}
					</Link>
				</td>
				<td>
					{props.tune.firstname}
				</td>
				<td>{props.tune.email}</td>
				<td>{props.tune.teacher_id}</td>
				<td>{props.tune.level}</td>

				<td className={props.tune.active.toString()}>{props.tune.active.toString()}</td>

				<td><button
					type='button'
					className="Success">
					<Link
						to={`/tunes/${props.tune.id}`}
						key={props.tune.id}
					>show</Link>
				</button></td>

				{props.edit ?
					<td><button
						type='button'
						className="Edit"
						onClick={() => props.edit(props.tune.id)}>edit
        </button></td>
					: null}

				{props.deleteTune ?
					<td><button
						onClick={() => props.deleteTune(props.tune.id)}
						className="Danger">X</button></td>
					: null}

				{props.likeTune ?
					<td><button
						onClick={() => props.likeTune(props.tune.id)}
						className="Success">LIKE</button></td>
					: null}

				{props.likeTune ?
					<td className="LikeCount">{props.tune.likes.toString()}</td>
					: null}

			</tr>
		</Aux>
	)
}

export default TuneRow
