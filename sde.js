// SDEs
lpTag.sdes = [];

// Cart info
lpTag.sdes.push({
  type: "purchase", //MANDATORY
  total: 15, //TOTAL VALUE OF THE TRANSACTION AFTER DISCOUNT
  currency: "USD", //CURRENCY CODE
  orderId: "DRV1534XC", //UNIQUE ORDER ID OR RECEIPT ID
  cart: {
    products: [
      {
        product: {
          name: "Dune (BlueRay)", //PRODUCT NAME
          category: "DVD", //PRODUCT CATEGORY NAME
          sku: "xyz001", //PRODUCT SKU OR UNIQUE IDENTIFIER
          price: 5, //SINGLE PRODUCT PRICE
        },
        quantity: 3, //QUANTITY OF THIS PRODUCT
      },
    ],
  },
});

// Site title
lpTag.sdes.push({
  type: "mrktInfo", //MANDATORY
  info: {
    channel: 0, //ORIGINATING CHANNEL ENUM:
    affiliate: "LP Brand authenticated", //AFFILIATE NAME
    campaignId: "LP Brand Campaign", //EXTERNAL ORIGINATING CAMPAIGN
  },
});

// Section
// lpTag.section = ["LP Brand authenticated"];
