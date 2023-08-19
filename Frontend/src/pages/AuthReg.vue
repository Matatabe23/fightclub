<template>
	<div>
		<div class="auth-container">
			<img src="@/Image/FightClub_title.png" alt="Image alt text">

			<div v-if="islogin" class="auth">
				<h2>Авторизация</h2>
				<input v-model="auth.email" type="text" placeholder="Email" @keydown.enter="loginOnEnter">
				<input v-model="auth.password" type="password" placeholder="Пароль" @keydown.enter="loginOnEnter">
				<button id="login" class="enter" @click="login">Войти</button>
				<button class="reg" @click="islogin = false">Регистрация</button>
			</div>

			<div v-if="!islogin" class="auth">
				<h2>Регистрация</h2>
				<input v-model="RegUser.email" type="text" placeholder="Email" @keydown.enter="registerOnEnter">
				<input v-model="RegUser.name" type="text" placeholder="Логин" @keydown.enter="registerOnEnter">
				<input v-model="RegUser.password" type="password" placeholder="Пароль" @keydown.enter="registerOnEnter">
				<input v-model="confirmPassword" type="password" placeholder="Повторение пароля" @keydown.enter="registerOnEnter">
				<button id="registration" class="enter" @click="Registration">Зарегистрироваться</button>
				<button class="reg" @click="islogin = true">Авторизация</button>
			</div>
		</div>
	</div>
</template>

<script>
import { login, registration } from '@/Http/UserAPI'

export default {
	data() {
		return {
			islogin: true,
			auth: {
				email: "",
				password: ""
			},
			RegUser: {
				email: "",
				name: "",
				password: "",
			},
			confirmPassword: "",
		}
	},
	methods: {
		loginOnEnter(event) {
			if (event.keyCode === 13) {
				this.login();
			}
		},
		registerOnEnter(event) {
			if (event.keyCode === 13) {
				this.Registration();
			}
		},
		login() {
			const { email, password } = this.auth;
			const emailTrimmed = email.trim();
			const passwordTrimmed = password.trim();

			if (!emailTrimmed || !passwordTrimmed) {
				alert("Заполните все поля!");
				return;
			}

			const emailLowercased = emailTrimmed.toLowerCase();

			const result = login(emailLowercased, password);
			result.then(response => {
				this.$store.commit("SET_USER_DATA", response);
				// и обновляем доступы кнопок
				this.showSummaryButton = this.$store.getters.showSummaryButton;
				this.showAttendanceButton = this.$store.getters.showAttendanceButton;
				this.showDropButton = this.$store.getters.showDropButton;
				this.showQueueButton = this.$store.getters.showQueueButton;
				this.showAdminPanelButton = this.$store.getters.showAdminPanelButton;

				
				this.$router.push('/Main');
			}).catch(error => {
				console.error(error);
				alert(error.response.data.message);
			});
		},
		Registration() {
			const { email, name, password } = this.RegUser;
			const emailTrimmed = email.trim();
			const nameTrimmed = name.trim();
			const passwordTrimmed = password.trim();
			//Поля пустые?
			if (!emailTrimmed || !nameTrimmed || !passwordTrimmed) {
				alert("Заполните все поля!");
				return;
			}
			//Парали одинаковые?
			if (password !== this.confirmPassword) {
				alert("Пароли не совпадают!");
				return;
			}
			//Пароль имеет 8 и более символов?
			if (password.length < 8) {
				alert("Пароль слишком короткий! Минимум 8 символов");
				return;
			}
			// Отправляем информацию в registration который находиться в UserAPI
			const result = registration(email, name, password);
			result.then(response => {
				alert("Вы успешно зарегистрированы");
				this.islogin = true
			}).catch(error => {
				console.error(error);
				alert('Ошибка!');
			});
		},
	}
}
</script>


<style scoped>
.auth-container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
}

.auth-container img {
	max-width: 100%;
	height: auto;
	margin-bottom: 20px;
	width: 90vh;
}

.auth {
	padding: 20px 70px;
	border-radius: 30px;
}

.auth-container h2 {
	font-size: 24px;
	margin-bottom: 10px;
	text-align: center;
}

.auth-container input[type="text"],
.auth-container input[type="password"] {
	display: block;
	width: 100%;
	margin-bottom: 10px;
	padding: 10px 15px;
	font-size: 16px;
	border: 1px solid #ccc;
	border-radius: 5px;
	box-sizing: border-box;
	box-shadow: 0 0 10px black;
	background-color: #4d516d;
	border: none;
	color: white;
	font-size: 18px;
	border-radius: 15px;
}

.auth-container input[type="text"]::placeholder,
.auth-container input[type="password"]::placeholder {
	color: white;
}

.auth-container input {
	background-color: #4d516d;
}



.auth-container button {
	display: block;
	width: 100%;
	padding: 10px 15px;
	cursor: pointer;
	border-radius: 15px;
}

.enter {
	font-size: 18px;
	font-weight: 600;
	transition: background-color 0.3s ease;
	border: none;
	box-shadow: 0 0 10px black;
}

.enter:hover {
	background-color: gray;
}

.reg {
	border: none;
	background: none;
	font-size: 14px;
	color: white;
}

@media (max-width: 768px) {
	.auth-container {
		padding: 20px;
	}

	.auth-container img {
		width: 70vw;
	}

	.auth {
		padding: 20px;
		border-radius: 20px;
	}
}
</style>