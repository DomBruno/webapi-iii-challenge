const express = 'express';
const userDB = require('./userDb');
const postDB = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

});

router.get('/', (req, res) => {
    userDB.get()
    .then(users => {
      res
      .status(200)
      .json(users);
    })
    .catch(err => {
      res
      .status(500)
      .json({ 
          message: "Error retrieving User data", err
         });
    });
});

router.get('/:id', validateUserId, (req, res) => {
    userDB.getById(req.params.id)
    .then(user => {
      res
      .status(200)
      .json(user);
    })
    .catch(err => {
      res
      .status(500)
      .json({ 
          message: `Error retrieving user ${id}`, err 
        });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
    userDB.getUserPosts(req.params.id)
    .then(posts => {
      res
      .status(200)
      .json(posts);
    })
    .catch(err => {
      res
      .status(500)
      .json({ message: "Error retrieving user posts", err
     });
    });
});

router.delete('/:id', validateUserId, (req, res) => {

});

router.put('/:id', validateUserId, (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {
    const { id } = req.params;
    userDB.getById(id)
      .then(user => {
        user
          ? ((req.user = user), next())
          : res
              .status(404)
              .json({
                   message: `User with id ${id} could not be found` });
      })
      .catch(err => {
        res
        .status(500)
        .json({
             message: 'Error retrieving users data', err });
      });
};

function validateUser(req, res, next) {
    const bodyInfo = req.body;
    bodyInfo.name
      ? next()
      : res
      .status(400)
      .json({ 
          messsage: 'Missing name on submission' });
};

function validatePost(req, res, next) {
    const bodyInfo = req.body;
    bodyInfo.text
      ? next()
      : res
      .status(400)
      .json({ message: 'Missing text on submission' });
};

module.exports = router;
