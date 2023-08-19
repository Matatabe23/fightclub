<template>
	<div class="Main-post">
		<div class="post">
			<h1 style="text-align: center;">Создать новость</h1>
			<input v-model="post.title" type="text" placeholder="Название новости" />
			<input v-model="post.body" type="text" placeholder="Текст новости" />
			<button @click="$emit('CreatePosts', post)">Опубликовать</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PostForm',
	props:{
		post:{
			type: Object,
			required: true
		}
	}
}
</script>

<style scoped>
.Main-post {
	display: flex;
	justify-content: center;
}

.post {
	display: flex;
	flex-direction: column;
}

.post input {
	padding: 20px;
	width: 100vh;
	margin: 10px 0;
	text-align: center;
	font-size: 20px;
	border-radius: 15px;
}

.post input::placeholder {
	text-align: center;
	font-size: 20px;
}

.post button {
	width: 100%;
	padding: 10px 15px;
	cursor: pointer;
	font-size: 20px;
	margin-top: 10px;
	margin-bottom: 15px;
	border-radius: 15px;
}
</style>