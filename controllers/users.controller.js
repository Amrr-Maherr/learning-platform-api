const { db } = require("../config/db");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const getAllUsers = async (req, res) => {
  const allUsers = await db.users_collection.find().toArray();
  res.status(200).json({
    message: "success",
    length: allUsers.length,
    data: {
      users: allUsers,
    },
  });
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "failed",
      data: {
        message: "invalid user id!",
      },
    });
  }
  const user = await db.users_collection.findOne({ _id: new ObjectId(id) });
  if (!user) {
    res.status(404).json({
      message: "failed",
      data: {
        message: "user not found!",
      },
    });
  } else {
    res.status(200).json({
      message: "success",
      data: {
        user: user,
      },
    });
  }
};

const createUser = async (req, res) => {
  const { name, email, role } = req.body;
  const newUser = {
    name,
    email,
    role,
  };
  await db.users_collection.insertOne(newUser);
  res.status(201).json({
    message: "success",
    data: {
      user: newUser,
    },
  });
};

const updateUser = async (req, res) => {
  const { name, email, role } = req.body;
  const { id } = req.params;
  const user = await db.users_collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        name,
        email,
        role,
      },
    },
  );
  res.status(200).json({
    message: "success",
    data: {
      user,
    },
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const user = await db.users_collection.deleteOne({
    _id: new ObjectId(id),
  });
  if (user.deletedCount === 0) {
    res.status(404).json({
      message: "failed",
      data: {
        message: "user not found!",
      },
    });
  } else {
    res.status(200).json({
      message: "success",
      data: null,
    });
  }
};

const register = async (req, res) => {
  const { name, email, phonNumber, password } = req.body;

  const existingUser = await db.users_collection.findOne({
    email,
  });

  if (existingUser) {
    return res.status(409).json({
      message: "Email already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = {
    name,
    email,
    phonNumber,
    password: hashedPassword,
  };

  const result = await db.users_collection.insertOne(user);

  res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        id: result.insertedId,
        name,
        email,
        phonNumber,
      },
    },
  });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await db.users_collection.findOne({
    email,
    password,
  });
  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }
  res.status(201).json({
    message: "success",
    data: {
      user: req.body,
    },
  });
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  register,
  login,
};
