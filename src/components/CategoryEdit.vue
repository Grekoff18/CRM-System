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
						Enter a new category name
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
						Minimal limit -> {{$v.limit.$params.minValue.min}}
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
// Importing different plugins for validating input fields
import {required, minValue} from 'vuelidate/lib/validators'

export default {
	name: "CategoryEdit",

	props: {
		// Getting an array of categories from a main component with strict types 
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

	// Set up for validating our input fields
	validations: {
    title: {required},
    limit: {minValue: minValue(100)}
	},

	// We need this hook to set start information for input fields. 
	created() {
		const {id, title, limit} = this.categories[0]
		this.current = id
		this.title = title
		this.limit = limit
	},

	// Fix bugs with animation in the limit field and select field
	mounted() {
		this.select = M.FormSelect.init(this.$refs.select)
		M.updateTextFields()
	},

	// For optimization out application destroy select field
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

			let categoryData = {
				id: this.current,
				title: this.title,
				limit: this.limit,
			}
			
			// Update category data after edit 
			try {
        const category = await this.$store.dispatch("refreshCategory", categoryData)
				this.$emit("updated", categoryData)
				this.$message("Category updated successfully")
      } catch (e) {}
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