import User from '../models/User.js';
import BaseController from './BaseController.js';  //យក Model User មកប្រើ for: find users,create users,update users,delete users

export default class UserController extends BaseController {       //បង្កើត Controller មួយឈ្មោះ UserController

  async getUsers(req, res) {           //Method នេះប្រើសម្រាប់:ទាញយកuser ទាំងអស់
    try {
      const users = await User.findAll();​​​​​​​​​​​​​​     //ទាញ users ទាំងអស់ពី database/model
      this.success(res, users, 'Users fetched successfully');
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  async getUserById(req, res) {        //រក user តាម id
    try {
      const { id } = req.params;
      const user = await User.findById(id);

      if (!user) {       //❌ បើ user អត់មាន
        return this.error(res, 'User not found', 404);
      }

      this.success(res, user, 'User fetched successfully');
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  async createUser(req, res) {         //ប្រើសម្រាប់:✅ បង្កើត user ថ្មី

    try {
      const { name, age } = req.body;

      if (!name || age === undefined) {            //បើ:name អត់មាន,age អត់មាន=return error 400
        return this.error(res, 'Name and age are required', 400);
      }

      if (age < 0 || age > 150) {
        return this.error(res, 'Age must be between 0 and 150', 400);
      }

      const user = await User.create({ name, age });   //បង្កើត user ថ្មី
      this.success(res, user, 'User created successfully');
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  async updateUser(req, res) {       //✅ កែប្រែ user
    try {
      const { id } = req.params;
      const { name, age } = req.body;

      if (name === undefined && age === undefined) {
        return this.error(res, 'At least one field (name or age) is required for update', 400);
      }

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return this.error(res, 'User not found', 404);
      }

      const updateData = {
        name: name !== undefined ? name : existingUser.name,
        age: age !== undefined ? age : existingUser.age    //3 nes keu jea ✅ Ternary Operator it mean: បើមាន name ថ្មី ➜ ប្រើថ្មី, បើអត់ ➜ ប្រើចាស់
      };

      const updatedUser = await User.update(id, updateData);
      this.success(res, updatedUser, 'User updated successfully');
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }

  async deleteUser(req, res) {     //✅ លុប user
    try {
      const { id } = req.params;

      const existingUser = await User.findById(id);
      if (!existingUser) {
        return this.error(res, 'User not found', 404);
      }

      const deleted = await User.delete(id);

      if (deleted) {
        this.success(res, null, 'User deleted successfully');
      } else {
        this.error(res, 'User not found', 404);
      }
    } catch (error) {
      this.error(res, error.message, 500);
    }
  }
}