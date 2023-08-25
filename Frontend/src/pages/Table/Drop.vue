<template>
  <div class="Summary">
    <div class="height">
      <h1>Дроп
			</h1>
    </div>
    <div class="comand">
      <table class="table">
        <tr class="row caption" v-for="row in Drop" :key="row">
          <td class="cell" v-for="cell in row" :key="cell">{{ cell }}</td>
        </tr>
      </table>

			<div style="display: flex; justify-content: space-around;">
			<table class="table">
        <tr class="row caption" v-for="row in IncomeBoss" :key="row">
          <td class="cell" v-for="cell in row" :key="cell">{{ cell }}</td>
        </tr>
      </table>

			<table class="table">
        <tr class="row caption" v-for="row in Expenses" :key="row">
          <td class="cell" v-for="cell in row" :key="cell">{{ cell }}</td>
        </tr>
      </table>
		</div>
    </div>
  </div>
</template>

<script>
import { $autHost, $host } from "@/Http/index";

export default {
  data() {
  return {
    Drop: [],
    IncomeBoss: [],
		Expenses: [],
  };
},

	created() {
    const token = localStorage.getItem('token');
		
		$autHost
      .get('api/table/Drop', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        this.Drop = response.data
      })
      .catch(error => {
        console.log(error);
      });

    $autHost
      .get('api/table/IncomeBoss', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        this.IncomeBoss = response.data
      })
      .catch(error => {
        console.log(error);
      });

			$autHost
      .get('api/table/Expenses', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      .then(response => {
        this.Expenses = response.data
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
  /* overflow-x: auto;  */
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

</style>
