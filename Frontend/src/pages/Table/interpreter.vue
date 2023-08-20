<template>
  <div class="Summary">
    <div class="height">
      <h1>Посещаемость</h1>
    </div>
    <div class="comand">
      <table class="table">
        <tr class="row caption">
          <td class="none-cell" v-for="row in 4"></td>
          <td class="data-cell" v-for="(cell) in deta" :key="cell">{{ cell }}</td>
        </tr>

        <tr class="row caption" v-for="row in rows" :key="row">
          <td class="cell" v-for="cell in row" :key="cell">{{ cell }}</td>
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
        this.rows = response.data.slice(3);
        this.deta = response.data[1];
        console.log(this.deta);
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
  margin-top: 20px;
  text-align: center;
  word-wrap: break-word;
  overflow-x: auto; 
}

.table {
  display: table;
  color: white;
  table-layout: fixed;
	border-collapse: collapse;
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
  padding: 5px;
}
.data-cell:nth-child(n):nth-child(7n) {
  border-right: 4px solid black;
}

</style>
