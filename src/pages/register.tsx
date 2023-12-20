import React, { useState } from 'react';

interface User {
  name: string;
  email: string;
  password: string;
}

const RegisterComponent: React.FC = () => {
  const [user, setUser] = useState<User>({ name: '', email: '', password: '' });

  const register = async () => {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (data.status === 'ok') {
      alert(data.message);
    } else if (data.status === 'alreadyRegistered') {
      alert(data.message);
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <input type='text' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder='Name' />
      <input type='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder='Email' />
      <input type='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} placeholder='Password' />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default RegisterComponent;
