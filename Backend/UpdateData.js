const { google } = require('googleapis');
const { User } = require('./models/models')

function UpdateData() {
	const auth = new google.auth.GoogleAuth({
		keyFile: './other/keyfile.json',
		scopes: ['https://www.googleapis.com/auth/spreadsheets']
	});
	const sheets = google.sheets({ version: 'v4', auth });



	// Функция для удаления всех данных из таблицы
	async function clearSheet(spreadsheetId, sheetName) {
		try {
			await sheets.spreadsheets.values.clear({
				spreadsheetId,
				range: `${sheetName}!A2:Z`,
			});
			console.log('Данные успешно удалены из таблицы.');
		} catch (error) {
			console.error('Ошибка при удалении данных из таблицы:', error);
		}
	}

	// Функция для сохранения новых данных в таблицу
	async function saveDataToSheet(spreadsheetId, sheetName, data) {
		try {
			await sheets.spreadsheets.values.append({
				spreadsheetId,
				range: `${sheetName}!A2:Z`,
				valueInputOption: 'RAW',
				resource: {
					values: data,
				},
			});
			console.log('Данные успешно сохранены в таблицу.');
		} catch (error) {
			console.error('Ошибка при сохранении данных в таблицу:', error);
		}
	}
	// Пример использования функций
	async function UpdateData() {
		const spreadsheetId = process.env.TABLE_ID;
		const sheetName = 'User';

		// Удаление всех данных из таблицы
		await clearSheet(spreadsheetId, sheetName);

		const users = await User.findAll();
		// Создание массива для хранения данных
		const data = [];
		// Итерация по каждому пользователю
		users.forEach(user => {
			// Создание массива для текущего пользователя
			const userData = [
				user.id,
				user.email,
				user.name,
				user.role,
				user.createdAt,
			];
			// Добавление массива пользователя в общий массив данных
			data.push(userData);
		});

		// Сохранение новых данных в таблицу
		await saveDataToSheet(spreadsheetId, sheetName, data);
	}
	UpdateData()
}

module.exports = {
	UpdateData
};

setInterval(UpdateData, 60000);
