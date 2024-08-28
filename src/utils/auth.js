import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";


export class AuthModule {
  constructor() {
    this.authClient = null;
  }

  async init() {
    this.authClient = await AuthClient.create();
    if (await this.authClient.isAuthenticated()) {
      this.handleAuthenticated();
    }
  }

  async login() {
    return new Promise((resolve) => {
      this.authClient.login({
        // identityProvider: "https://identity.ic0.app/#authorize",
        identityProvider: process.env.II_URL,
        onSuccess: () => {
          this.handleAuthenticated();
          resolve();
        },
      });
    });
  }

  async handleAuthenticated() {
    const identity = await this.authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    // Depending on your environment, you may need to add:
    // await agent.fetchRootKey();
    this.agent = agent;
  }

  async getActor(canisterId, idlFactory) {
    if (!this.agent) {
      throw new Error("Agent not initialized. Please login first.");
    }
    return Actor.createActor(idlFactory, {
      agent: this.agent,
      canisterId,
    });
  }

  async logout() {
    await this.authClient.logout();
    this.agent = null;
  }
}