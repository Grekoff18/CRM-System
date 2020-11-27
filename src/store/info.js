import firebase from 'firebase/app'

export default {
  state: {
    info: {},
  },

  mutations: {
    setInfo(state, info) {
      state.info = info
    },

    clearInfo(state) {
      state.info = {}
    }
  },

  actions: {
		async updateInfo({dispatch, commit, getters}, toUpdate) {
			try {
				let uid = await dispatch("getUserId")
				const updateData = {...getters.info, ...toUpdate}
				await firebase.database().ref(`/users/${uid}/info`).update(updateData)
				commit("setInfo", updateData)
      } catch (e) {
				commit("setError", e)
				throw e
      }
		},

    async fetchInfo({dispatch, commit}) {
      try {
        let uid = await dispatch("getUserId")
        let info = await firebase.database().ref(`/users/${uid}/info`).once("value")
        commit("setInfo", info.val())
      } catch (e) {
				commit("setError", e)
				throw e
      }
    },
  },

  getters: {
    info: state => state.info
  }
}
