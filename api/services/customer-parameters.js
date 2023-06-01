const database = require("../config/database");
const CustomerParameters = database["customer-parameter"];

class CustomerParametersService {
    static findByCustomerId = async (customerId, key) => {
        return CustomerParameters.findAll({
            where: {
                customerId: customerId,
                key: key,
            },
        }).then((data) => {
            return data;
        });
    };

    static update = async (id, parameters) => {
        return CustomerParameters.update(parameters, {
            where: {
                id: id,
            },
        }).then((data) => {
            return data;
        });
    };
}

module.exports = CustomerParametersService;
