import firebase from 'firebase/app'

export default {
	actions: {
		async createRecord({dispatch, commit}, records) {
			try {
				const uid = await dispatch("getUserId")
				return await firebase.database().ref(`/users/${uid}/records`).push(records)
			} catch (error) {
				commit("setError", error)	
				throw error
			}
		},

		async fetchRecords({dispatch, commit}) {
			try {
				const uid = await dispatch("getUserId")
				// Getting an object of records or if no records we get a clear object 
				const records = (await firebase.database().ref(`/users/${uid}/records`).once("value")).val() || {}
				
				// Return an array with current info about user records with additional field of id 
				return Object.keys(records).map(key => ({...records[key], id: key}))
			} catch (error) {
				commit("setError", error)
				throw error
			}
		}
	}
}