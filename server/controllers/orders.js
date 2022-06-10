const Order = require('../models/Order');
const Product = require('../models/Product');
const sendMail = require('../libs/sendMail');

module.exports.checkout = async (ctx, next) => {
  // const productsArray = [
  //   "canon_xf605_4k_pro_camcorder",
  //   "panasonic_dc_s1hbody_lumix_dc_s1h_mirrorless_digital"
  // ];

  // const products = await Product.find().where('slug').in(productsArray).exec();

  // [
  //   {
  //     item,
  //     count
  //   }
  // ]

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
  catch (err) {
    ctx.throw(403, 'An error occurred while sending mail');
  }

  ctx.body = {order: order.id};

  ctx.body = await new Promise(resolve => {
    setTimeout(() => {
      resolve({order: order.id});
    }, 3000);
  });
};
