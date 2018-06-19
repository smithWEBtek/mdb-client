import * as actionTypes from './actionTypes'
import TuneService from '../services/TuneService'

//-----CREATE TUNE ACTIONS-----------------------------
export const createTuneStart = () => {
	return { type: actionTypes.CREATE_TUNE_START }
}
export const createTuneSuccess = () => {
	return { type: actionTypes.CREATE_TUNE_SUCCESS }
}
export const createTuneFail = (error) => {
	return { type: actionTypes.CREATE_TUNE_FAIL, error: error }
}
export const createTune = (data, history) => {
	return dispatch => {
		dispatch(createTuneStart())
		TuneService.createTune(data)
			.then(response => {
				dispatch({ type: actionTypes.CREATE_TUNE, tuneData: response })
				history.push(`/tunes/${response.id}`)
				dispatch(createTuneSuccess())
			})
			.catch(error => {
				dispatch(createTuneFail(error))
			})
	}
}


//-----FETCH TUNES ACTIONS-----------------------------
export const fetchTunesStart = () => {
	return { type: actionTypes.FETCH_TUNES_START }
}
export const fetchTunesSuccess = (tunes) => {
	return { type: actionTypes.FETCH_TUNES_SUCCESS, tunesList: tunes }
}
export const fetchTunesFail = (error) => {
	return { type: actionTypes.FETCH_TUNES_FAIL, error: error }
}
export const fetchTunes = () => {
	return dispatch => {
		dispatch(fetchTunesStart())
		TuneService.fetchTunes()
			.then(response => {

				dispatch({ type: actionTypes.FETCH_TUNES, tunesList: response })
				dispatch(fetchTunesSuccess())
			})
			.catch(error => {
				dispatch(fetchTunesFail(error))
			})
	}
}


//-----UPDATE TUNE ACTIONS-----------------------------
export const updateTuneStart = () => {
	return { type: actionTypes.UPDATE_TUNE_START }
}
export const updateTuneSuccess = () => {
	return { type: actionTypes.UPDATE_TUNE_SUCCESS }
}
export const updateTuneFail = (error) => {
	return { type: actionTypes.UPDATE_TUNE_FAIL, error: error }
}
export const updateTune = (data, history) => {
	return dispatch => {
		dispatch(updateTuneStart())
		TuneService.updateTune(data)
			.then(response => {
				dispatch({ type: actionTypes.UPDATE_TUNE, updatedTuneData: response })
				history.goBack()
				dispatch(updateTuneSuccess())
			})
			.catch(error => {
				dispatch(updateTuneFail(error))
			})
	}
}

//-----DELETE TUNE ACTIONS-----------------------------
export const deleteTuneStart = () => {
	return { type: actionTypes.DELETE_TUNE_START }
}
export const deleteTuneSuccess = () => {
	return { type: actionTypes.DELETE_TUNE_SUCCESS }
}
export const deleteTuneFail = (error) => {
	return { type: actionTypes.DELETE_TUNE_FAIL, error: error }
}
export const deleteTune = (id, history) => {
	return dispatch => {
		dispatch(deleteTuneStart())
		TuneService.deleteTune(id)
			.then(response => {
				dispatch({ type: actionTypes.DELETE_TUNE, id: id })
				dispatch(deleteTuneSuccess())
				history.push('/tunes')
			})
			.catch(error => {
				dispatch(deleteTuneFail(error))
			})
	}
}
