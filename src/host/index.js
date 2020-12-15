if (process.env.NODE_ENV === "production") {
  module.exports = "/if";
} else {
  module.exports = "http://10.170.128.14:8187/if";
}

