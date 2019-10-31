const fs = require('fs')
const express = require('express');
const router = express.Router();
const User = require('../models/User')

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

router.get('/', (request, response) => {
  response.render('home')
})

router.post('/', (request, response) => {
  const { details } = request.body
  checkRequired(details)
    .then(errors => {
      if(errors.length > 0) return ;
      if(!details.agree) return;
      User.create(details)
      response.status(200).send('Success')
    })
    .catch(error => {
      console.log(error.message || error)
      response.status(403).send(error.message)
    })


})

module.exports = router;
