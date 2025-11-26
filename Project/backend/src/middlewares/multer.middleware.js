import multer from "multer";

const myStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },
});

const upload = multer({ storage: myStorage });

export default upload;
