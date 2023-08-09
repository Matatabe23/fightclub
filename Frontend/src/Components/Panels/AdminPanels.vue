<template>
	<div class="AdminPanels" >
		<ClassicButton @click="$router.push('/CreateNew')">Создать новость</ClassicButton>
		<ClassicButton @click="$router.push('/GiveRole')">Выдача ролей</ClassicButton>
	</div>
</template>

<script>


export default{
	name: 'AdminPanels'
}
</script>

<style>
.AdminPanels {
	display: flex;
	justify-content: space-between;
	margin: 0 100px 50px 100px;
}



</style>