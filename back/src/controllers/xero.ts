const axios = require("axios").default;
const xero_config = require("../config/xero.config");

async function get_balance_sheet() {
    try {
        const response = await axios.get(`${xero_config.host}${xero_config.api.balance_sheet}`);
        if (response.status == 200) {
            const data = [];
            // parse data to only contain relevant information to produce balance sheet
            response.data.Reports.forEach(report => {
                const headers = [], sections = [];
                report.Rows.forEach(row => {
                    if (row.RowType == 'Header') {
                        row.Cells.forEach(cell => {
                            headers.push(cell.Value);
                        });
                    } else if (row.RowType == 'Section') {
                        const x = [];
                        row.Rows.forEach(innerRow => {
                            const rowValues = {
                                Title: String,
                                Values: []
                            };
                            innerRow.Cells.forEach((cell, i) => {
                                if (i == 0) rowValues.Title = cell.Value
                                else rowValues.Values.push(cell.Value)
                            });
                            x.push(rowValues);
                        });
                        sections.push({
                            Title: row.Title,
                            Values: x
                        });
                    }
                });
                const result = {
                    ReportName: report.ReportName,
                    ReportTitle: report.ReportTitles,
                    ReportDate: report.ReportDate,
                    Headers: headers,
                    Sections: sections
                }
                data.push(result);
            });
            console.log(JSON.stringify(data))
            return { status: 200, message: data };
        } else {
            // if server does not respond or is unreachable
            console.error(response);
            return { status: 500, message: "Internal Server Error" }
        }
    } catch (error) {
        console.error(error.message);
        return { status: 500, message: "Internal Server Error" }
    }
};

module.exports = {
    get_balance_sheet
};