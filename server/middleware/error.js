module.exports = async (ctx, next) => {
  try {
    await next();
  }
  catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message}
      return;
    }
    ctx.status = 500;
    ctx.body = {error: 'Internal server error'};
  }
};
