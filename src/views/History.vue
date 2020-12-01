<template>
  <div>
    <div class="page-title">
      <h3>Record history</h3>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
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
import {Pie} from 'vue-chartjs'

export default {
	name: "history",

	extends: Pie,
	
	mixins: [paginationMixin],

  components: {
		HistoryTemplate
	},

	data() {
		return {
			loading: true,
			records: [],
			chartdata: {
      	labels: ['January', 'February'],
				datasets: [
					{
						label: 'Data One',
						backgroundColor: '#f87979',
						data: [40, 20]
					}
				]
    	},
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},

	async mounted() {
		// Get an array of records from database
		this.records = await this.$store.dispatch("fetchRecords")
		// Get an array of categories from database
		const categories = await this.$store.dispatch("fetchCategories")

		this.setup(categories)
		this.loading = false
	},

	methods: {
		setup(categories) {
			// Pagination setup through mixins
			this.setupPagination(this.records.map(record => {
				return {
					...record,
					categoryName: categories.find(c => c.id === record.categoryId).title,
					typeClass: record.type === "income" ? "green" : "red",
				}
			}))

			this.renderChart(
			{
      	labels: categories.map(c => c.title),
				datasets: [
					{
						label: 'Outcome by category',
						backgroundColor: categories.map(c => {
							const spend = this.records
								.filter(r => r.categoryId === c.id)
								.filter(r => r.type === "outcome")
								.reduce((total, record) => {
									return total += Number(record.amount)
								}, 0)

								const percent = (100 * spend) / c.limit
								const progresColor = percent < 75 
									? "green"
									: percent < 100
										? "yellow"
										: "red"

								return `${progresColor}`
						}),
							
						data: categories.map(c => {
							return this.records.reduce((total, r) => {
								if (r.categoryId === c.id && r.type === "outcome") {
									total += Number(r.amount)
								}	

								return total
							}, 0)
						})
					}
				]
			}, 
			{
				responsive: true,
				maintainAspectRatio: false
			})
		}
	}
};
</script>

<style>
.pagination li a {
	 outline: none;
}
</style>