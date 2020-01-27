const multer = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

let upload = multer({ storage: storage })
module.exports = {
  async uploadFile(req,res) {

    upload.single(req.param.fileId), (req, res, next) => {
      const file = req.file;
      if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
      }
      res.send(file)
    }
  }
};
