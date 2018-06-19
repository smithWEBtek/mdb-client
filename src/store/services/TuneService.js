const API_URL = process.env.REACT_APP_API_URL || "https://music-studio.herokuapp.com/api"

const TuneService = {
	createTune(tune) {
		const request = {
			method: 'POST',
			body: JSON.stringify({ tune: tune }),
			headers: { 'Content-Type': 'application/json' }
		}
		return fetch(`${API_URL}/tunes`, request)
			.then(response => response.json())
			.catch(error => {
				console.log('[TuneService][createTune] ERROR: ', error)
			})
	},
	fetchTunes() {
		return fetch(`${API_URL}/tunes`)
			.then(response => response.json())
			.catch(error => {
				console.log('[TuneService][fetchTunes] ERROR: ', error)
			})
	},
	updateTune(data) {
		const request = {
			method: 'PATCH',
			body: JSON.stringify({ tune: data }),
			headers: { 'Content-Type': 'application/json' }
		}
		return fetch(`${API_URL}/tunes/${data.id}`, request)
			.then(response => response.json())
			.catch(error => {
				console.log('[TuneService][updateTune] ERROR: ', error)
			})
	},
	deleteTune(id) {
		const request = {
			method: 'DELETE',
			body: JSON.stringify({ id: id }),
			headers: { 'Content-Type': 'application/json' }
		}
		return fetch(`${API_URL}/tunes/${id}`, request)
			.then(response => response.json())
			.catch(error => {
				console.log('[TuneService][deleteTune] ERROR: ', error)
			})
	}
}

export default TuneService;
