const PriceService = require("../services/price");

class PriceController {
    static findByProduct = async (req, res) => {
        const { id } = req.params;

        await PriceService.findByProduct(id)
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Error retrieving Price with id=" + product,
                });
            });
    };
}

module.exports = PriceController;
