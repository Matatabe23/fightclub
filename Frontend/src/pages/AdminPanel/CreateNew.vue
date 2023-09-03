<template>
	<div class="CreateNew">
		<PostForm :post="post" @CreatePosts="createPost" />
		<MySelect v-model="selectedSort" :options="sortOptions" />
		<h1 style="text-align: center;">список новостей</h1>
		<PostList :posts="selectedPosts" @onDeletePost="deletePost" />
	</div>
</template>

<script>
import { Posts, DeletePosts } from '@/Http/AdminAPI'
import { check } from "@/Http/UserAPI";
import { Receive } from '@/Http/AdminAPI'

export default {
	components: {
	},
	data() {
		return {
			post: {
				title: "",
				body: "",
				ADnameName: "",
				ADnameRole: "",
			},
			posts: [],
			selectedSort: '',
			sortOptions: [
				{ value: 'title', name: 'По названию' },
				{ value: 'body', name: 'По описанию' }
			],
		};
	},
	mounted() {
		//Получение всех постов
		Receive()
			.then(response => {
				this.posts = response.reverse();
			})
			.catch(error => {
				console.log(error);
			})
	},

	created() {
		const AdminName = localStorage.getItem('token')
		check(AdminName)
			.then((AdminName) => {
				this.post.ADnameName = AdminName.name,
					this.post.ADnameRole = AdminName.role
			})
	},

	methods: {
		// Создание поста
		createPost(post) {
			if (!post.title || !post.body) { 
				alert('Пожалуйста, заполните обязательные поля: Название и Описание');
				return;
			}
			Posts(post)
				.then(() => {
					this.post.title = "";
					this.post.body = "";
					this.post.ADname = "";
					Receive()
						.then(response => {
							console.log(response)
							this.posts = response.reverse();
						})
						.catch(error => {
							console.log(error);
						});
				})
				.catch((err) => console.log(err));
		},


		//Удаление поста
		deletePost(postId) {
			const confirmation = confirm("Вы уверены, что хотите удалить этот пост?");
			if (!confirmation) {
				return;
			}
			const token = localStorage.getItem('token');
			DeletePosts({ id: postId }, {
				headers: {
					'Authorization': `Bearer ${token}`
				}
			})
				.then(response => {
					// Удаление поста из массива posts
					const index = this.posts.findIndex(post => post.id === postId);
					this.posts.splice(index, 1);
				})
				.catch(error => {
					console.log(error);
				})
		},
	},


	computed: {
		selectedPosts() {
			return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
		}
	}
}
</script>

<style scoped></style>
