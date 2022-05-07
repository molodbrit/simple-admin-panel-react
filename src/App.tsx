import { useState, useEffect } from 'react';
import AuthView from './components/views/AuthView.js';
import AdminView from './components/views/AdminView.js';
import ProgressBar from './components/atoms/ProgressBar/ProgressBar.js';
import { session } from './helpers/storage.js';
import { fetchAuthStatus } from './api/index.js';
import RtButton from './components/atoms/Button/Button.js';

function App() {
  const [isPending, setPendingState] = useState(false);
  const [isAuthenticated, setAuthState] = useState(false);

  function updateAuthentication(state: boolean, token?: string | undefined) {
    setAuthState(state);
    if (state && token) {
      session.set('user-token', token);
    } else {
      session.remove('user-token');
    }
  }

  async function checkAuthStatus() {
    try {
      setPendingState(true);
      const token: string | null = session.get('user-token');
      if (!token) throw new Error('Has no token.');

      const { data }: any = await fetchAuthStatus(token);
      if (data?.access) {
        updateAuthentication(true, token);
      }
    } catch (err: any) {
      if (err.status !== 401) {
        console.error(`checkAuthStatus: ${err.message}`);
      }
    } finally {
      setPendingState(false);
    }
  }

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const exitButton = !isAuthenticated
    ? null
    : (
      <li>
        <RtButton text="Logout" color="red" onClick={() => updateAuthentication(false)} />
      </li>
    );

  return (
    <div id="App">
      <ProgressBar isActive={isPending} />
      <header className="row">
        <nav className="teal col s12">
          <span className="brand-logo left">Blog-admin</span>
          <ul className="right">
            { exitButton }
          </ul>
        </nav>
      </header>

      <main className="container">
        {
        isAuthenticated
          ? <AdminView onAuthenticate={(state) => updateAuthentication(state)} />
          : <AuthView onAuthenticate={(state, token) => updateAuthentication(state, token)} />
        }
      </main>
    </div>
  );
}

export default App;
