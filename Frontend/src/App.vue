<template>
	<div class="app" @keydown="myFunction">
		<TheLoadingComponent/>
		<NavBar/>
		<router-view/>
	</div>
</template>

<script>
export default {
	
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	scroll-behavior: smooth;
}

body {
	background-image: url(Image/BG.png);
	height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
}
</style>
