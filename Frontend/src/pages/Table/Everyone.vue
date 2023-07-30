<template>
	<div class="Summary">
		<div class="height">
			<h1>Админ состав</h1>
		</div>
		<div class="comand">
			<div class="table">

				<div class="row caption">
					<div class="cell">Ник</div>
					<div class="cell">Должность</div>
				</div>

				<div class="row caption">
					<div class="cell">Klloun</div>
					<div class="cell">Основатель гильдии</div>
				</div>
			</div>
		</div>

		<div class="height">
			<h1>Офицерский состав</h1>
		</div>
		<div class="comand">
			<div class="table">

				<div class="row caption">
					<div class="cell">Ник</div>
					<div class="cell">Должность</div>
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
	margin-bottom: 70px;
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