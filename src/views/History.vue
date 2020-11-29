<template>
  <div>
    <div class="page-title">
      <h3>Record history</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

		<Loader v-if="loading"/>

		<p
		 	class="center"
			v-else-if="!records.length"
		>
			No records.
			<router-link to="/record">Create your first record</router-link>
		</p>

    <section v-else>
			<HistoryTemplate :records="items"/>	

			<Paginate
				v-model="page"
			 	:page-count="pageCount"
				:click-handler="pageChengeHandler"
				:container-class="'pagination'"
				:page-class="'waves-effect'"
			/>
		</section>
  </div>
</template>

<script>
import HistoryTemplate from '@/components/HistoryTable'
import paginationMixin from '@/mixins/pagination.mixin'

export default {
	name: "history",
	
	mixins: [paginationMixin],

  components: {
		HistoryTemplate
  
	},

	data() {
		return {
			loading: true,
			records: []
		}
	},

	async mounted() {
		// Get an array of records from database
		this.records = await this.$store.dispatch("fetchRecords")
		// Get an array of categories from database
		const categories = await this.$store.dispatch("fetchCategories")

		// Pagination setup through mixins
		this.setupPagination(this.records.map(record => {
				return {
					...record,
					categoryName: categories.find(c => c.id === record.categoryId).title,
					typeClass: record.type === "income" ? "green" : "red",
				}
			}
		))

		this.loading = false
	},
};
</script>

<style>
.pagination li a {
	 outline: none;
}
</style>