<template>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Amount</th>
        <th>Date</th>
        <th>Category</th>
        <th>Type</th>
        <th>Open</th>
      </tr>
    </thead>

    <tbody>
      <tr
				v-for="(record, idx) of records"
				:key="record.id"
			>
        <td>{{idx + 1}}</td>
        <td>{{record.amount | currency("UAH")}}</td>
        <td>{{record.date | date("datetime")}}</td>
				<td>{{record.categoryName}}</td>

        <td>
          <span
					 	class="white-text badge"
						:class="record.typeClass"	 
					>
						{{record.type}}
					</span>
        </td>

        <td>
          <button
					 	class="btn-small btn"
						@click="$router.push(`/detail/${record.id}`)"
						v-tooltip="'Check detail of this record'"
					>
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
	props: {
		records: {
			required: true,
			type: Array,
		}
	}
}
</script>