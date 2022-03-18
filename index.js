const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const db = require("./app/model");
const { v4: uuidv4 } = require("uuid");
const Product = db.products;
const Customer = db.customers;
const Brand = db.brands;
const Purchase = db.purcahses;
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to API Test Kalbe." });
});

app.post("/", async (req, res) => {
  const t = await db.sequelize.transaction();

    try {
        const data = await db.purchases.create({
            intSalesOrderID: uuidv4(),
            dtSalesOrder: req.body.date,
            intQty: req.body.qty,
            customersIntCustomerID: req.body.customerID,
            productsIntProductID: req.body.productID
        }, {transaction : t})

        await t.commit();
        return res.status(200).json({
        success: true,
        message: "Purchase add successfully",
        data: data,
        });

    } catch (error) {
        await t.rollback();
        return res.status(500).json({
        success: false,
        message: `Error when trying purchase: ${error}`,
        data: {},
        });

    }
})

app.get("/list", async (req, res) => {
  let page = 0;
    let limit = 10;

    await db.purchases.findAll({
      offset: page,
      limit: limit,
      include: [
          {
              model: Customer,
              as: "customers",
          },
          {
              model: Product,
              as: "products",
          },
      ],
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
})

app.get("/product", async (req, res) => {
  let page = 0;
    let limit = 10;

    await db.products.findAll({
      offset: page,
      limit: limit,
      include: [
          {
              model: Brand,
              as: "brands",
          },
      ],
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
})

app.get("/customer", async (req, res) => {
  let page = 0;
    let limit = 10;

    await db.customers.findAll({
      offset: page,
      limit: limit,
      
  }).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
})

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
