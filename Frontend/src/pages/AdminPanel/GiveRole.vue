<template>
	<AdminPanels></AdminPanels>
		<RoleForm :GiveRole="GiveRole" @OnUPRole="UPRole"/>
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
</template>

<script>
import { $autHost, $host } from "@/Http/index"; // импортируем экземпляры axios для обращения к серверу

export default {
	components: {

	},
	data() {
		return {
			users: [],
			GiveRole: {
				id: '',
				newRole: '',
				roles: ['ADMIN', 'OFFICER', 'FIGHTCLUB', 'INTERN', 'USER']
			},
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

			if (!this.GiveRole.roles.includes(update.newRole)) {
				alert('Выберите роль')
				return;
			}
			$autHost.post('api/user/updateRole', update, {
				headers: {
					Authorization: 'Bearer ' + token
				}
			})
				.then(response => {
					location.reload();
				})
				.catch(error => {
					console.log(error);
				})
		}


	}

}
</script>

<style scoped>
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