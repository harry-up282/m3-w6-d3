const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const auth = require('http-auth');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const Registration = mongoose.model('Registration');
// const Registration = require('../models/Registration');

const basic = auth.basic({
  file: path.join(__dirname, '../users.htpasswd'),
});

// router.get('/', (req, res) => {
//   //res.send('It works!');
//   res.render('form', { title: 'Registration form' });
// });
router.get('/', (req, res) => {
  res.render('index', { title: 'Simple Kitchen' });
});
router.get('/new-form', (req, res) => {
  res.render('new-form', { title: 'New Recipe Form' });
});
router.get('/thank-you', (req, res) => {
  res.render('thank-you', { title: 'Thank You' });
});
router.get('/', (req, res) => {
     res.render('form', { title: 'Registration form' });
   });

router.get('/registrations', basic.check((req, res) => {
  Registration.find()
    .then((registrations) => {
      res.render('index', { title: 'Listing registrations', registrations });
    })
    .catch(() => { 
      res.send('Sorry! Something went wrong.'); 
    });
}));

router.post('/register',
  [
    check('name').isLength({ min: 1 }).withMessage('Please enter a name'),
    check('email').isLength({ min: 1 }).withMessage('Please enter an email'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const registration = new Registration(req.body);
        const salt = await bcrypt.genSalt(10);
        registration.password = await bcrypt.hash(registration.password, salt);
        await registration.save();

        // Redirect to a success page or do something else on successful registration
        res.redirect('/Thank you for your registration!');
      } catch (error) {
        console.log(error);
        res.send('Sorry! Something went wrong.');
      }
    } else {
      // Handle errors if validation fails
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);

module.exports = router;