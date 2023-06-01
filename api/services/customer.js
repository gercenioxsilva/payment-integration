const database = require("../config/database");
const Customer = database["customer"];
const Subscription = database["subscription"];

class CustomerService {
    static findAll = async () => {
        return Customer.findAll().then((data) => {
            return data;
        });
    };

    static findByPk = async (id) => {
        return Customer.findByPk(id).then((data) => {
            return data;
        });
    };

    static findByEmail = async (email) => {
        return Customer.findOne({
            where: { email: email },
            attributes: ["id", "name", "email"],
            include: [
                {
                    model: Subscription,
                    attributes: [
                        "id",
                        "status",
                        "currency",
                        "productId",
                        "duedate",
                        "duesincedate",
                        "expirationdate",
                        "amount",
                        "interval",
                    ],
                },
            ],
        }).then((data) => {
            return data;
        });
    };

    static update = async (id, user) => {
        return Customer.update(user, { where: { id: id } }).then((data) => {
            return data;
        });
    };

    static delete = async (id) => {
        return Customer.destroy({ where: { id: id } }).then((data) => {
            return data;
        });
    };

    static deleteAll = async () => {
        return Customer.destroy({ where: {}, truncate: false }).then((data) => {
            return data;
        });
    };
}

module.exports = CustomerService;
