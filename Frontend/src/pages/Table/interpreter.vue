<template>
  <div class="Summary">
    <div class="height">
      <h1>Посещаемость</h1>
    </div>
    <div class="comand">
      <table class="table">
        <tr class="row caption">
					<td class="none-cell" style="border-left: 4px solid black; background-color: green;"></td>
          <td class="none-cell" style="background-color: green;" v-for="row in 3"></td>
          <td class="data-cell" style="background-color: green;" v-for="(cell) in deta" :key="cell" :class="{ 'empty-cell': cell === '' }">{{ cell }}</td>
					<td class="data-cell" style="border-right: 4px solid black; background-color: green;"></td>
        </tr>
				<tr class="row caption">
          <td class="cell" v-for="(cell) in boss" :key="cell" style="background-color: green;" :class="{ 'empty-cell': cell === '' }">{{ cell }}</td>
        </tr>
				<tr class="row caption">
          <td class="cell" v-for="(cell) in percent" :key="cell" style="background-color: rgb(187, 137, 36);" :class="{ 'empty-cell': cell === '' }">{{ cell }}</td>
        </tr>
				<tr class="row caption">
          <td class="cell" v-for="(cell) in numBoss" :key="cell" style="background-color: rgb(187, 137, 36);" :class="{ 'empty-cell': cell === '' }">{{ cell }}</td>
        </tr>
				<tr class="row caption">
          <td class="cell" v-for="(cell) in online" :key="cell" style="background-color: rgb(187, 137, 36);" :class="{ 'empty-cell': cell === '' }">{{ cell }}</td>
        </tr>

        <tr class="row caption" v-for="row in rows" :key="row">
          <td class="cell" v-for="cell in row" :key="cell" :class="{ 'empty-cell': cell === '' }">{{ cell }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { $autHost, $host } from "@/Http/index";

export default {
  data() {
    return {
      deta: [],
			boss: [],
			percent: [],
			numBoss: [],
			online: [],
      rows: [],
    };
  },
  created() {
    const token = localStorage.getItem('token');
    $autHost
      .get('api/table/interpreter', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        this.deta = response.data[1];
				this.boss = response.data[3];
				this.percent = response.data[4];
				this.numBoss = response.data[5];
				this.online = response.data[6];
        this.rows = response.data.slice(7);
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.height h1 {
  text-align: center;
  color: white;
}

.comand {
  font-size: 15px;
  text-align: center;
  word-wrap: break-word;
  overflow-x: auto; 
  margin: 30px 100px 0 100px;
}

.table {
  display: table;
  color: white;
  table-layout: fixed;
  border-collapse: collapse;
  margin-bottom: 50px;
}

.row {
  display: table-row;
}

.caption {
  font-weight: bold;
}

.cell {
  display: table-cell;
  border: 4px solid black;
  padding: 10px;
}

.none-cell {
  display: table-cell;
  border: none;
	border-top: 4px solid black;
  padding: 5px;
}
.data-cell{
	border-top: 4px solid black;
	border-bottom: 4px solid black;
	padding: 15px 0;
}
.data-cell:nth-child(2) {
  position: sticky;
  left: 0;
}

.data-cell:nth-child(n):nth-child(7n),
.cell:nth-child(n):nth-child(7n) {
  border-right: 4px solid red;
}

.caption td:nth-child(-n+2) {
  position: sticky;
  left: 0;
  z-index: 1;
	background-color: #663192;
}

.caption td.none-cell {
  background-color: transparent;
}

.empty-cell {
	padding: 0 30px;
}


</style>
