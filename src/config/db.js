class Database {
  static #isConnected = false;

  static async connect() {
    try {
      if (this.#isConnected) return;
      await Promise.resolve();
      this.#isConnected = true;
      console.log("Database connected");
    } catch (error) {
      console.error("Database connection failed:", error.message);
      throw error;
    }
  }
}

export default Database;