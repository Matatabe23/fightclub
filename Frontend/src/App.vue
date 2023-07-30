<template>
	<div class="app" @keydown="myFunction">
		<NavBar></NavBar>
		<router-view></router-view>
	</div>
</template>

<script>
import NavBar from '@/Components/Panels/NavBar'
import { TokenUpdate } from './Http/UserAPI';

export default {
	components: {
		NavBar,
	},
}
</script>

<style>
* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

body {
	background-image: url(Image/BG.png);
	height: 100vh;
	background-repeat: no-repeat;
	background-size: cover;
	background-attachment: fixed;
}
</style>
