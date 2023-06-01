const ProductService = require("../services/product");

class ProductController {
    static findAll = async (req, res) => {
        const { currency } = req.query;

        ProductService.findAll(currency)
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Some error occurred while retrieving Products.",
                });
            });
    };

    static findOne = async (req, res) => {
        const { id } = req.params;

        ProductService.findByPk(id)
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Error retrieving Product with id=" + id,
                });
            });
    };
}

module.exports = ProductController;
