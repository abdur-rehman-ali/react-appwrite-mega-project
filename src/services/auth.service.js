import { conf } from "../conf/conf";
import { Client, Account, ID } from "appwrite";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteURL)
      .setProject(conf.appwriteProjectID);
    this.account = new Account(this.client);
  }

  async registerUser({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name)
      if (userAccount) {
        return await this.loginUser(email, password)
      }
    } catch (error) {
      throw error;
    }
  }

  async loginUser(email, password) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.error("getCurrentUser :: Error", error.message);
    }
    return null;
  }

  async logoutUser() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      throw error
    }
  }
}

const authService = new AuthService();

export default authService;
