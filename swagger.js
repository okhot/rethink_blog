const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Rethink Blog API",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express, MongoDB and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Arrey-Etta Mandela",
        url: "https://github.com/okhot/rethink_blog",
        email: "arreyetta1jnr@gmail.com",
      },
    },
    servers: [
      {
        url: "https://blog-4mll.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
