<template>
	<div class="NavBar" v-if="AuthCheck">
		<img src="@/Image/FightClub_title.png" alt="Image alt text">
		<ClassicButton @click="$router.push('/Main')">Новости</ClassicButton>
		<ClassicButton class="dropdown">Таблицы
			<div class="dropdown-content">
				<DropButton @click="$router.push('/Everyone')">Участники</DropButton>
				<DropButton @click="$router.push('/Summary')">Сводка</DropButton>
				<DropButton @click="$router.push('/Attendance')">Посещаемость и зп</DropButton>
				<DropButton @click="$router.push('/Drop')">Дроп</DropButton>
				<DropButton @click="$router.push('/Queue')">Очередь на дроп</DropButton>
			</div>
		</ClassicButton>
		<ClassicButton @click="$router.push('/Rules')">Правила</ClassicButton>
		<ClassicButton class="dropdown">Информация
			<div class="dropdown-content">
				<DropButton>Дискорд</DropButton>
				<DropButton>ТС</DropButton>
				<DropButton>Основаня Информация</DropButton>
			</div>
		</ClassicButton>

		<ClassicButton @click="$router.push('/CreateNew')" v-if="isAdmin">Админ Панель</ClassicButton>

		<div title="Текст всплывающей подсказки" style="float: right;">
			<ClassicButton class="dropdown">{{ user }}
				<div class="dropdown-content">
					<DropButton @click="Exit">Выйти</DropButton>
				</div>
			</ClassicButton>
		</div>
	</div>
</template>

<script>
import { check } from '@/Http/UserAPI'

export default {
	data() {
		return {
			ButtonNavBav: {
				isAdmin: true,
				isOfficer: true,
				isFightClub: true,
				isIntern: true,
			},
			user: '',
		}
	},
	computed: {
		AuthCheck() {
			return this.$route.path !== '/';
		},
	},
	mounted() {
		const token = localStorage.getItem("token");
		if (token) {
			check(token).then((Name) => {
				this.user = Name.name;
			});
		}
	},
	created() {

	},
	methods: {
		Exit() {
			this.$router.push('/');
			alert('вы успешно вышли из аккаунта')
			localStorage.removeItem('token');
		}
	}
}
</script>

<style>
.NavBar {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 90px 0 40px;
}

.NavBar img {
	width: 50vh;
}



.dropdown-content {
	position: absolute;
	display: none;
	min-width: 160px;
	transform: translateX(-31%);
	box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
	z-index: 1;
	margin-top: 10px;
	background-color: black;
	border-radius: 15px;
}


.dropdown:hover .dropdown-content {
	display: block;
}
</style>