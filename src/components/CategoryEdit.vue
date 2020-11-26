<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Redact</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
							v-for="elem of categories"
							:key="elem.id"
							:value="elem.id"
						>
							{{elem.title}}
						</option>
          </select>

          <label>Select a category</label>
        </div>

        <div class="input-field">
          <input
					 	type="text"
					 	id="name"
					 	v-model="title"
          	:class="{invalid: $v.title.$dirty && !$v.title.required}"
					>
          <label for="name">Name</label>
          <span
					 	class="helper-text invalid"
						v-if="$v.title.$dirty && !$v.title.required"
					>
						TITLE
					</span>
        </div>

        <div class="input-field">
          <input
					 	id="limit"
					 	type="number"
					 	v-model.number="limit"
            :class="{invalid: $v.limit.$dirty && !$v.limit.minValue}"
					>
          <label for="limit">Limit</label>
          <span
					 	class="helper-text invalid"
						v-if="$v.limit.$dirty && !$v.limit.minValue"
					>
						LIMIT
					</span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Refresh
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {required, minValue} from 'vuelidate/lib/validators'

export default {
	name: "CategoryEdit",

	props: {
		categories: {
			type: Array,
			required: true
		}
	},

	data() {
		return {
			title: "",
      limit: null,
			select: null,
			current: null,
		}
	},

	validations: {
    title: {required},
    limit: {minValue: minValue(100)}
	},
	
	created() {
		const {id, title, limit} = this.categories[0]
		this.current = id
		this.title = title
		this.limit = limit
	},

	mounted() {
		this.select = M.FormSelect.init(this.$refs.select)
		M.updateTextFields()
	},

	beforeDestroy() {
		if (this.select && this.select.destroy) {
			this.select.destroy()
		}
	},

	methods: {
    // Form validate
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
    },
	},
	
	watch: {
		current(categoryId) {
			const {title, limit} = this.categories.find(c => c.id === categoryId)
			this.title = title
			this.limit = limit
		}
	}
}
</script>

<style scoped>

</style>