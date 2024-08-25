// constant variables of API endpoint usually just endpoints or url
const url = "http://localhost";
const port = "3000";

module.exports = {
    host: `${url}:${port}`,
    // API endpoints
    api: {
        balance_sheet: "/api.xro/2.0/Reports/BalanceSheet"
    }
};