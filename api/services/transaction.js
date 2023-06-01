const database = require("../config/database");
const Transaction = database["transaction"];

class TransactionService {
    static create = async (transaction) => {
        return Transaction.create(transaction).then((data) => {
            return data;
        });
    };
}

module.exports = TransactionService;
