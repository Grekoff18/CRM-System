<template>
  <div>
    <div class="page-title">
      <h3>Planning</h3>
      <h4>{{info.bill | currency("UAH")}}</h4>
    </div>

		<Loader v-if="loading"/>

		<p
		 	class="center"
		 	v-else-if="!categories.length"
		>
			Categories undefined - <router-link to="/categories">Add new category</router-link>
		</p>

    <section v-else>
      <div
				v-for="el of categories"
				:key="el.id"
			>
        <p>
					<strong>{{el.title}}:</strong>
					{{el.spend | currency("UAH")}} из {{el.limit | currency("UAH")}}
				</p>

        <div
				 	class="progress"
				 	v-tooltip="el.tooltip"
				>
          <div
					 	class="determinate"
						:class="[el.progresColor]"
						:style="{width: el.progresPercent + '%'}"
					>
					</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Getting some getters from vuex store 
import {mapGetters} from 'vuex'
import currencyFilter from '@/filters/currency.filter'

export default {
	name: "planning",

	data: () => {
		return {
			loading: true,
			categories: [],
		}
	},

	async mounted() {
		// Get an array of records from database
		const records = await this.$store.dispatch("fetchRecords")
		// Get an array of categories from database
		const categories = await this.$store.dispatch("fetchCategories")

		// Run the method of iterating over the array of categories
		this.categories = categories.map(c => {
			// We calculate how much was spent by walking through the array of records
			const spend = records
				// We filter records whose ID matches with ID categories
				.filter(r => r.categoryId === c.id)
				// Filter records whose TYPE === outcome
				.filter(r => r.type === "outcome")
				// Summing up all matching values
				.reduce((total, record) => {
					return total += Number(record.amount)
				}, 0)

				// Dynamic calculation of the percentage of money spent on the account
				const percent = (100 * spend) / c.limit
				// We write a check for optimization (so that the percentage is not more than 100)
				const progresPercent = percent > 100 ? 100 : percent
				// Determine the color of the progress bar depending on the percentage
				const progresColor = percent < 60 
					? "green"
					: percent < 100
						? "yellow"
						: "red"

				const tooltipValue = c.limit - spend
				const tooltip = `${tooltipValue < 0 ? 'Exceeded by' : 'Left'} ${currencyFilter(Math.abs(tooltipValue), "UAH")}`

				// We return the same array with additional information only
				return {
					...c,
					progresPercent,
					progresColor,
					spend,
					tooltip
				}
		})

		this.loading = false 
	},

	computed: {
		// Get the user info from store getters
		...mapGetters(["info"]),
	}
}
</script>