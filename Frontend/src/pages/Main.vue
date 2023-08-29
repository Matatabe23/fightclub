<template>
	<div class="Main">
		<MySelect v-model="selectedSort" :options="sortOptions" />
		<PostList :posts="selectedPosts" />

		<div class="page__wrappper">
			<button class="button-page" @click="changePage(page - 1)"><i class='bx bx-left-arrow-alt'></i></button>
			<h1>{{ page }}</h1>
			<button class="button-page" @click="changePage(page + 1)"><i class='bx bx-right-arrow-alt' ></i></button>
		</div>
	</div>
</template>

<script>
import { $autHost, $host } from "@/Http/index";

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
		this.fetchPosts();
	},
	computed: {
		selectedPosts() {
			return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
		}
	},
	methods: {
		fetchPosts() {
			$host.get('api/posts/receive', {
				params: {
					_page: this.page,
					_limit: this.limit
				}
			})
				.then(response => {
					this.posts = response.data.reverse();
					this.totalPages = Math.ceil(100 / this.limit);
				})
				.catch(error => {
					console.log(error);
				});
		},
		changePage(pageNumber) {
			if (pageNumber >= 1 && pageNumber <= this.totalPages) {
				this.page = pageNumber;
				this.fetchPosts();
			}
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