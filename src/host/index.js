if (process.env.NODE_ENV === "production") {
  module.exports = "";
} else {
  module.exports = "http://10.170.128.14:8182/if";
}

