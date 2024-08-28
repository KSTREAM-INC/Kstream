import React, { useState, useEffect } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { createActor } from './declarations/backend';
import { idlFactory } from './declarations/backend';
import { canisterId } from './declarations/backend';
import kstreamLogo from './assets/logo.svg';
// import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authClient, setAuthClient] = useState(null);

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
      setAuthClient(client);
      const authenticated = await client.isAuthenticated();
      setIsAuthenticated(authenticated);
    };

    initAuth();
  }, []);

  const handleAuth = async (e) => {
    e.preventDefault();

    try {
      await new Promise((resolve) => {
        authClient.login({
          // 1 minute in nanoseconds
          maxTimeToLive: BigInt(60 * 1000 * 1000 * 1000),
          identityProvider: process.env.II_URL,
          onSuccess: resolve,
        });
      });

      const identity = authClient.getIdentity();
      const agent = new HttpAgent({ identity });
      const actor = createActor(idlFactory, {
        agent,
        canisterId,
      });

      console.log('Authentication successful!', agent, actor, identity);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication failed:', error);
    }
  };

  const AuthInternet = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <img src={kstreamLogo} alt="Logo" className="w-20 mb-8" />
        <h1 className="text-white text-2xl tracking-widest font-medium">Welcome to K-stream</h1>
        <h2 className="text-gray-500 text-md font-normal tracking-wider">Register with your Internet identity</h2>
        <button onClick={handleAuth} className="bg-[#d7d34a] text-black my-10 px-6 rounded-md flex items-center tracking-widest font-semibold h-14">
          <img className="w-20 h-10 object-cover" src="https://s3-alpha-sig.figma.com/img/442d/0d65/5a06b5095acc7375771a65800dc00f86?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=MiGIMRj1YxHf5TPowuhPRW7jkEtrOhuSx26hi73XuhhmjrLbiImDgRNTbQ6elT3e~-4KBfbjJ135WjEnpVYpBn~MupntsqYjyUs5PvloW37WumrwNTD4kPoDJZ2GE6gDpYf8Ks2kgoE6mXcNetr3e~taHkh8VvFtTccgsv3AGVaqlS0HuuxgtAh3TmF6C3JA-K9AJ-C1JPjK5rPNwPHLO-A-djimEfOAW62M4px5jg6WR4hzN4QloVO6M62Xr34SF1Xo8tfZbct4l11dW~K9BOpxxFncX5-b5Kkmb0anaAeufPBi5OUyGkP6S8jaBH6FEvN5dTFwIY94tSoxdWG3sA__" alt="Icp Logo" />
          <span>Continue with Internet Identity</span>
        </button>
      </div>
    );
  };

  

  return (
    <div>
      {isAuthenticated ? <Dashboard /> : <AuthInternet />}
    </div>
  );
}

export default App;