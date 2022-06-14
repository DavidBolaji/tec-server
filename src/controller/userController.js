const User = require("../models/userModel");
const { cloudinary } = require("../utils/cloudinary");

exports.register = async (req, res) => {
  try {
    const user = new User({ ...req.body });
    await user.save();
    const token = await user.genAuthToken();

    console.log(user._id);

    const uploadRes = await cloudinary.uploader.upload(req.file.path, {
      public_id: user._id,
      folder: "tec-client/user",
      format: "png",
      transformation: [
        {
          width: 300,
          height: 200,
          crop: "fill",
          gravity: "face",
        },
      ],
    });

    user.img = uploadRes.url;

    await user.save();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.validateUser(req.body.email, req.body.password);
    const token = await user.genAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(400).send({ e: "Unable to login" });
  }
};

exports.logout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return req.token !== token.token;
    });

    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
};

exports.logoutAll = async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

exports.getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new Error();
    }

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ error: "User not found" });
  }
};

exports.getTutors = async (req, res) => {
  let user, total;
 
  try {
    if (req.query.filter) {
      user = await User.find({ role: { $ne: "admin" }, tags: req.query.filter }).skip(req.query.skip).limit(1);
    } else {
      user = await User.find({ role: { $ne: "admin" } });
    }

    total = user.length;

    if (!user) {
      throw new Error();
    }

    res.status(200).send({user, total});
  } catch (e) {
    res.status(400).send({ e: "User not found" });
  }
};

exports.deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deleteUser = await User.deleteOne({ _id: { $eq: userId } });

    const deleteCloudUserImg = await cloudinary.uploader.destroy(
      `tec-client/User/${userId}`
    );

    if (!deleteUser) {
      throw new Error("Unable to delete User");
    }

    res.status(200).send(deleteUser);
  } catch (e) {
    res.status(400).send({ e: "Unable to delete User" });
  }
};

exports.update = async (req, res) => {
  try {
    const user = await User.find({ _id: req.user._id });

    const userObjs = Object.keys(req.body);

    const allowedArr = ["name", "img", "password", "tags", "description"];
    const isValid = userObjs.every((userObj) => allowedArr.includes(userObj));

    // console.log(user);

    if (!isValid) {
      res.status(400).send({ error: "Invalid Updates" });
    }

    if (!req.file) {
      console.log(req.body);
      userObjs.forEach((userObj) => {
        if (userObj === "tags") {
          let newTag = req.body[userObj].split(",");
          user[0][userObj] = newTag;
        } else {
          user[0][userObj] = req.body[userObj];
        }
      });

      await user[0].save();

      return res.status(200).send(user);
    } else {
      const deleteRes = await cloudinary.uploader.destroy(
        `tec-client/user/${user[0]._id}`
      );

      console.log(deleteRes);

      const uploadRes = await cloudinary.uploader.upload(req.file.path, {
        public_id: user[0]._id,
        folder: "tec-client/user",
        format: "png",
        transformation: [
          {
            width: 300,
            height: 200,
            crop: "fill",
            gravity: "face",
          },
        ],
      });

      console.log(uploadRes);

      const newValueOj = {
        ...req.body,
      };

      userObjs.forEach((userObj) => {
        if (userObj === "tags") {
          let newTag;
          newTag = req.body[userObj].split(",");
          user[0][userObj] = newTag;
        } else {
          user[0][userObj] = newValueOj[userObj];
        }
      });

      user[0]["img"] = uploadRes.url;

      await user[0].save();

      return res.status(200).send(user);
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.setUserActiveOrInactive = async (req, res) => {
  const { id, activate } = req.body;

  const allowedUpdate = ["active"];

  try {
    const user = await User.findOne({ _id: id });

    allowedUpdate.forEach((key) => {
      user[key] = activate;
    });

    await user.save();

    res.send({ user });
  } catch (e) {
    res.status(400).send({ e: "Unable to login" });
  }
};
