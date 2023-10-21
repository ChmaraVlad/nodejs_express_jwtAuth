const validationResult = require('../validators/validationResult')

const Post = require('../models/Post')

exports.getAllPosts = (req, res) => {
  const posts = Post.find()
  .select('_id title body')
  .then((posts)=>{
    res.json({posts})
  }).catch(error => {
    console.log('GET_ALL_POSTS => ERROR: ',error);
  })
}

exports.createPost = (req, res) => {
  const errors = validationResult(req, res)

  if(errors) {
   return res.status(400).json({ errors: errors });

  //  or send error in middleware handlerErrors
  // next(error)
  // return
  }

  const post = new Post(req.body)

  post.save().then((data)=>{
    res.json({
      post: data
    })
  }).catch(error => {
    console.log('ERROR => CREATE-POST', error);
    //  or ssend error in middleware handlerErrors
    next(error)
  })
}