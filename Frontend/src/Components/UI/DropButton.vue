<template>
	<div class="ClassicButton">
		<slot></slot>
	</div>
</template>

<script>
export default{
	name: 'DropButton'
}
</script>

<style scoped>
.ClassicButton {
	border: none;
	background: none;
	color: aliceblue;
	font-size: 20px;
	font-weight: 600;
	transition: .5s ease;
	cursor: pointer;

	padding: 12px 16px;
  text-decoration: none;
  display: block;
	border-radius: 15px;
	transition: background-color 0.3s ease;
}

.ClassicButton:hover{
	background-color: gray;
}
</style>