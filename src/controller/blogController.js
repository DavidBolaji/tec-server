const Blog = require("../models/blogModel");
const { cloudinary } = require("../utils/cloudinary");


exports.create = async (req, res) => {
  
    try {
        const blog = new Blog({...req.body, uploader: req.user._id})
        await blog.save();

        const uploadRes = await cloudinary.uploader.upload(req.file.path, {
           public_id: blog._id,
           folder: 'tec-client/blog',
           format: 'png',
           transformation:[
                {
                    width: 2000,
                    height: 1250,
                }
            ]
        });

       blog.img = uploadRes.secure_url
      
       await blog.save();

       res.status(201).send({blog})
        
    } catch (e) {
        res.status(500).send({e: 'Unable to create'})
    }
} 

exports.deleteBlog = async (req, res) => {
    const { blogId } = req.params;

    try {
        
        const deleteBlog = await Blog.deleteOne({_id: {$eq: blogId}});

        const deleteCloudBlogImg = await cloudinary.uploader.destroy(`tec-client/blog/${blogId}`);

       if (!deleteBlog) {
           throw new Error('Unable to delete Blog')
       }

       res.status(200).send(deleteBlog)
    } catch (e) {
        res.status(400).send({e: 'Unable to delete Blog'})
    }
}


exports.getBlogs = async (req, res) => {
    let limitValue, skipValue;
    if(!req.query.side) {
        limitValue = req.query.limit || 6;
    }else {
        limitValue = req.query.limit || 30;
    }
    skipValue = req.query.skip || 0;
    try { 
        const total = await  Blog.find({});
        const blogs = await Blog.find({})
            .limit(limitValue).skip(skipValue);
        if (!blogs) {
            throw new Error('error');
        }
        return res.status(200).send({blogs, total: total.length});

    } catch (e) {
        res.status(400).send({e: 'User not found'});
    }
} 


exports.getOneBlog = async (req, res) => {
    const { id } = req.params;
    
    try {
       const blog = await Blog.findOne({_id: id})

       if (!blog) {
           throw new Error('error')
       }

       res.status(200).send(blog)
    } catch (e) {
        res.status(400).send({e: 'Blog not found'})
    }
} 


exports.updateBlog = async (req, res) => {
    
    const { blogId } = req.params;

    const presentUpdate = Object.keys(req.body)

        
    try {
       const blog = await Blog.findOne({_id: blogId});

       if (!blog) {
        throw new Error('error')
       }

       if(req.file) {
        const uploadRes = await cloudinary.uploader.upload(req.file.path, {
            public_id: blog._id,
            folder: 'tec-client/blog',
            format: 'png',
            transformation:[
                {
                    width: 2000,
                    height: 1250,
                    crop: "fill"
                }
            ]
        });

        blog.img = uploadRes.secure_url;

       }

       presentUpdate.forEach(key => {
            blog[key] = req.body[key]
       })

       await blog.save()

       res.status(200).send(blog)
    } catch (e) {
        res.status(400).send({e: 'Blog not found'})
    }
}