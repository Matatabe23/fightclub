<template>
	<div class="Main">
		<MySelect v-model="selectedSort" :options="sortOptions" />
		<PostList :posts="selectedPosts"/>
	</div>
</template>

<script>
import { Receive } from '@/Http/AdminAPI'

export default {
	data() {
		return {
			posts: [],
			selectedSort: '',
			page: 1,
			limit: 5,
			totalPages: 0,
			sortOptions: [
				{ value: 'title', name: 'По названию' },
				{ value: 'body', name: 'По описанию' }
			],
		}
	},
	mounted() {
		Receive()
			.then(response => {
				this.posts = response.reverse();
			})
			.catch(error => {
				console.log(error);
			})
	},
	computed: {
		selectedPosts() {
			return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
		}
	},
	}
</script>


<style scoped>
.page__wrappper {
	display: flex;
	justify-content: space-around;
	margin-bottom: 15px;
}
.button-page{
	border: none;
	background-color: none;
	padding: 15px;
	cursor: pointer;
}
</style>