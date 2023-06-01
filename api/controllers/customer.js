const CustomerService = require("../services/customer");

class CustomerController {
    static findByEmail = async (req, res) => {
        const { email } = req.params;
        await CustomerService.findByEmail(email)
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

    static findAll = async (req, res) => {
        CustomerService.findAll()
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

        CustomerService.findByPk(id)
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Error retrieving Customer with id=" + id,
                });
            });
    };

    static update = async (req, res) => {
        const { id } = req.params;
        const { name, document, email } = req.body;

        CustomerService.update(id, { name, document, email })
            .then((data) => {
                if (data == 1) {
                    res.send({
                        message: "Customer was updated successfully.",
                    });
                } else {
                    res.send({
                        message: `Cannot update Customer with id=${id}.`,
                    });
                }
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Error updating Customer with id=" + id,
                });
            });
    };

    static delete = async (req, res) => {
        const { id } = req.params;

        CustomerService.update(id)
            .then((data) => {
                if (data == 1) {
                    res.send({
                        message: "Customer was deleted successfully!",
                    });
                } else {
                    data.send({
                        message: `Cannot delete Customer with id=${id}.`,
                    });
                }
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Could not delete Customer with id=" + id,
                });
            });
    };

    static deleteAll = async (req, res) => {
        CustomerService.deleteAll
            .then((data) => {
                res.send({
                    message: `${data} Customers were deleted successfully!`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Some error occurred while removing all Customers.",
                });
            });
    };
}

module.exports = CustomerController;
