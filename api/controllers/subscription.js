const CustomerService = require("../services/customer");
const CustomerParameters = require("../services/customer-parameters");
const KeysParameters = require("../constants/keys-parameter");
const SubscriptionService = require("../services/subscription");
const ProductService = require("../services/product");
const PriceService = require("../services/price");

class SubscriptionController {
    static create = async (req, res) => {
        const {
            amount,
            productId,
            dueDate,
            dueSinceDate,
            expirationDate,
            currency,
            interval,
            coupon,
            card,
            customer,
        } = req.body;

        if (!amount) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
            return;
        }

        if (!customer.email) {
            res.status(400).send({
                message: "Content can not be empty!",
            });
            return;
        }

        const findCustomer = await CustomerService.findByEmail(customer.email);
        if (findCustomer && findCustomer.length > 0) {
            res.status(400).send({
                message: "Customer already exists in Subscription!",
            });
            return;
        }

        const findPrice = await PriceService.findByProduct(productId);
        if (!findPrice) {
            res.status(400).send({
                message: "Price is not find!",
            });
            return;
        }

        await SubscriptionService.create({
            amount,
            productId,
            dueDate,
            dueSinceDate,
            expirationDate,
            currency,
            interval,
            coupon,
            card,
            customer,
            priceId: findPrice.id,
        })
            .then((data) => res.send(data))
            .catch((error) =>
                res.status(500).send({
                    message:
                        error.message ||
                        "Some error occurred while creating the Subscription.",
                })
            );
    };

    static findByCustomerId = async (req, res) => {
        const { customerId } = req.body;
        SubscriptionService.findByCustomerId(customerId)
            .then((data) => res.send(data))
            .catch((error) =>
                res.status(500).send({
                    message:
                        error.message ||
                        "Some error occurred while retrieving Subscriptions.",
                })
            );
    };

    static findAll = async (req, res) => {
        SubscriptionService.findAll()
            .then((data) => res.send(data))
            .catch((error) =>
                res.status(500).send({
                    message:
                        error.message ||
                        "Some error occurred while retrieving Subscriptions.",
                })
            );
    };

    static findOne = async (req, res) => {
        const { id } = req.params;

        SubscriptionService.findOne(id)
            .then((data) => {
                res.send(data);
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Error retrieving Subscription with id=" + id,
                });
            });
    };

    static update = async (req, res) => {
        const { id } = req.params;
        const {
            amount,
            productId,
            dueDate,
            dueSinceDate,
            expirationDate,
            currency,
            interval,
            customerId,
            status,
        } = req.body;

        const product = ProductService.findByPk(productId);
        if (!product) {
            res.status(400).send({
                message: "product is not find!",
            });
            return;
        }

        const customer = await CustomerService.findByPk(customerId);
        if (!customer) {
            res.status(400).send({
                message: "customer is not find!",
            });
            return;
        }

        const subscriptionKey = await CustomerParameters.findByCustomerId(
            customerId,
            KeysParameters.STRIPE_SUBSCRIPTION_KEY
        );
        if (!subscriptionKey) {
            res.status(400).send({
                message: "Subscription is not find!",
            });
            return;
        }

        const findPrice = await PriceService.findByProduct(productId);
        if (!findPrice) {
            res.status(400).send({
                message: "Price is not find!",
            });
            return;
        }

        await SubscriptionService.update(
            {
                amount,
                productId,
                dueDate,
                dueSinceDate,
                expirationDate,
                currency,
                interval,
                customerId,
                status,
                priceId: findPrice.id,
            },
            { where: { id: id } }
        )
            .then((data) => {
                if (data == 1) {
                    res.send({
                        message: "Subscription was updated successfully.",
                    });
                } else {
                    res.send({
                        message: `Cannot update Subscription with id=${id}.`,
                    });
                }
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Error updating Subscription with id=" + id,
                });
            });
    };

    static delete = async (req, res) => {
        const { id } = req.params;

        SubscriptionService.delete(id)
            .then((num) => {
                if (num == 1) {
                    res.send({
                        message: "Subscription was deleted successfully!",
                    });
                } else {
                    res.send({
                        message: `Cannot delete Subscription with id=${id}.`,
                    });
                }
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Could not delete Subscription with id=" + id,
                });
            });
    };

    static deleteAll = async (req, res) => {
        SubscriptionService.deleteAll()
            .then((nums) => {
                res.send({
                    message: `${nums} Subscriptions were deleted successfully!`,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message:
                        error.message ||
                        "Some error occurred while removing all Subscriptions.",
                });
            });
    };
}

module.exports = SubscriptionController;
