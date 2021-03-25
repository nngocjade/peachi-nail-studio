const bcrypt = require("bcryptjs");

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123", 10),
    isAdmin: true,
  },
  {
    name: "Client",
    email: "client@example.com",
    password: bcrypt.hashSync("123", 10),
  },
  {
    name: "Jade Nguyen",
    email: "jade@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
];

module.exports = users;
