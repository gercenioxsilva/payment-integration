const PaymentsService = require("../services/payments");

class PaymentsController {

    static Create = async (req, res) => {
        const { request } = req.params;
        await PaymentsService.create(request)
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Some error occurred while creating the Payment.",
                });
            });
    };
}
