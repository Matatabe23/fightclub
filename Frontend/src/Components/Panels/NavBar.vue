<template>
	<div class="NavBar" v-show="AuthCheck">
		<!-- Новости -->
		<ClassicButton @click="$router.push('/Main')">Новости</ClassicButton>

		<!-- Зарплатная система -->
		<ClassicButton class="dropdown">Зарплатная система FightClub
			<div class="dropdown-content">
				<DropButton @click="$router.push('/interpreter')" v-if="Showinterpreter">Посещаемость</DropButton>
				<DropButton @click="$router.push('/Drop')" v-if="showDrop">Дроп</DropButton>
			</div>
		</ClassicButton>

		<!-- кураторы классов -->
		<ClassicButton class="dropdown">Кураторы классов
			<div class="dropdown-content">
				<DropButton @click="$router.push('/Main')">Хил</DropButton>
				<DropButton @click="$router.push('/Main')">Танк</DropButton>
				<DropButton @click="$router.push('/Main')">Маг</DropButton>
				<DropButton @click="$router.push('/Main')">Милик</DropButton>
				<DropButton @click="$router.push('/Main')">Лук</DropButton>
			</div>
		</ClassicButton>

		<!-- Инструменты -->
		<ClassicButton class="dropdown">Инструменты
			<div class="dropdown-content">
				<DropButton @click="$router.push('/Main')">Голосовалка</DropButton>
				<DropButton @click="$router.push('/Main')">Ролл(Бросок кубиков)</DropButton>
			</div>
		</ClassicButton>

		<!-- Полезные ссылки -->
		<ClassicButton class="dropdown">Полезные ссылки
			<div class="dropdown-content">
				<DropButton @click="$router.push('/Main')">Правила</DropButton>
				<DropButton @click="$router.push('/Main')">Жалобы</DropButton>
				<DropButton @click="$router.push('/Main')">Заявка в PC</DropButton>
			</div>
		</ClassicButton>

		<!-- админ панель -->
		<ClassicButton class="dropdown" v-if="showAdminPanelButton">Админ Панель
			<div class="dropdown-content">
				<DropButton @click="$router.push('/CreateNew')">Создать новость</DropButton>
				<DropButton @click="$router.push('/GiveRole')">Выдача ролей</DropButton>
			</div>
		</ClassicButton>

		<!-- Информация об игроке -->
		<ClassicButton class="dropdown">{{ $store.state.navbar.userData.name }}
			<div class="dropdown-content">
				<DropButton>Личный кабинет</DropButton>
				<DropButton @click="Exit">Выйти</DropButton>
			</div>
		</ClassicButton>
	</div>
</template>




<script>
import { mapGetters } from 'vuex';
import { check } from '@/Http/UserAPI';

export default {
	name: 'NavBar',
	data() {
		return {

		}
	},
	computed: {
		AuthCheck() {
			return this.$route.path !== '/';
		},
		...mapGetters({
			Showinterpreter: 'Showinterpreter',
			showDrop: 'showDrop',
			showAdminPanelButton: 'showAdminPanelButton',
		}),
	},
	mounted() {
		const token = localStorage.getItem('token');
		if (token) {
			check(token).then((response) => {
				this.$store.commit('SET_USER_DATA', response);
			});
		}
	},

	methods: {
		Exit() {
			this.$router.push('/');
			localStorage.removeItem('token');
			this.$store.commit('SET_USER_DATA', '');
		},
	},

};
</script>




<style scoped>
.NavBar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 3% 90px 3% 40px;
}

.NavBar img {
	width: 30vh;
}

.dropdown-content {
	position: absolute;
	display: none;
	min-width: 160px;
	left: 50%;
	transform: translateX(-50%);
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	margin-top: 10px;
	background-color: black;
	border-radius: 15px;
}

.dropdown {
	position: relative;
}

.dropdown:hover .dropdown-content {
	display: block;

}

.NavBar:first-child {
  animation: fadeIn 1s ease-in-out;
}
</style>
