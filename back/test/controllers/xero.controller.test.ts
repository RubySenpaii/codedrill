const xeroController = require('../../src/controllers/xero');

test("return a status 200 with balance sheet data", async () => {
    const result = await xeroController.get_balance_sheet();
    expect(result.status).toBe(200);
    expect(result.message.length).toBeGreaterThan(0);
});