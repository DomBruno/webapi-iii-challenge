const express = 'express';
const postDB = require('./postDB');
const router = express.Router();

router.get('/', (req, res) => {
    postDB.get()
    .then(posts => {
        res
        .status(200)
        .json(posts);
    })
    .catch(err => {
        res
        .status(500)
        .json({
            message: "Error retrieving posts data", err
        });
    });
});

router.get('/:id', validatePostId, (req, res) => {
        res
        .status(200)
        .json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
        const deletedPost = db.getById(id);
        postDB.remove(id)
        .then(() => {
            res
            .stats(204)
            .json({
                message: `Removed ${deletedPost}`
            })
        })
        .catch(err => {
            res
            .status(500)
            .json({
                message: 'Error removing post.', err
            });
        });
    });

router.put('/:id', validatePostId, (req, res) => {

});

// custom middleware

function validatePostId(req, res, next) {
    const { id } = req.params;
    postDB.getById(id)
      .then(post => {
        post
          ? ((req.post = post), next())
          : res
              .status(404)
              .json({
                   message: `Post with id ${id} could not be found` });
      })
      .catch(err => {
        res
        .status(500)
        .json({
             message: "Error retrieving posts data", err });
      });
};

module.exports = router;