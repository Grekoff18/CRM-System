<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
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
			<HistoryTemplate
				:records="records"
			/>		
		</section>
  </div>
</template>

<script>
import HistoryTemplate from '@/components/HistoryTable'

export default {
  name: "history",

  components: {
		HistoryTemplate
  
	},

	data() {
		return {
			loading: true,
			records: [],
			categories: [],
		}
	},

	async mounted() {
		// Get an array of records from database
		// this.records = await this.$store.dispatch("fetchRecords")
		const records = await this.$store.dispatch("fetchRecords")
		// Get an array of categories from database
		this.categories = await this.$store.dispatch("fetchCategories")

		this.records = records.map(record => {
				return {
					...record,
					categoryName: this.categories.find(c => c.id === record.categoryId).title,
					typeClass: record.type === "income" ? "green" : "red",
				}
			}
		)

		this.loading = false
	},
};
</script>