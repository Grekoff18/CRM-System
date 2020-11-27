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
	}
}