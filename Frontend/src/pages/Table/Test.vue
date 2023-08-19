<template>
	<div class="Summary">
		<div class="height">
			<h1>Посещаемость</h1>
		</div>
		<div class="comand">
			<div class="data-table">
				<div class="row caption">
					<div class="cell" v-for="row in 4" style=""></div>
					<div class="cell" v-for="(cell, index) in deta" :key="index">
						{{ cell }}
					</div>
				</div>

			</div>
			<div class="table">
				<div class="row caption" v-for="row in rows" :key="row">
					<div class="cell" v-for="cell in row" :key="cell">{{ cell }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { $autHost, $host } from "@/Http/index";

export default {
	data() {
		return {
			currentMonth: '',
			rows: [],
			deta: []
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
	created() {
		const token = localStorage.getItem('token');
		$autHost.get('api/table/Receiving', {
			headers: {
				Authorization: 'Bearer ' + token
			}
		})
			.then(response => {
				this.rows = response.data.slice(3); // exclude the first three arrays from the received arrays list
				this.deta = response.data[1].filter(function (elem) {
					return elem.trim() !== '';
				});
				console.log(this.deta);

			})
			.catch(error => {
				console.log(error);
			})
	}
};
</script>

<style scoped>
.height h1 {
	text-align: center;
	color: white;
}

.comand {
	font-size: auto;
	/* display: flex; */
	justify-content: center;
	margin-top: 20px;
	text-align: center;
	word-wrap: break-word;

	width: 100%;
	overflow-x: auto;
}
.data-table{
	display: table;
	color: white;
	width: auto;
	table-layout: auto;
}
.table {
	display: table;
	color: white;
	width: auto;
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

.nameBoss-cell {
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
</style>