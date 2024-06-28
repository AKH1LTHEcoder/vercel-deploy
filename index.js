const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let productPrices = {
  "1": 100, // Product ID: Price
  "2": 200,
};

// Endpoint to receive packed address and return the updated price
app.post('/update', (req, res) => {
  const packedAddress = req.body.packedAddress;
  console.log(`Received packed address: ${packedAddress}`);

  const parts = packedAddress.split("-");
  const productId = parts[3]; // Assuming the 4th part is the Product ID

  const updatedPrice = productPrices[productId] || 0;

  // Send plain text response with the updated price
  res.send(`${updatedPrice}`);
});

// Endpoint to set the price for a specific product
app.post('/set-price', (req, res) => {
  const { productId, price } = req.body;
  productPrices[productId] = price;
  res.send(`Price for product ID ${productId} updated to ${price}`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
