const cloudinary = require("cloudinary");

//config
cloudinary.config({
  cloud_name: "dpwustwce",
  api_key: "547464747529574",
  api_secret: "VYOzdC-MG3FUbPKZCAQk0GXxgfA",
});

exports.remove = (req, res) => {
  let resume_id = req.body.public_id;
  cloudinary.uploader.destroy(resume_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};
