<template>
	<AdminPanels></AdminPanels>
	<div class="CreateNew">
		<div class="Main-post">
			<div class="post">
				<h1 style="text-align: center;">Создать новость</h1>
				<input v-model="post.title" type="text" placeholder="Название новости" />
				<input v-model="post.body" type="text" placeholder="Текст новости" />
				<button @click="Submit">Опубликовать</button>
			</div>
		</div>
		<div>
			<h1 style="text-align: center;">список новостей</h1>
			<div class="posts" v-for="post in posts">
				<div><strong>Дата:</strong> {{ post.createdAt.replace(/[T|Z]/g, ' ').slice(0, -14) }}</div>
				<div><strong>Название:</strong> {{ post.title }}</div>
				<div><strong>Описание:</strong> {{ post.body }}</div>
				<div><strong>Автор:</strong> {{ post.ADnameName  }}({{ post.ADnameRole }})</div>
			</div>
		</div>
	</div>
</template>

<script>
import AdminPanels from "@/Components/Panels/AdminPanels";
import { Posts } from '@/Http/AdminAPI'
import { check } from "@/Http/UserAPI";
import { $autHost, $host  } from "@/Http/index"; // импортируем экземпляры axios для обращения к серверу


export default {
	components: {
		AdminPanels,
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
			$host.get('api/posts/receive') // здесь указывается путь к API
			.then(response => {
				this.posts = response.data.reverse(); // здесь полученные данные помещаются в posts
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
		Submit() {
			const posts = this.post;
			Posts(posts) // Вызываем функцию Posts и передаем туда данные
				.then((posts) => {
					// Очищаем поля формы
					this.post.title = "";
					this.post.body = "";
					this.post.ADname = "";
					location.reload();
				})
				.catch((err) => console.log(err)); // Ловим и логируем ошибку, если отправка не удалась
		},
	},
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
}


.posts {
	border-radius: 15px;
	background-color: #4d516d;
	margin: 0 5%;
	margin-top: 15px;
	margin-bottom: 20px;
	box-shadow: 0 0 10px black;
}
.posts div {
	padding: 10px;
	color: white;
}

.posts strong {
	color: #000000;
}
</style>