const production = false;
const domain = "";

export const API_URL = production ? `http://${domain}` : "http://127.0.0.1:5000";