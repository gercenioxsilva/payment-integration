const StripeCouponsService = require("../services/stripe/coupons");

class CouponsService {

    static findAll = async() => {
        return await StripeCouponsService.list().then((data) => {
            return data;
        });
    };

    static findPk = async(id) => {
        return await StripeCouponsService.retrieve(id).then((data) => {
            return data;
        });
    };

};

module.exports = CouponsService;
