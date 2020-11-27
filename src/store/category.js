import firebase from 'firebase/app'

export default {
  actions: {
		async fetchCategories({dispatch, commit}) {
			try {
				const uid = await dispatch("getUserId")
				// Getting an object of categories or if no categories we get a clear object 
				const categories = (await firebase.database().ref(`/users/${uid}/categories`).once("value")).val() || {}

				// Return an array with current info about user categories with additional field of id
				return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit("setError", e)
        throw e
      }
		},

		async refreshCategory({dispatch, commit}, {title, limit, id}) {
			try {
				const uid = await dispatch("getUserId")
				// We update the category {title and limit} after editing if its id === id, which we send to the input parameters
        await firebase.database().ref(`/users/${uid}/categories`).child(id).update({title, limit})
      } catch (e) {
        commit("setError", e)
        throw e
      }
		},

    async createCategory({dispatch, commit}, {title, limit}) {
      try {
        const uid = await dispatch("getUserId")
        const category = await firebase.database().ref(`/users/${uid}/categories`).push({
          title, limit
        })

        return {title, limit, id: category.key}
      } catch (e) {
        commit("setError", e)
        throw e
      }
    }
  }
}