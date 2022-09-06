const Order = require('../models/Order');
const sendMail = require('../libs/sendMail');

module.exports.checkout = async (ctx, next) => {
  let message = '';

  const order = await Order.create({
    user: ctx.user,
    products: ctx.request.body.products,
    phone: ctx.request.body.phone,
    address: ctx.request.body.address,
    city: ctx.request.body.city,
    country: ctx.request.body.country,
  });

  try {
    await sendMail({
      to: {
        name: order.user.displayName,
        address: order.user.email
      },
      subject: 'New order',
      html: `Your order №${order.id.slice(-6)} has been placed`
    });
  }
  catch {
    message = 'An error occurred when sending mail to your mailbox, but your order has been successfully placed';
  }

  ctx.body = await new Promise(resolve => {
    setTimeout(() => {
      resolve({order: {
          id: order.id,
          message
        }});
    }, 3000);
  });
};
