const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

function checkToken(req, res, next){
  const token = req.headers['authorization'];
  if (!token) {
    res.json({ success: false, message: 'No token provided' }); // Return error
  } else {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.json({ success: false, message: `Token invalid: ${err}` });
      } else {
      req.decoded = decoded;
        next();
      }
    });
  }
}

function isUsernameProvided(username, res) {
  console.log(username);
  if (!username || username === undefined) {
    res.json({ success: false, message: 'Username was not provided' });
    return false;
  }
  return true;
}

function checkIsUsernameAlreadyTaken(username, res) {
  User.findOne({ username }, (err, user) => {
    if (err) {
      res.json({ success: false, message: err });
      return;
    }
    if (user) {
      res.json({ success: false, message: 'Username is already taken' });
      return;
    }
    res.json({ success: true, message: 'Username is available' });
  });
}

function checkIsEmailAlreadyTaken(email, res) {
  User.findOne({ email }, (err, user) => {
    if (err) {
      res.json({ success: false, message: err });
      return;
    }
    if (user) {
        res.json({ success: false, message: 'E-mail is already taken' });
        return;
    }
    res.json({ success: true, message: 'E-mail is available' });
  });
}

module.exports = (router) => {
  router.post('/register', (req, res) => {
    if (!req.body.email) {
      res.json({ success: false, message: 'You must provide an email' });
    } else {
      if (!req.body.username) {
        res.json({ success: false, message: 'You must provide an username' });
      } else {
        if (!req.body.password) {
          res.json({ success: false, message: 'You must provide a password' });
        } else {
          let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
          });
          user.save((err) => {
            if (err) {
              if (err.code === 11000) {
                res.json({ success: false, message: 'Username or email is already exists' });
              } else {
                if (err.errors) {
                  if (err.errors.email) {
                    res.json({ success: false, message: err.errors.email.message });
                  } else {
                    if (err.errors.username) {
                      res.json({ success: false, message: err.errors.username.message });
                    } else {
                      if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message });
                      } else {
                        res.json({ success: false, message: err });
                      }
                    }
                  }
                } else {
                  res.json({ success: false, message: 'Could not save user. Error', err });
                }
              }
            } else {
              res.json({ success: true, message: 'Account registered!' });
            }
          });
       }
      }
    }
  });
 router.get('/checkEmail/', (req, res) => {
    res.json({ success: false, message: 'E-mail was not provided' });
  });

  router.get('/checkEmail/:email', (req, res) => {
    checkIsEmailAlreadyTaken(req.params.email, res);
  });

  router.get('/checkUsername/', (req, res) => {
    res.json({ success: false, message: 'Username was not provided' });
  });
  
  router.get('/checkUsername/:username', (req, res) => {
    checkIsUsernameAlreadyTaken(req.params.username, res);
  });

  router.post('/login', (req, res) => {
    if (!req.body.username) {
      res.json({ success: false, message: 'No username was provided' }); // Return error
    } else {``
      if (!req.body.password) {
        res.json({ success: false, message: 'No password was provided.' });
      } else {
        User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
          if (err) {
            res.json({ success: false, message: err });
          } else {
            if (!user) {
              res.json({ success: false, message: 'Username not found.' });
            } else {
              const validPassword = user.comparePassword(req.body.password);
              if (!validPassword) {
                res.json({ success: false, message: 'Password invalid' });
              } else {
                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' });
                res.json({ success: true, message: 'Success!', token: token, user: { user: user.username } });
              }
            }
          }
        });
      }
    }
  });

  router.get('/profile', checkToken, (req, res) => {
    User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
      if (err) {
        res.json({ success: false, message: err });
      } else {
        if (!user) {
          res.json({ success: false, message: 'User not found' });
        } else {
          console.log(user);
          res.json({ success: true, user });
        }
      }
    });
  });

  return router;
};
