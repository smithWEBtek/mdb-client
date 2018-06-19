import * as actionTypes from '../actions/actionTypes';

const initialState = {
	tunes: [],
	loading: false,
	error: false,
	message: ''
};

const reducer = (state = initialState, action) => {
	switch (action.type) {

		//-----CREATE STUDENT-----------------------------
		case actionTypes.CREATE_STUDENT_START:
			return Object.assign({}, state, { loading: true })

		case actionTypes.CREATE_STUDENT_SUCCESS:
			return Object.assign({}, state, { loading: false })

		case actionTypes.CREATE_STUDENT_FAIL:
			return Object.assign({}, state, {
				error: action.error,
				loading: false,
				message: action.type
			})

		case actionTypes.CREATE_STUDENT:
			const newTune = action.tuneData
			return Object.assign({}, state, {
				tunes: state.tunes.concat(newTune)
			})


		//-----FETCH STUDENTS-----------------------------
		case actionTypes.FETCH_STUDENTS_START:
			return Object.assign({}, state, { loading: true })

		case actionTypes.FETCH_STUDENTS_SUCCESS:
			return Object.assign({}, state, { loading: false })

		case actionTypes.FETCH_STUDENTS_FAIL:
			return Object.assign({}, state, {
				error: action.error,
				loading: false,
				message: action.type
			})

		case actionTypes.FETCH_STUDENTS:
			const tunes = action.tunesList
			return Object.assign({}, state, {
				tunes: tunes
			})


		//-----UPDATE STUDENT-----------------------------
		case actionTypes.UPDATE_STUDENT_START:
			return Object.assign({}, state, { loading: true })

		case actionTypes.UPDATE_STUDENT_SUCCESS:
			return Object.assign({}, state, { loading: false })

		case actionTypes.UPDATE_STUDENT_FAIL:
			return Object.assign({}, state, {
				error: action.error,
				loading: false,
				message: action.type
			})

		case actionTypes.UPDATE_STUDENT:
			//const tuneData = action.updatedTuneData
			//debugger
			//const tuneIndex = state.tunes.findIndex(tune => tune.id === tuneData.id);
			// const stateTemp = {
			//   ...state,
			//   tunes: [
			//     ...state.tunes.slice(0, tuneIndex),
			//     ...state.tunes.slice(tuneIndex + 1, state.tunes.length)
			//   ]
			// };
			const updatedTunesArray = state.tunes.map(tune => tune.id == action.updatedTuneData.id ? action.updatedTuneData : tune)
			return Object.assign({}, state, { tunes: updatedTunesArray })


		//-----DELETE STUDENT-----------------------------
		case actionTypes.DELETE_STUDENT_START:
			return Object.assign({}, state, { loading: true })

		case actionTypes.DELETE_STUDENT_SUCCESS:
			return Object.assign({}, state, { loading: false })

		case actionTypes.DELETE_STUDENT_FAIL:
			return Object.assign({}, state, {
				error: action.error,
				loading: false,
				message: action.type
			})

		case actionTypes.DELETE_STUDENT:
			const updatedTunes = state.tunes.filter(tune => tune.id !== action.id);
			return Object.assign({}, state, {
				tunes: updatedTunes
			})

		//----- DEFAULT --------------------------------
		default:
			return state;
	}
}

export default reducer;
