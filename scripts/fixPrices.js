import mongoose from 'mongoose';
 import Order from '../backend/models/orderModel.js';
;  // adjust path

const runMigration = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/EStore');

    const orders = await Order.find({ "orderItems.price": { $type: "string" } });

    for (let order of orders) {
      order.orderItems = order.orderItems.map(item => ({
        ...item._doc,
        price: Number(item.price),  // convert string → number
      }));
      await order.save();
    }

    console.log(`✅ Migrated ${orders.length} orders`);
    process.exit();
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
};

runMigration();
