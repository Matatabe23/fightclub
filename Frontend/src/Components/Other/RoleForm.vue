<template>
	<div class="Giverol">
		<h1>изменить роль</h1>
		<input v-model="GiveRole.id" type="text" placeholder="id пользователя которому надо изменить роль" />
		<select v-model="GiveRole.newRole">
			<option v-for="role in GiveRole.roles" :value="role">{{ role }}</option>
		</select>
		<button @click="$emit('OnUPRole', GiveRole)">Изменить</button>
	</div>
</template>

<script>
export default {
	name: 'RoleForm',
	props: {
		GiveRole: {
			type: Object,
			required: true
		}
	},
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
	border-radius: 15px;
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
	border-radius: 15px;
}


.Giverol button {
	padding: 20px;
	width: 100vh;
	font-size: 20px;
	margin: auto;
	margin-bottom: 15px;
	border-radius: 15px;
}
</style>