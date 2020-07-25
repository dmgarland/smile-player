module.exports.encodePublicId = public_id =>
  public_id
    .split("/")
    .map(p => encodeURIComponent(p))
    .join("/")
