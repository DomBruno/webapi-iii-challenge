const express = 'express';

const server = express();

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware
function logger(req, res, next) {
  const date = Date.now();
  console.log(`${req.method} Request : ${req.url} URL : ${date}`);
  next();
};

function validateUserId(req, res, next) {
  const id = req.params.id;
};

function validateUser(req, res, next) {
  req.body = req.body || 
};

function validatePost(req, res, next) {

};

module.exports = server;