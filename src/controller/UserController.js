import User from "../models/User.js";

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await User.findAll();
      const [firstUser, ...otherUsers] = users;
      const allUsers = firstUser ? [firstUser, ...otherUsers] : [];

      return res.status(200).json({
        total: allUsers.length,
        users: allUsers,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { name, email, ...extraFields } = req.body ?? {};

      if (!name || !email) {
        return res.status(400).json({
          message: "name and email are required",
        });
      }

      const newUser = await User.create({ name, email, ...extraFields });
      return res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default UserController;
