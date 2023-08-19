<template>
	<div class="Summary">
		<div class="height">
			<h1>Посещаемость</h1>
		</div>
		<div class="comand">
			<div class="table">

				<div class="row caption">
					<div class="none-cell"></div>
					<div class="none-cell"></div>
					<div class="none-cell"></div>
					<div class="data-cell" v-for="n in 31" :key="n">{{ n }} {{ currentMonth }}</div>

				</div>

				<div class="row caption">
					<div class="none-cell" v-for="n in 2" :key="n"></div>
					<div class="none-cell">{{ 'Имя босса ->' }}</div>
					<div class="nameBoss-cell" v-for="n in 31">
						<div class="part">Левиафан</div>
						<div class="part">Кракен</div>
						<div class="part">Ксанатос</div>
						<div class="part">Марли</div>
						<div class="part">Анталон</div>
						<div class="part">Барага безумный</div>
					</div>
				</div>

				<div class="row caption">
					<div class="none-cell" v-for="n in 2" :key="n"></div>
					<div class="none-cell">{{ 'Число боссов ->' }}</div>
					<div class="cell" v-for="n in 31">
						<div class="part">1</div>
						<div class="part">1</div>
						<div class="part">1</div>
						<div class="part">1</div>
						<div class="part">1</div>
						<div class="part">1</div>
					</div>
				</div>

				<div class="row caption">
					<div class="none-cell" v-for="n in 2" :key="n"></div>
					<div class="none-cell">{{ 'Процент посещаемости ->' }}</div>
					<div class="cell" v-for="n in 31">
						<div class="part">%</div>
						<div class="part">%</div>
						<div class="part">%</div>
						<div class="part">%</div>
						<div class="part">%</div>
						<div class="part">%</div>
					</div>
				</div>

				<div class="row caption">
					<div class="cell">Ник</div>
					<div class="cell">ГС</div>
					<div class="cell">Онлайн</div>
					<div class="cell" v-for="n in 31">
						<div class="part">1</div>
						<div class="part">1</div>
						<div class="part">1</div>
						<div class="part">1</div>
						<div class="part">1</div>
						<div class="part">1</div>
					</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			currentMonth: '',
		};
	},
	mounted() {
		const date = new Date();
		this.currentMonth = date.toLocaleString('default', { month: 'long' });

		const cells = document.querySelectorAll('.data-cell');
		cells.forEach(cell => {
			cell.textContent = `${date.getDate()} ${this.currentMonth}`;
		});
	},
};
</script>

<style scoped>
.height h1 {
	text-align: center;
	color: white;
}
.comand {
	font-size: auto;
	display: flex;
	justify-content: center;
	margin-top: 20px;
	text-align: center;
	word-wrap: break-word;

	width: 100%;
	overflow-x: auto;
}

.table {
	display: table;
	color: white;
	width: 7500px;
	table-layout: fixed;
}

.row {
	display: table-row;
}
.caption {
	font-weight: bold;
}

.cell {
	display: table-cell;
	border: 2px solid black;
	box-shadow: 0 0 10px black;
	padding: 15px;
}
.data-cell {
	display: table-cell;
	border: 2px solid black;
	box-shadow: 0 0 10px black;
	padding: 15px;
}
.nameBoss-cell{
	display: table-cell;
	border: 2px solid black;
	box-shadow: 0 0 10px black;
	padding: 15px;
	writing-mode: vertical-rl;
  text-orientation: upright;
}
.none-cell {
	display: table-cell;
	border: none;
	padding: 5px;
}

.part {
  width: 16.666%;
  height: 100%;
  display: inline-block;
  border-right: 1px solid black;

}
.part:last-child {
  border-right: none;
}
</style>