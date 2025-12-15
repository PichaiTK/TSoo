// server/services/analyticsService.js
const Order = require("../models/Order");

exports.getDailyAnalytics = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const orders = await Order.find({ createdAt: { $gte: today } });

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const bills = orders.length;
  const avgBill = bills > 0 ? totalRevenue / bills : 0;

  const productCount = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      productCount[item.name] = (productCount[item.name] || 0) + item.qty;
    });
  });

  const topProduct = Object.entries(productCount).sort((a, b) => b[1] - a[1])[0] || ["-", 0];

  // เตรียมข้อมูลกราฟ: ยอดขายรายชั่วโมงวันนี้
  const hourly = Array.from({ length: 24 }, () => 0);
  orders.forEach(o => {
    const h = new Date(o.createdAt).getHours();
    hourly[h] += o.total;
  });

  return {
    totalRevenue,
    bills,
    avgBill,
    topProduct: topProduct[0],
    topQty: topProduct[1],
    hourly
  };
};
