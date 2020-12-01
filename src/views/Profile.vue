<template>
    <div>
        <div class="page-title">
            <h3>Profile</h3>
        </div>

        <form class="form" @submit.prevent="submitHandler">
            <div class="input-field">
                <input
								 	id="description"
								 	type="text"
								 	v-model="name"
									:class="{invalid: $v.name.$dirty && !$v.name.required}"
								  
								>
                <label for="description">Имя</label>
                <span
									class="helper-text invalid"
									v-if="$v.name.$dirty && !$v.name.required"
								>
									Enter your name
								</span>
            </div>

            <button class="btn waves-effect waves-light" type="submit">
                Update
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import {required} from 'vuelidate/lib/validators'

export default {
	data() {
		return {
			name: "",
		}
	},

	validations: {
		name: {required},
	},

	mounted() {
		this.name = this.info.name

		setTimeout(() => {
			M.updateTextFields()
		}, 0)
	},

	computed: {
		...mapGetters(["info"])
	},

	methods: {
		...mapActions(["updateInfo"]),
		// Form validation
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
			}
			
			try {
				await this.updateInfo({
					name: this.name
				})
			} catch (error) {
				
			}
    }
	},
}
</script>