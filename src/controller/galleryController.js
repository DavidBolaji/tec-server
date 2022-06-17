const Gallery = require("../models/galleryModel");
const { cloudinary } = require("../utils/cloudinary");

exports.store = async (req, res) => {
    try {
        const uploadRes = await cloudinary.uploader.upload(req.file.path, {
          folder: "tec-client/gallery",
          format: "png",
        });

        const image = new Gallery({pic: uploadRes.url})
        await image.save();
    
        res.status(201).send({image});
      } catch (e) {
        res.status(400).send(e);
      }
} 

exports.getAll = async (req, res) => {
  
    try {
      const pic = await Gallery.find({});
  
      if (!pic) {
        throw new Error();
      }
  
      res.status(200).send(pic);
    } catch (error) {
      res.status(400).send({ error: "pic not found" });
    }
  };

