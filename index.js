const path = require("path");
const express = require("express");
const multer = require("multer");
const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});
app.post(
  "/upload",
  upload.fields([{ name: "profileImage" }, { name: "coverImage" }]),
  (req, res) => {
    console.log("Profile Image:");
    console.log(req.files["profileImage"][0]); // Access the first file for 'profileImage'

    console.log("Cover Image:");
    console.log(req.files["coverImage"][0]); // Access the first file for 'coverImage'

    return res.redirect("/");
  }
);
app.listen(PORT, () => console.log(`Server Started at PORT: 8000`));
