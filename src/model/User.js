class User {
  static users = [
    { id: 1, name: "Channy", email: "channy.ven@gmail.com" },
    { id: 2, name: "Niki", email: "niki@gmail.com" },
  ];

  static async findAll() {
    return [...this.users];
  }

  static async create(userData = {}) {
    const { name, email, ...extraFields } = userData;
    const [lastUser] = this.users.slice(-1);
    const nextId = lastUser ? lastUser.id + 1 : 1;

    const newUser = {
      id: nextId,
      name,
      email,
      ...extraFields,
    };

    this.users = [...this.users, newUser];
    return newUser;
  }
}

export default User;