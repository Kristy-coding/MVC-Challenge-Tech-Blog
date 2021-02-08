const router = require('express').Router();
const { Comment } = require('../../models');


// authguard middleware to all non GET routes
// with this function we are chekcing to see if the user exists in our database (meaning that they logginIn and have a user_id)
const withAuth = require('../../utils/auth');


//GET /api/comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// POST /api/comments
router.post('/', withAuth, (req, res) => {
  // check the session
  //Wrapping the Sequelize queries in if (req.session) statements ensures that only logged-in users interact with the database
  // if you are not loggin in it wont let you create??
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the id from the session.. we are telling the server to grab the id that is saved in the session when the user logs in or signs up
      // there for when we make a comment post request from the front end we only need to send comment_text and post_id information from the user
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});


//DELETE /api/comments/:id
router.delete('/:id', withAuth,(req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
});

module.exports = router;