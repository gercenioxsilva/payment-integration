const StripeProductService = require("../services/stripe/product");
const StripePriceService = require("../services/stripe/price");

class ProductService {
    static findAll = async (currency) => {
        const productsWithPrice = [];
        const products = await StripeProductService.list();

        for (const product of products) {
            let { id } = product;
            const prices = await StripePriceService.list({
                product: id,
                currency: currency || "usd",
            });
            product.prices = prices;
            productsWithPrice.push(product);
        }
        return productsWithPrice;
    };

    static findByPk = async (id) => {
        return await StripeProductService.retrieve(id).then((data) => {
            return data;
        });
    };
}

module.exports = ProductService;
