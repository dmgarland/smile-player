module.exports.slug = s =>
  s
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/\s/g, "-")
    .toLowerCase()
