const { google } = require('googleapis');

function GoogleTableAuth() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './other/keyfile.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  const sheets = google.sheets({ version: 'v4', auth });

  return sheets;
}

module.exports = {
  GoogleTableAuth
};
