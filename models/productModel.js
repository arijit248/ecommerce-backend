const { ObjectId } = require("mongodb");

const getDB = require("../utils/db").getDB;

class Product {
  static productDetails() {
    let db = getDB();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static orderByProductId(id) {
    let db = getDB();
    //   return db
    //     .collection("orders")
    //     .aggregate([
    //       {
    //         $match: {
    //           userId: new ObjectId(id),
    //         },
    //       },
    //     ])
    //     .toArray()
    //     .then((result) => {
    //       console.log(result, "res");
    //       return result;
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    return db
      .collection("orders")
      .aggregate([
        {
          $match: {
            userId: new ObjectId(id), // Match the specific userId
          },
        },
        {
          $unwind: "$products", // Deconstruct the products array
        },
        {
          $lookup: {
            from: "products", // The target collection to join
            localField: "products.productId", // Field from `orders` to match
            foreignField: "_id", // Field from `products` to match
            as: "productDetails", // Output array field with matching documents
          },
        },
        {
          $unwind: "$productDetails", // Unwind the productDetails array
        },
        {
          $group: {
            _id: "$_id", // Group by the order ID
            userId: { $first: "$userId" },
            status: { $first: "$status" },
            totalAmount: { $first: "$totalAmount" },
            products: {
              $push: {
                productId: "$products.productId",
                quantity: "$products.quantity",
                name: "$products.name",
                amount: "$products.amount",
                image: "$productDetails.image", // Include the image field from the lookup
              },
            },
          },
        },
      ])
      .toArray()
      .then((result) => {
        console.log(result, "res");
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
