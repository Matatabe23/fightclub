<template>
	<div class="PostList">
		<transition-group name="PostList-transition">
			<div class="posts" v-for="post in posts" :key="post.id">
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
		</transition-group>
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
	margin: 15px 5% 0 5%;
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


.PostList-transition-item {
	display: inline-block;
	margin-right: 10px;
}

.PostList-transition-enter-active,
.PostList-transition-leave-active {
	transition: all 1s ease;
}

.PostList-transition-enter-from,
.PostList-transition-leave-to {
	opacity: 0;
	transform: translateX(130px);
}
.PostList-transition-move {
  transition: transform 0.8s ease;
}
</style>