<template>
	<AdminPanels></AdminPanels>
	<div class="RiveRole">
		<div class="Giverol">
			<h1>изменить роль</h1>
			<input v-model="GiveRole.id" type="text" placeholder="id пользователя которому надо изменить роль" />
			<select v-model="GiveRole.newRole">
				<option v-for="role in roles" :value="role">{{ role }}</option>
			</select>
			<button @click="UPRole">Изменить</button>
		</div>
		<table class="table">
			<thead>
				<tr>
					<th>ID</th>
					<th>Email</th>
					<th>Name</th>
					<th>Role</th>
					<th>Registration Date</th>
					<th>Last Edited</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="user in users" :key="user.id">
					<td>{{ user.id }}</td>
					<td>{{ user.email }}</td>
					<td>{{ user.name }}</td>
					<td>{{ user.role }}</td>
					<td>{{ user.createdAt.replace(/[T|Z]/g, ' ').slice(0, -14) }}</td>
					<td>{{ user.updatedAt.replace(/[T|Z]/g, ' ').slice(0, -14) }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import AdminPanels from "@/Components/Panels/AdminPanels";
import { UserData } from "@/Http/AdminAPI"
import { $autHost, $host } from "@/Http/index"; // импортируем экземпляры axios для обращения к серверу

export default {
	components: {
		AdminPanels,
	},
	data() {
		return {
			users: [],
			GiveRole: {
				id: '',
				newRole: ''
			},
			roles: ['ADMIN', 'OFFICER', 'FIGHTCLUB', 'INTERN', 'USER']
		}
	},
	mounted() {
		const token = localStorage.getItem('token')
		$autHost.get('api/user/UserData', token) // здесь указывается путь к API
			.then(response => {
				this.users = response.data.sort((a, b) => a.id - b.id); // отсортировать по ID от меньшего к большему
			})
			.catch(error => {
				console.log(error);
			})
	},
	methods: {
		UPRole() {
			const token = localStorage.getItem('token');
			const update = this.GiveRole;
			$autHost.post('api/user/updateRole', update, {
				headers: {
					Authorization: 'Bearer ' + token
				}
			})
				.then(response => {
					location.reload(); // отсортировать по ID от меньшего к большему
				})
				.catch(error => {
					console.log(error);
				})
		}

	}

}
</script>

<style scoped>
.Giverol {
	display: flex;
	flex-direction: column;
	justify-content: center;

}

.Giverol h1 {
	text-align: center;
	margin-bottom: 15px;
}

.Giverol input {
	padding: 20px;
	width: 100vh;
	text-align: center;
	font-size: 20px;
	margin: auto;
	margin-bottom: 15px;
}

.Giverol select {
	width: 100vh;
	margin: auto;
	margin-bottom: 15px;
  font-size: 16px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  appearance: none;
	text-align: center;
}


.Giverol button {
	padding: 20px;
	width: 100vh;
	font-size: 20px;
	margin: auto;
	margin-bottom: 15px;
}

.table {
	width: 100%;
	max-width: 900px;
	margin: 0 auto;
	border-collapse: collapse;
	border-spacing: 0;
}

.table th,
.table td {
	padding: 0.75rem;
	vertical-align: top;
	text-align: left;
	color: white;
}

.table th {
	font-weight: 700;
}

.table tbody tr {
	border: 2px solid black;
}
</style>