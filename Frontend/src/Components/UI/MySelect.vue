<template>
	<div class="MySelect">
		<select :model="modelValue" @change="changeOption" class="MySelect__select">
			<option value="">По дате</option>
			<option v-for="option in options" :key="option.value" :value="option.value">
				{{ option.name }}</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'MySelect',
	props: {
		modelValue: {
			type: String
		},
		options: {
			type: Array,
			default: () => []
		},
	},
	methods: {
		changeOption(event) {
			this.$emit('update:modelValue', event.target.value)
		}
	}
}
</script>

<style scoped>
.MySelect{
	display: flex;
	margin: 0 5% 10px 5%;
}
.MySelect__select{
	background-color: #4d516d;
	color: white;
	width: 200px;
  height: 40px;
}

.MySelect:first-child {
  animation: fadeIn 1s ease-in-out;
}
</style>