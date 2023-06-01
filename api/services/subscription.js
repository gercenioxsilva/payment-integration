const database = require("../config/database");
const Subscription = database["subscription"];
const Customer = database["customer"];
const CustomerParameters = database["customer-parameter"];
const KeysParameters = require("../constants/keys-parameter");
const StatusSubscription = require("../constants/status-subscription");
const CustomerStripeService = require("./stripe/customer");
const PriceStripeService = require("./stripe/price");
const PaymentMethodStripeService = require("./stripe/payment-method");
const SubscriptionStripeService = require("./stripe/subscription");
const statusSubscription = require("../constants/status-subscription");
const producer = require("../subscribers/sqs-producer");
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

class SubscriptionService {
    static create = async (subscription) => {
        if (subscription.interval == "year") {
            subscription.dueDate = moment(new Date()).add(1, "Y");
        } else if (subscription.interval == "month") {
            subscription.dueDate = moment(new Date()).add(1, "M");
        }

        subscription.dueSinceDate = new Date();
        subscription.expirationDate = moment(subscription.dueDate).add(1, "D");

        const customerResult = await Customer.create(subscription.customer);
        if (customerResult) {
            const customerStripe = await CustomerStripeService.created(
                subscription.customer
            );
            const parameterCustomer = {
                key: KeysParameters.STRIPE_CUSTOMER_KEY,
                value: customerStripe.id,
                customerId: customerResult.id,
            };
            await CustomerParameters.create(parameterCustomer);
            const paymentMethod = await PaymentMethodStripeService.create(
                subscription.card
            );
            const parameterPayment = {
                key: KeysParameters.STRIPE_PAYMENTMETHOD_KEY,
                value: paymentMethod.id,
                customerId: customerResult.id,
            };

            await CustomerParameters.create(
                parameterPayment,
                customerStripe.id
            );

            await PaymentMethodStripeService.attach(
                paymentMethod.id,
                customerStripe.id
            );

            await CustomerStripeService.update(
                customerStripe.id,
                paymentMethod.id
            );

            const parameterPrice = {
                key: KeysParameters.STRIPE_PRICE_KEY,
                value: subscription.priceId,
                customerId: customerResult.id,
            };

            await CustomerParameters.create(parameterPrice);

            const subscriptionStripe = {
                customer: customerStripe.id,
                items: [{ price: subscription.priceId }],
            };

            const createdSubscription = await SubscriptionStripeService.create(
                subscriptionStripe
            );
            const parameterSubscription = {
                key: KeysParameters.STRIPE_SUBSCRIPTION_KEY,
                value: createdSubscription.id,
                customerId: customerResult.id,
            };
            await CustomerParameters.create(parameterSubscription);
        }

        subscription.status = StatusSubscription.ACTIVED;
        subscription.customerId = customerResult.id;

        return Subscription.create(subscription).then((data) => {
            return data;
        });
    };

    static findByCustomerId = async (customerId) => {
        return Signature.findAll({
            where: {
                customerId: customerId,
            },
            include: [{ model: Customer, attributes: ["id", "name", "email"] }],
        }).then((data) => {
            return data;
        });
    };

    static findAll = async () => {
        return Subscription.findAll({
            include: [{ model: Customer, attributes: ["id", "name", "email"] }],
        }).then((data) => {
            return data;
        });
    };

    static findOne = async (id) => {
        return Subscription.findByPk(id).then((data) => {
            return data;
        });
    };

    static update = async (id, subscription) => {
        if (subscription.status == StatusSubscription.ACTIVED) {
            const customerParameters = await CustomerParameters.findByCustomerId(
                subscription.customerId,
                KeysParameters.STRIPE_PRICE_KEY
            );
            const parameterPrice = {
                key: KeysParameters.STRIPE_PRICE_KEY,
                value: subscription.priceId,
                customerId: subscription.customerId,
            };

            await CustomerParameters.update(
                customerParameters.id,
                parameterPrice
            );

            const subscriptionKey = await CustomerParameters.findByCustomerId(
                subscription.customerId,
                KeysParameters.STRIPE_SUBSCRIPTION_KEY
            );

            const subscriptionStripe = {
                items: [{ price: subscription.priceId }],
            };

            await SubscriptionStripeService.update(
                subscriptionKey.value,
                subscriptionStripe
            );
        } else if (subscription.status == statusSubscription.DISABLED) {
            const subscriptionKey = await CustomerParameters.findByCustomerId(
                subscription.customerId,
                KeysParameters.STRIPE_SUBSCRIPTION_KEY
            );

            await SubscriptionStripeService.cancel(subscriptionKey.value);
        } else if (subscription.status == statusSubscription.SUSPENDED) {
            const subscriptionKey = await CustomerParameters.findByCustomerId(
                subscription.customerId,
                KeysParameters.STRIPE_SUBSCRIPTION_KEY
            );

            await SubscriptionStripeService.cancel(subscriptionKey.value);
        }

        return Subscription.update(subscription, { where: { id: id } }).then(
            (data) => {
                return data;
            }
        );
    };

    static delete = async (id) => {
        return Subscription.destroy({ where: { id: id } }).then((data) => {
            return data;
        });
    };

    static deleteAll = async () => {
        return Subscription.destroy({ where: {}, truncate: false }).then(
            (data) => {
                return data;
            }
        );
    };

    static checkStatusByEmail = async (email) => {
        const customerEntity = await Customer.findOne({
            where: { email: email },
            attributes: ["id", "name", "email"],
            include: [
                {
                    model: Subscription,
                    attributes: [
                        "id",
                        "status",
                        "currency",
                        "productId",
                        "duedate",
                        "duesincedate",
                        "expirationdate",
                        "amount",
                        "interval",
                    ],
                },
            ],
        });
        if (customerEntity) {
            const msg = JSON.stringify(customerEntity);
            try {
                await producer.send([
                    {
                        id: uuidv4(),
                        body: msg,
                        messageAttributes: {
                            id: {
                                DataType: "String",
                                StringValue: "stringValue",
                            },
                            name: {
                                DataType: "String",
                                StringValue: "stringValue",
                            },
                            email: {
                                DataType: "String",
                                StringValue: "stringValue",
                            },
                            subscriptions: {
                                DataType: "String.Array",
                                StringValue: "stringValue",
                            },
                        },
                    },
                ]);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await producer.send([
                    {
                        id: uuidv4(),
                        body: '{"error:"not found"}',
                        messageAttributes: {
                            error: {
                                DataType: "String",
                                StringValue: "stringValue",
                            },
                        },
                    },
                ]);
            } catch (error) {
                console.log(error);
            }
        }
    };
}

module.exports = SubscriptionService;
