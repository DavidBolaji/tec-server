const express = require('express');
const router = new express.Router();
const blogController = require('../controller/blogController');
const upload = require('../utils/multer');
const catchAsyncError = require('../utils/error');
const auth = require('../middleware/auth');

// await cloudinary.uploader.upload(str, {})
router.post('/api/v1/blog/create', auth, upload.single('images'), blogController.create, catchAsyncError)
router.get('/api/v1/blog/find', blogController.getBlogs);
router.delete('/api/v1/blog/delete/:blogId', auth, blogController.deleteBlog);
router.put('/api/v1/blog/update/:blogId', auth, upload.single('images'), blogController.updateBlog, catchAsyncError);
router.get('/api/v1/blog/find/:id', blogController.getOneBlog);
// router.post('/api/v1/blog/login', userController.login, catchAsyncError)


module.exports = router;