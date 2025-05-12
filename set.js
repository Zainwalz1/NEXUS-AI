




const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0dZb21WVEg1YVQycitRZFJGQmRmeEppZnpVZkpQRjdBOGRFK2VZWUZHcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTHhObzhoL21KZVZqN2VzUGh3TjFjYlhFVUllY25tbSszZ0FQNDZSTU5RQT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTEhWTllaRWpnZXFQakxFeE5QVkRyYk9rTjhvTFE1Ymptc043Rm1VU24wPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5aDJ2UWtlbnl1S2tML1NpNnI5NlpyMEFrcUhsMjNYeFd3ZWE0WEV6bHhBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1LaUJZc1dkVDBOOTkyK0l3Q1RTa3VDRlpzNzdDUEpxNnBZVGQxTXNjR0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ6VW94R0FtUm9aZ0Rvd0dmQmFBRXFFaHZXVk9NQk9pMnZJZkF4VHlrQ1U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkhPc3VwZkxuU2V2ZUZ6dkRJY2pyekg0Q1FQcUxHZFlBS0dGc3RCZVJrWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMi9RY3I3RWxBWFpZb0dmUmFCcFJTVHFnSDNXejBCeWdDVFhkWjJPZm93ST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im85STg4NEppbUtCRGlvdndEdGJYR01URFZid2QzTzZKR2E1VjlmVGN1YzF2RVg0NzA1TDZzV09WSjNxOExOMlgyY1VmVnM3dEdoWWR6M3JYYmhpTmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAyLCJhZHZTZWNyZXRLZXkiOiJYeFJJSnBuejllQ1JkazR5M1F6djZNSnZwR1phbklvbHJUQlhaM3dramhvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5UE13aGxNM1JjbWtzazBqTmxHLUh3IiwicGhvbmVJZCI6IjhmZjE2YjBiLThlZWMtNGFlNC05MDQwLTg2YjBiOGMyNWJhYyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPWm53Y1pXcWkyaGZHbElCRG5Fcm1ScjNJV009In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTi9mNlNMRmxzeXVWVDFkWE4zNURKaVR3dTNRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJEMTNEWlg3IiwibWUiOnsiaWQiOiIyNjM3NzYwMzAzNTk6NTJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ00vWCtzZ0ZFTzZGaU1FR0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InFtRkZsT2xqUTNMeUZGdGQ0azlUd1VhMk9ka0VkdU1ZRTQvRCtyU2dhM1k9IiwiYWNjb3VudFNpZ25hdHVyZSI6InhiL3JwZHVYaXN1V1FzVy9UQTRwRWpaUldmeXN4cVlXcWU0dVFLSkxRMzV3TmNiL201b0dSOWsrczRhSVVDTkNDUjNTR0pPWEcyUnQyZktXa3VHbkNBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI5d0hrbFo0YWxZZnFFby9VQzhoL1gySDZ1Z2FXcDhXN214VElzdXUwTnVqeGZablRLTGlNM3dHVmU1Ujd4Nk1sbzc5cE5UaGFja0NiOTBvSlg1c25qUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2Mzc3NjAzMDM1OTo1MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJhcGhSWlRwWTBOeThoUmJYZUpQVThGR3RqblpCSGJqR0JPUHcvcTBvR3QyIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQ3MDU5NDUyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQURreiJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "263776030359",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "walz",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTICALL : process.env.ANTICALL || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'yes',
                  CHATBOT : process.env.CHATBOT || "yes",
                  AUTO_BIO : process.env.AUTO_BIO || "yes",
                  AUTO_REACT : process.env.AUTO_REACT || "yes",
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
