const config = require('../config');
const uuid = require('uuid').v4;
const User = require('../models/User');
const sendMail = require('../libs/sendMail');

module.exports.register = async (ctx, next) => {
  if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/.test(ctx.request.body.password))) {
    ctx.throw(400, 'Password must be between 6 and 16 characters, and contain numbers, lowercase and uppercase letters.');
  }

  const verificationToken = uuid();

  let user = new User({
    email: ctx.request.body.email,
    displayName: ctx.request.body.username,
    verificationToken
  });

  await user.setPassword(ctx.request.body.password);
  await user.save();

  try {
    await sendMail({
      to: {
        name: user.displayName,
        address: user.email
      },
      subject: 'Verify your email',
      html: `To complete registration, please click on the link <a href="${config.domain}/api/confirm/${user.verificationToken}">Confirm registration</a>`
    });
  }
  catch (err) {
    await User.deleteOne({email: user.email});
    ctx.throw(403, 'An error occurred while sending mail');
  }

  ctx.body = {status: 'ok'};
};

module.exports.confirm = async (ctx, next) => {
  const user = await User.findOne({
    verificationToken: ctx.request.body.verificationToken
  });

  if (!user) ctx.throw(400, 'Verification link is invalid or outdated');

  // await user.updateOne({ $unset: { verificationToken: 1 } });

  user.verificationToken = undefined;
  await user.save({validateBeforeSave: false});

  ctx.body = await ctx.login(user);
};
