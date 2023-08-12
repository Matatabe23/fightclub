<template>
	<div class="Main">
		<MySelect v-model="selectedSort" :options="sortOptions" />
		<PostList :posts="selectedPosts" />
	</div>
</template>

<script>
import { $autHost, $host } from "@/Http/index"; // импортируем экземпляры axios для обращения к серверу

export default {
	data() {
		return {
			posts: [],
			selectedSort: '',
			sortOptions: [
				{ value: 'title', name: 'По названию' },
				{ value: 'body', name: 'По описанию' }
			],
		}
	},
	mounted() {
		$host.get('api/posts/receive') // здесь указывается путь к API
			.then(response => {
				this.posts = response.data.reverse(); // здесь полученные данные помещаются в posts
				console.log(this.posts)
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

<style scoped></style>