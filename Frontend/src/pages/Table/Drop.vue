<template>
	<div class="Summary">
		<div class="height">
			<h1>Дроп</h1>
		</div>
		<div class="comand">
			<div class="table">

				<div class="row caption">
					<div class="cell">Наборы</div>
					<div class="cell">Игрок</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

</script>

<style scoped>
.comand {
	font-size: auto;
	display: flex;
	justify-content: center;
	margin-top: 20px;
	text-align: center;
	word-wrap: break-word
}

.table {
	display: table;
	color: white;
	width: 700px;
	table-layout: fixed;
}

.row {
	display: table-row;
}

.cell {
	display: table-cell;
	border: 2px solid black;
	box-shadow: 0 0 10px black;
	padding: 15px;
}

.caption {
	font-weight: bold;
}

.height h1{
	text-align: center;
	color: white;
}
</style>