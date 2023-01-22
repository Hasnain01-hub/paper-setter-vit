const cloudinary = require("cloudinary");

//config
cloudinary.config({
  cloud_name: "dpwustwce",
  api_key: "547464747529574",
  api_secret: "VYOzdC-MG3FUbPKZCAQk0GXxgfA",
});

exports.remove = (req, res) => {
  let resume_id = req.body.asset_id;
  console.log(resume_id);
  cloudinary.uploader.destroy(resume_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    console.log(result);
    res.send("ok");
  });
};
