import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";


import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import { idlFactory, canisterId } from './declarations/backend';
// import Sidebar from './components/dashboard';
import Dashboard from './components/dashboard';


const router = createBrowserRouter( 
  createRoutesFromElements(
  <Route path="/" element={<App />}>
    {/* <Route path="contact" element={<Contact />} />
    <Route
      path="dashboard"
      element={<Dashboard />}
      loader={({ request }) =>
        fetch("/api/dashboard.json", {
          signal: request.signal,
        })
      }
    />*/}
     
      <Route
        path="dashboard"
        element={<Dashboard />}
        // loader={redirectIfUser}
      />
      {/* <Route path="logout" action={logoutUser} /> */}
    {/* </Route>  */}
  </Route>)
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AgentProvider withProcessEnv>
      <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
      <RouterProvider router={router} />
      </ActorProvider>
    </AgentProvider>
  </React.StrictMode>,
);
