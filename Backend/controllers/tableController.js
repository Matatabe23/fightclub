const ApiError = require('../error/ApiError') // Подключение модуля для обработки ошибок API
const bcrypt = require('bcrypt'); // Подключение модуля bcrypt для шифрования паролей
const { json } = require('body-parser');
const { google } = require('googleapis'); // Подключение модуля googleapis, содержащего Google API-клиент

class tableController {
	async Receiving(req, res) {
		try {
			const spreadsheetId = '18aRH-CBmO6Qot2gw-bIBRud_-kbX-PcIgkFe8W8zNsg';
			const sheetName = 'List1!A:HM';
			const auth = new google.auth.GoogleAuth({
				keyFile: './other/keyfile.json',
				scopes: ['https://www.googleapis.com/auth/spreadsheets']
			});
			const sheets = google.sheets({ version: 'v4', auth });
			sheets.spreadsheets.values.get({
				spreadsheetId,
				range: `${sheetName}`,
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
