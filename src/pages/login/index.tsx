import React, { useState } from 'react';
import Layout from '@/components/rootLayout';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import ReactLoading from 'react-loading';

interface User {
  email: string;
  password: string;
}

const LoginComponent: React.FC = () => {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
    setIsLoading(true);
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      alert(data.message);

      // Simpan token dan detail pengguna di cookies
      Cookies.set('token', data.token);
      Cookies.set('user', JSON.stringify(data.user));

      // Navigasi ke halaman utama
      router.push('/');
    } else {
      alert('Login failed');
    }
    setIsLoading(false);
  };

  return (
    <Layout>
      {isLoading ? (
        <ReactLoading type={'spin'} color={'#000000'} />
      ) : (
        <div>
          <input type='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' />
          <input type='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' />
          <button onClick={login} disabled={isLoading}>
            Login
          </button>
        </div>
      )}
    </Layout>
  );
};

export default LoginComponent;
