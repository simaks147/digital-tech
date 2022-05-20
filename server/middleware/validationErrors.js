module.exports = async (ctx, next) => {
  try {
    await next();
  }
  catch (err) {
    if (err.name !== 'ValidationError') throw err;

    ctx.status = 400;

    const error = Object.entries(err.errors).map(([key, value]) => ({
      [key]: value.message
    }));

    ctx.body = {error};
  }
}
