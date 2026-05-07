import db from '../config/db.js';         //យក database connection មកប្រើ
import BaseModel from './BaseModel.js';   //យក Parent Class មកប្រើ

class User extends BaseModel {     //✅ Inheritance : User ជា Child Class, BaseModel ជា Parent Class
  constructor(id, name, age) {
    super(name, age);             //នេះហៅ constructor របស់ Parent Class (BaseModel)
    this.id = id;         //បន្ថែម property id
  }

  static async findAll() {         //✅ ទាញ users ទាំងអស់/ static it mean:អាច call បានដោយមិនចាំបាច់ new object
    try {
      const [rows] = await db.query('SELECT * FROM users');//ទាញ data ទាំងអស់ពី table users
      return rows.map(row => new User(row.id, row.name, row.age)); //បម្លែង database rows ➜ User Objects
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  }

  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length === 0) return null;
      const user = rows[0];
      return new User(user.id, user.name, user.age);
    } catch (error) {
      throw new Error(`Error finding user: ${error.message}`);
    }
  }

  static async create(userData) {
    const { name, age } = userData;   //យក values ចេញពី object
    try {
      const [result] = await db.query(
        'INSERT INTO users (name, age) VALUES (?, ?)',  //បញ្ចូល data ទៅ database
        [name, age]
      );
      return new User(result.insertId, name, age);    //result.insertID: id ដែល database បង្កើតថ្មី
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }

  static async update(id, userData) {
    const { name, age } = userData;
    try {
      const [result] = await db.query(
        'UPDATE users SET name = ?, age = ? WHERE id = ?',
        [name, age, id]
      );
      if (result.affectedRows === 0) return null;
      return new User(id, name, age);
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }
}

export default User;