import React, { useState, useEffect } from 'react';
import type { User } from '../types/User';
import Header from '../components/Header/Header';

const dummyUsers: User[] = [
  { id: 1, name: 'Juan Perez', email: 'juan@example.com', role: 'Admin' },
  { id: 2, name: 'Maria Lopez', email: 'maria@example.com', role: 'User' },
  { id: 3, name: 'Carlos Ruiz', email: 'carlos@example.com', role: 'User' },
];

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Aquí deberías hacer una petición al backend para obtener usuarios
    setUsers(dummyUsers);
  }, []);

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      setUsers(prev => prev.filter(user => user.id !== id));
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
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
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Crear Usuario</button>
      </div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Rol</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.role}</td>
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
