<template>
	<AdminPanels></AdminPanels>
	<div class="CreateNew">
		<PostForm :post="post" @CreatePosts="createPost" />
		<h1 style="text-align: center;">список новостей</h1>
		<PostList :posts="posts" @onDeletePost="deletePost" />
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
		};
	},
	mounted() {
		//Получение всех постов
		Receive()
			.then(response => {
				console.log(response)
				this.posts = response;
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
			Posts(post)
				.then(() => {
					this.post.title = "";
					this.post.body = "";
					this.post.ADname = "";
					location.reload();
				})
				.catch((err) => console.log(err));
		},
		//Удаление поста
		async deletePost(postId) {
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
					location.reload();
				})
				.catch(error => {
					console.log(error);
				})
		}
	}
}

</script>

<style scoped></style>
