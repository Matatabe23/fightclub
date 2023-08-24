const ApiError = require('../error/ApiError') // Подключение модуля для обработки ошибок API
const bcrypt = require('bcrypt'); // Подключение модуля bcrypt для шифрования паролей
const { json } = require('body-parser');
const { google } = require('googleapis'); // Подключение модуля googleapis, содержащего Google API-клиент

class tableController {
	
	//Посещаемость
	async Interpreter(req, res) {
		try {
			const spreadsheetId = process.env.TABLE_ID;
			const sheetName = 'Interpreter';
			const auth = new google.auth.GoogleAuth({
				keyFile: './other/keyfile.json',
				scopes: ['https://www.googleapis.com/auth/spreadsheets']
			});
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				spreadsheetId,
				range: `${sheetName}!A:HR`,
			}, (err, response) => {
				if (err) return console.log(`The API returned an error: ${err}`);
				const rows = response.data.values;
				res.send(rows);
			});
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}



	//Дроп
	async Drop(req, res) {
		try {
			const spreadsheetId = process.env.TABLE_ID;
			const sheetName = 'Drop';
			const auth = new google.auth.GoogleAuth({
				keyFile: './other/keyfile.json',
				scopes: ['https://www.googleapis.com/auth/spreadsheets']
			});
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				spreadsheetId,
				range: `${sheetName}!A:L`,
			}, (err, response) => {
				if (err) return console.log(`The API returned an error: ${err}`);
				const rows = response.data.values;
				res.send(rows);
			});
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}

	//Доход с боссов   Таблица расходов гильдии
	async IncomeBoss(req, res) {
		try {
			const spreadsheetId = process.env.TABLE_ID;
			const sheetName = 'Drop';
			const auth = new google.auth.GoogleAuth({
				keyFile: './other/keyfile.json',
				scopes: ['https://www.googleapis.com/auth/spreadsheets']
			});
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				spreadsheetId,
				range: `${sheetName}!N:O`,
			}, (err, response) => {
				if (err) return console.log(`The API returned an error: ${err}`);
				const rows = response.data.values;
				res.send(rows);
			});
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}

	// Таблица расходов гильдии
	async Expenses(req, res) {
		try {
			const spreadsheetId = process.env.TABLE_ID;
			const sheetName = 'Drop';
			const auth = new google.auth.GoogleAuth({
				keyFile: './other/keyfile.json',
				scopes: ['https://www.googleapis.com/auth/spreadsheets']
			});
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				spreadsheetId,
				range: `${sheetName}!Q:T`,
			}, (err, response) => {
				if (err) return console.log(`The API returned an error: ${err}`);
				const rows = response.data.values;
				res.send(rows);
			});
		} catch (error) {
			console.error(error);
			res.status(500).send('Server Error');
		}
	}
}




module.exports = new tableController(); // Экспорт созданного экземпляра класса tableController для использования в других модулях
