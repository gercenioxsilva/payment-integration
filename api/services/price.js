const StripePriceService = require("../services/stripe/price");

class PriceService {

    static findByProduct = async(id) => {
        const prices = await StripePriceService.list();
        if(!prices)
            return null;
               
        return prices.filter(x => x.product == id && x.active == true)[0];
    };
}

module.exports = PriceService;