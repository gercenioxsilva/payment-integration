const CouponsService = require("../services/coupons");

class CouponsController {
    static findAll = async (req, res) => {
        CouponsService.findAll()
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Some error occurred while creating the Customer.",
                });
            });
    };

    static findOne = async (req, res) => {
        const { id } = req.params;

        CouponsService.findPk(id)
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

module.exports = CouponsController;
