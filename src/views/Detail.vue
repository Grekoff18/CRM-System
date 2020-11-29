<template>
  <div>

		<Loader v-if="loading"/>

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">History</router-link>
        <a @click.prevent class="breadcrumb">{{record.type}}</a>
      </div>

      <div class="row">
        <div class="col s12 m6">
          <div
					 	class="card"
						:class="record.recordClass"
					>
            <div class="card-content white-text">
              <p>Description: {{record.description}}</p>
              <p>Amount: {{record.amount | currency("UAH")}}</p>
              <p>Category: {{record.categoryName}}</p>

              <small>{{record.date | date("datetime")}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

		<p
		 	class="center"
			v-else
		>
			There is no such record :(
		</p>

  </div>
</template>

<script>
export default {
  name: "detail",

  data() {
    return {
      record: null,
      loading: true,
    };
  },

  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
		const category = await this.$store.dispatch("fetchCategoryById", record.categoryId);
		
		this.record = {
			...record,
			categoryName: category.title,
			recordClass: record.type === "income" ? "green" : "red"
		}

    this.loading = false;
  },
};
</script>