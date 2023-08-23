<template>
	<div class="NavBar" v-show="AuthCheck">
		<a>
			<img src="@/Image/FightClub_title.png" alt="Image alt text">
		</a>
		<ClassicButton @click="$router.push('/Main')">Новости</ClassicButton>
		<ClassicButton class="dropdown">Таблицы
			<div class="dropdown-content">
				<DropButton @click="$router.push('/interpreter')" v-if="showSummaryButton">Посещаемость</DropButton>
				<DropButton @click="$router.push('/Main')" v-if="showAttendanceButton">***</DropButton>
				<DropButton @click="$router.push('/Main')" v-if="showDropButton">***</DropButton>
				<DropButton @click="$router.push('/Main')" v-if="showQueueButton">***</DropButton>
			</div>
		</ClassicButton>
		<ClassicButton @click="$router.push('/Main')">Правила</ClassicButton>
		<ClassicButton class="dropdown">Информация
			<div class="dropdown-content">
				<DropButton>Дискорд</DropButton>
				<DropButton>ТС</DropButton>
				<DropButton>Основаня Информация</DropButton>
			</div>
		</ClassicButton>

		<ClassicButton @click="$router.push('/CreateNew')" v-if="showAdminPanelButton">Админ Панель</ClassicButton>

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
import { mapGetters } from 'vuex';
import { check } from '@/Http/UserAPI';

export default {
	name: 'NavBar',
	data(){
		return{
			isPageRefreshed: false,
			user: '',
		}
	},
	computed: {
		AuthCheck() {
			return this.$route.path !== '/';
		},
		...mapGetters({
			showSummaryButton: 'showSummaryButton',
			showAttendanceButton: 'showAttendanceButton',
			showDropButton: 'showDropButton',
			showQueueButton: 'showQueueButton',
			showAdminPanelButton: 'showAdminPanelButton',
		}),
	},
	mounted() {
		const token = localStorage.getItem('token');
		if (token) {
			check(token).then((Name) => {
				this.user = Name.name;
				this.$store.commit('SET_USER_DATA', Name);
			});
		}
	},
	
	methods: {
		Exit() {
			this.$router.push('/');
			localStorage.removeItem('token');
			this.$store.commit('SET_USER_DATA', null);
		},
	},

};
</script>




<style scoped>
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
