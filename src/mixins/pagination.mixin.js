export default {
	data() {
		return {
			page: +this.$route.query.page || 1,
			pageSize: 5,
			pageCount: 0,
			allItems: [],
			items: []
		}
	},

	methods: {
		pageChengeHandler(page) {
			this.$router.push(`${this.$route.path}?page=${page}`)
			this.items = this.allItems[page - 1] || this.allItems[0]
		},
		
		setupPagination(allItems, chunkSize = this.pageSize) {
			if (chunkSize <= 0) return allItems
			while (allItems.length) this.allItems.push(allItems.splice(0, chunkSize))

			this.items = this.allItems[this.page - 1] || this.allItems[0]
			this.pageCount = this.allItems.constructor === Object ? Object.keys(this.allItems).length : this.allItems.length
		}
	},
}
