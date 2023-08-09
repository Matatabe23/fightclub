<template>
	<div class="Main">
		<PostList :posts="posts"/>
	</div>
</template>

<script>
import { $autHost, $host  } from "@/Http/index"; // импортируем экземпляры axios для обращения к серверу

export default {
	data() {
		return {
			posts: [],
			formattedPosts: []
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
}
</script>

<style scoped>

</style>