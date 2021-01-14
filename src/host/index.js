if (process.env.NODE_ENV === "production") {
  module.exports = "/if";
} else {
  module.exports = "http://192.168.52.60:8187/if";
}

