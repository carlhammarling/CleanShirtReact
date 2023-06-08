const bcrypt = require("bcryptjs");
const User = require("../schemas/userSchema");
const auth = require("../authorization/auth");

//CRUD

//CREATE / POST
exports.postUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    shoppingCart,
    adress,
    postalCode,
    city,
    country,
    mobile,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "You have to fill in all the forms",
    });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User allready exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const _user = new User({
      firstName,
      lastName,
      email,
      passwordHash: hash,
      shoppingCart,
      adress,
      postalCode,
      city,
      country,
      mobile,
    });

    const user = await _user.save();

    //Ger en token tillbaka som kan användas/decodas
    res.status(201).json(auth.generateToken(user));
  } catch {
    res
      .status(400)
      .json({ message: "Something went wrong when trying to create a user." });
  }
};

//POST - LOGIN
exports.loginUser = async (req, res) => {
  //Vi läser det vi skickar med en POST och kontrollerar så att båda fälten är ifyllda.
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "You have to fill in all the forms",
    });
  }

  //Vi hi letar efter en user som har samma email som vår req + fel om 404.
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "Not found",
    });
  }

  // Jämför req.password och user.password får tillbaka true/false + felmeddelande
  const result = await bcrypt.compare(password, user.passwordHash);
  if (!result) {
    return res.status(401).json({
      message: "Could not login",
    });
  }

  //Om vi går igenom valideringen, generera en token av user och skicka tillbaka som res.
  res.status(200).json(auth.generateToken(user));
};

//GET - ALL

exports.getAllUsers = (req, res) => {
  User.find()
    // .populate('shoppingCart')
    // .exec()
    .then((data) => res.status(200).json(data))
    .catch(() => res.status(400).json({ message: "Could not get users." }));
};

//GET - ONE by id

exports.getOneUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate({ path: "shoppingCart", select: "userId orderLine" })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Could not find user." });
      }
      res.status(200).json(data);
    })
    .catch(() =>
      res
        .status(400)
        .json({
          message: "Something went wrong while trying to find the user.",
        })
    );
};
//GET - ONE by token

exports.getUserByToken = (req, res) => {
  const userId = req.userId;
  User.findById(userId)
    // .populate({ path: 'shoppingCart', select: 'userId orderLine' })
    .populate({
      path: "shoppingCart",
      populate: { path: "orderLine", populate: { path: "product" } },
    })
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(404).json({ message: "Could not find user." });
      }
      res.status(200).json(data);
    })
    .catch(() =>
      res
        .status(400)
        .json({
          message: "Something went wrong while trying to find the user.",
        })
    );
};

//PATCH - UPDATE USER
exports.updateUser = async (req, res) => {
  const userId = req.userId;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    if (!updatedUser) {
      res.status(404).json({
        message: "Could not find this user",
      });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong when updating this user!",
      err: err.message,
    });
  }
};

//DELETE

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .json({ message: "Could not find a user with this id." });
      }
      res
        .status(200)
        .json({
          message: "User with id: " + id + " was successfully deleted.",
        });
    })
    .catch(() =>
      res
        .status(400)
        .json({
          message: "Something went wrong while trying to delete the user.",
        })
    );
};
