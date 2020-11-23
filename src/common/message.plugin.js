export default {
	install(Vue, options) {
		Vue.prototype.$message = function(text) {
			M.toast({html: text})
		}

		Vue.prototype.$error = function(error) {
			M.toast({html: `Error: ${error}`})
		}
	}
}