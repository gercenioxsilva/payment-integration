const database = require("../config/database");
const Webhook = database["webhook"];

class WebHookService {
    static create = async (webhook) => {
        const wh = {
            payload: JSON.stringify(webhook),
        };
        return Webhook.create(wh).then((data) => {
            return data;
        });
    };
}

module.exports = WebHookService;
