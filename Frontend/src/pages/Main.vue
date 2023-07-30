<template>
	<div class="Main">
		<div class="post" v-for="post in posts">
			<div><strong>Дата:</strong> {{ post.createdAt.replace(/[T|Z]/g, ' ').slice(0, -14) }}</div>
			<div><strong>Название:</strong> {{ post.title }}</div>
			<div><strong>Описание:</strong> {{ post.body }}</div>
			<div><strong>Автор:</strong> {{ post.ADnameName  }}({{ post.ADnameRole }})</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			posts: [],
			formattedPosts: []
		}
	},
	mounted() {
		axios.get('http://localhost:5000/api/posts/receive') // здесь указывается путь к API
			.then(response => {
				this.posts = response.data.reverse(); // здесь полученные данные помещаются в posts
				console.log(this.posts)
			})
			.catch(error => {
				console.log(error);
			})
	},
}
</script>

<style scoped>
.post {
	border-radius: 15px;
	background-color: #4d516d;
	margin: 0 5%;
	margin-bottom: 20px;
	box-shadow: 0 0 10px black;
}
.post div {
	padding: 10px;
	color: white;
}

.post strong {
	color: #000000;
}
</style>