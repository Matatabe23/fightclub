<template>
	<div class="Main">
		<MySelect v-model="selectedSort" :options="sortOptions" />
		<PostList :posts="selectedPosts" />

		<div class="page__wrappper">
			<div class="page" v-for="pageNumber in totalPages" :key="pageNumber"
				:class="{ 'cuurent_page': page === pageNumber }" @click="changePage(pageNumber)">
				{{ pageNumber }}
			</div>
		</div>

	</div>
</template>

<script>
import { $autHost, $host } from "@/Http/index"; // импортируем экземпляры axios для обращения к серверу

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
					console.log(response.headers);

				})
				.catch(error => {
					console.log(error);
				});
		},
		changePage(pageNumber) {
			this.page = pageNumber;
			this.fetchPosts(); // Вызываем метод fetchPosts при изменении страницы
		}
	},


}
</script>

<style scoped>
.page__wrappper {
	display: flex;
	justify-content: center;
}

.page {
	border: 1px solid black;
	padding: 15px;
	cursor: pointer;
	color: white;
}

.cuurent_page {
	border: 2px solid red;
}
</style>