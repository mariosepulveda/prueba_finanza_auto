import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/User';
import Header from '../components/Header/Header';

const dummyUsers: User[] = [
  {
    id: 1,
    title: 'mr',
    firstName: 'Juan',
    lastName: 'Perez',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    gender: 'male',
    email: 'juan@example.com',
    birthDate: '1990-05-15',
    phone: '+57 3012345678',
  },
  {
    id: 2,
    title: 'ms',
    firstName: 'Maria',
    lastName: 'Lopez',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    gender: 'female',
    email: 'maria@example.com',
    birthDate: '1985-08-22',
    phone: '+57 3023456789',
  },
  {
    id: 3,
    title: 'dr',
    firstName: 'Carlos',
    lastName: 'Ruiz',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    gender: 'male',
    email: 'carlos@example.com',
    birthDate: '1978-11-10',
    phone: '+57 3034567890',
  },
];

const UsersPage: React.FC = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]') as User[];
    const combinedUsers = [...dummyUsers, ...localUsers];

    setUsers(combinedUsers);
  }, []);

  const handleDelete = (id: number | string) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4">
      <Header></Header>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Buscar usuario..."
          className="border p-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => navigate('/create-user')}>Crear Usuario</button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Apellido</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Fecha de nacimiento </th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border p-2">{user.firstName}</td>
              <td className="border p-2">{user.lastName}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.birthDate}</td>
              <td className="border p-2 space-x-2">
                <button className="bg-green-500 text-white px-2 py-1 rounded">Ver</button>
                <button className="bg-yellow-400 text-white px-2 py-1 rounded">Editar</button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >Eliminar</button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
