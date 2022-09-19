module.exports = (ctx, next) => {
  ctx. body = {
    email: ctx.user.email,
    displayName: ctx.user.displayName,
    isAdmin: ctx.user.isAdmin || false
  }
}
