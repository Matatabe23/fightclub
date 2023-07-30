<template>
	<div class="ClassicButton">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'ClassicButton'
}
</script>

<style scoped>
.ClassicButton {
	border: none;
	background: none;
	color: aliceblue;
	font-size: 20px;
	font-weight: 600;
	box-shadow: 0 0 10px black;
	padding: 10px;
	border-radius: 15px;
	transition: .5s ease;
	cursor: pointer;
}

.ClassicButton:hover {
	box-shadow: 0 0 0 black;
}
</style>