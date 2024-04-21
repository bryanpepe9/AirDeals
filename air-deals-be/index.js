const bcrypt = require("bcrypt");

// Hash password before inserting into the database
const saltRounds = 10; // Number of salt rounds
const plainPassword = "password1"; // Replace with the actual password
bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
  } else {
    // 'hash' contains the hashed password
    console.log("Hashed password:", hash);
    // Now you can insert 'hash' into the 'hashed_password' column in the database
  }
});
