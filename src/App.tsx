import './App.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import { AuthClient } from '@dfinity/auth-client';
import { HttpAgent } from '@dfinity/agent';
import { createActor } from './declarations/backend'; // Import the createActor function

function App() {
  const { data: count, call: refetchCount } = useQueryCall({
    functionName: 'get',
  });

  const { call: increment, loading } = useUpdateCall({
    functionName: 'inc',
    onSuccess: () => {
      refetchCount();
    },
  });

  // Authentication handler function
  const handleAuth = async (e: any) => {
    e.preventDefault();

    try {
      // Create an AuthClient
      const authClient = await AuthClient.create();

      // Start the login process
      await new Promise((resolve) => {
        authClient.login({
          identityProvider: process.env.II_URL,
          onSuccess: resolve,
        });
      });

      // Get the identity from the auth client
      const identity = authClient.getIdentity();

      // Create an agent with the identity
      const agent = new HttpAgent({ identity });

      // Create an actor to interact with the backend canister
      const actor = createActor(process.env.CANISTER_ID_BACKEND as string, {
        agent,
      });

      // You can now use the actor to call service methods
      console.log('Authentication successful!', agent);
    } catch (error) {
      console.error('Authentication failed:', error);
    }

    return false;
  };

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a
          href="https://internetcomputer.org/docs/current/developer-docs/build/cdks/motoko-dfinity/motoko/"
          target="_blank"
        >
          <span className="logo-stack">
            <img
              src={motokoShadowLogo}
              className="logo motoko-shadow"
              alt="Motoko logo"
            />
            <img src={motokoLogo} className="logo motoko" alt="Motoko logo" />
          </span>
        </a>
      </div>
      <h1>Vite + React + playpal</h1>
      <div className="card">
        <button onClick={increment} disabled={loading}>
          count is {count?.toString() ?? 'loading...'}
        </button>
        <p>
          Edit <code>backend/Backend.mo</code> and save to test HMR
        </p>
      </div>
      <div className="card">
        <button onClick={handleAuth}>
          Authenticate with Internet Identity
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite, React, and Motoko logos to learn more
      </p>
    </div>
  );
}

export default App;
