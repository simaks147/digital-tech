const imagekit = require("../libs/imagekit");

module.exports = (ctx) => {
  ctx.body = imagekit.getAuthenticationParameters();
};
