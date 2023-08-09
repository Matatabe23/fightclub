<template>
	<div class="Main">
		<div class="posts" v-for="post in posts">
			<div class="post-container">
					<div><strong>Дата:</strong> {{ post.createdAt.replace(/[T|Z]/g, ' ').slice(0, -14) }}</div>
					<div><strong>Название:</strong> {{ post.title }}</div>
					<div><strong>Описание:</strong> {{ post.body }}</div>
					<div><strong>Автор:</strong> {{ post.ADnameName }}({{ post.ADnameRole }})</div>
				</div>
				<div class="posts-buttons" v-if="$route.path !== '/Main'">
					<ClassicButton style="margin-right: 15px;" @click="$emit('onDeletePost', post.id)">Удалить</ClassicButton>
				</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PostList',
	props: {
		posts: {
			type: Array,
			required: true
		}
	}
}
</script>

<style scoped>
.posts {
	border-radius: 15px;
	background-color: #4d516d;
	margin: 0 5%;
	margin-bottom: 20px;
	box-shadow: 0 0 10px black;

	display: flex;
	align-items: center;
}
.posts div {
	padding: 10px;
	color: white;
}

.posts strong {
	color: #000000;
}

.posts-buttons {
	margin-left: auto;
	display: flex;
}
</style>