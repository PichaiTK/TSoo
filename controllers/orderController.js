// server/controllers/orderController.js
const Order = require("../models/Order");
const Product = require("../models/Product");
const Notification = require("../models/Notification");

exports.createOrder = async (req, res) => {
  const { items, paymentMethod, customer, channel } = req.body;

  let total = 0;
  const orderItems = [];

  for (let item of items) {
    const product = await Product.findById(item.productId);
    if (!product) continue;

    const lineTotal = product.price * item.qty;
    total += lineTotal;
    product.stock -= item.qty;
    await product.save();

    orderItems.push({
      productId: product._id.toString(),
      name: product.name,
      price: product.price,
      qty: item.qty
    });
  }

  const order = await Order.create({
    items: orderItems,
    total,
    paymentMethod,
    customer,
    channel
  });

  const io = req.app.get("io");

  // ส่ง event ออเดอร์ใหม่
  io.emit("order-updated", order);

  // แจ้งเตือนออเดอร์ใหม่
  const notif = await Notification.create({
    title: "คำสั่งซื้อใหม่",
    message: `Order #${order._id} ยอด ${total.toFixed(2)} ฿`,
    type: "order"
  });
  io.emit("notification", notif);

  res.json(order);
};
