const fs = require('fs')
const express = require('express');
const router = express.Router();
const validator = require('validator');
const multer  = require('multer');

const User = require('../models/User');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'photos/')
    },
    filename: function (req, file, cb) {
        var getFileExt = function(fileName){
            var fileExt = fileName.split(".");
            if( fileExt.length === 1 || ( fileExt[0] === "" && fileExt.length === 2 ) ) {
                return "";
            }
            return fileExt.pop();
        }
        cb(null, Date.now() + '.' + getFileExt(file.originalname))
    }
})

const upload = multer({
  storage: storage,
   fileFilter: function (req, file, cb) {
     const mimetype = file.mimetype
     if(validMimeTypes.includes(mimetype)) {
       cb(null, true);
     } else {
       cb(null, false);
     }
   }
 })

function checkRequired(details) {
  return new Promise((resolve, reject) => {
    const errors = []
    for(let i=0; i<requiredFields.length; i++) {
      if(!details[requiredFields[i]]) {
        errors.push(`Missing field: ${requiredFields[i]}`)
      }
    }
    resolve(errors);
  })
}

const requiredFields = [
  'firstName',
  'lastName',
  'emailAddress',
  'phoneNumber',
  'dateOfBirth',
  'address1',
  'city',
  'state',
  'nationality',
  'zipCode',
  'paymentMethod'
]

const validMimeTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/png',
]

const mimeTypeMap = {
  'image/apng': 'apng',
  'image/bmp': 'bmp',
  'image/gif': 'gif',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
}

const successResponse = (response, message = null, data = null) => {
  response.status(200).send({
    success: true,
    timestamp: Date.now(),
    message,
    data,
  });
};

const errorResponse = (response, message, data = null, status = 403) => {
  response.status(status).send({
    success: false,
    timestamp: Date.now(),
    message,
    data
  });
};

router.get('/', (request, response) => {
  response.render('home')
})

// router.get('/db', (request, response) => {
//   User.find({})
//     .then(users => {
//       return successResponse(response, 'Get KYC users', users)
//     })
//     .catch(console.log)
// })

router.post('/', upload.array('file', 5), (request, response) => {
  const details = request.body
  checkRequired(details)
    .then(errors => {
      if(errors.length > 0) return errorResponse(response, 'Missing field(s)', errors)
      details.photos = []
      for(let i=0; i<request.files.length; i++) {
        details.photos.push(request.files[i].filename)
      }
      if(!validator.isEmail(details.emailAddress)) return errorResponse(response, 'Invalid Email Address');
      User.create(details)
        .then(console.log)
        .catch(console.log)
      return successResponse(response, 'Successful signup')
    })
    .catch(error => {
      console.log(error.message || error)
      response.status(403).send(error.message)
    })


})

module.exports = router;
