const fastify = require("fastify");
const app = fastify();
require("dotenv").config();
/*
(async () => {
    const database = require("./api/config/database");
    try {
        await database.sequelize.sync();
    } catch (error) {
        console.log(error);
    }

    const consumer = require("./api/subscribers/sqs-consumer");
    consumer.start();
})();*/
/*
app.register(require("fastify-jwt"), {
    secret: process.env.JWT_KEY,
});



app.decorate("authenticate", async function (request, reply) {
    try {
        await request.jwtVerify();
    } catch (err) {
        reply.send(err);
    }
});*/

app.register(require("fastify-cors"), {
    origin: "*",
    methods: ["POST", "GET", "PUT", "DELETE"],
});

app.register(require("fastify-swagger"), {
    routePrefix: "/swagger",
    swagger: {
        info: {
            title: "MEECC Swagger API",
            description: "Fastify Swagger API",
            version: "0.1.0",
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here",
        },
        consumes: ["application/json"],
        produces: ["application/json"],
        
    },
    exposeRoute: true,
   
});

// routes
require("./api/routes/customer")(app);
require("./api/routes/product")(app);
//require("./api/routes/subscription")(app);
require("./api/routes/webhook")(app);
require("./api/routes/coupons")(app);
require("./api/routes/price")(app);

app.listen(process.env.APP_PORT, () =>
    console.log(`Fastify Rest API listening on port ${process.env.APP_PORT}!`)
);
