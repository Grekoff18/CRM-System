<template>
  <div>
    <div class="page-title">
      <h3>Categories</h3>
    </div>

    <section>
			<Loader v-if="loading"/>
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory"/>
        <CategoryEdit :categories="categories"/>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  name: "categories",

  components: {
    CategoryCreate, CategoryEdit
  },

  data() {
    return {
			categories: [],
			loading: true,
    }
	},
	
	async mounted() {
		this.categories = await this.$store.dispatch("fetchCategories")	
		this.loading = false
	},

  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    }
	}
}
</script>