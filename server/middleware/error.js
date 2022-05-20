module.exports = async (ctx, next) => {
  try {
    await next();
  }
  catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: {message: err.message}}
      return;
    }
    ctx.status = 500;
    ctx.body = {error: {message: 'Internal server error'}};
  }
};
