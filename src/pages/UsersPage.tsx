import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/User';
import Header from '../components/Header/Header';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import EditUserModal from './features/EditUserModal';
import Pagination from '../components/Pagination/Pagination';


const dummyUsers: User[] = [
  {
    id: 1,
    title: 'mr',
    firstName: 'Juan',
    lastName: 'Perez',
    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
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
    imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
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
    imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]') as User[];
    const combinedUsers = [...dummyUsers, ...localUsers];

    setUsers(localUsers);
  }, []);

  const handleDelete = () => {
    if (!selectedUser) return;

    const updatedUsers = users.filter(u => u.id !== selectedUser.id);
    setUsers(updatedUsers);

    localStorage.setItem('localUsers', JSON.stringify(updatedUsers));

    setIsDeleteModalOpen(false); // cerrar solo el modal de eliminar
    setSelectedUser(null);
  };

  const handleSaveUser = (updatedUser: User) => {
    setUsers(prev =>
      prev.map(user => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  const filteredUsers = users.filter(user =>
    user.firstName.toLowerCase().includes(search.toLowerCase()) ||
    user.lastName.toLowerCase().includes(search.toLowerCase()) ||
    user.birthDate.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())

  );

  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);


  return (
    <div className="">
      <Header></Header>
      <div className="flex justify-between p-4 items-center mb-4">
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
          {paginatedUsers.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border p-2">{user.firstName}</td>
              <td className="border p-2">{user.lastName}</td>
              <td className="border p-2">{user.email}</td>
              <td className="border p-2">{user.birthDate}</td>
              <td className="border p-2 space-x-2 flex flex-row flex-nowrap justify-evenly">
                <button className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => navigate('/user-detail', { state: { user } })}>
                  <Eye className="w-5 h-5 inline" />
                </button>
                <button className="bg-yellow-400 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setEditUser(user);
                    setIsEditModalOpen(true);
                  }}>
                  <Pencil className="w-5 h-5 inline" />
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <Trash2 className="w-5 h-5 inline" />
                </button>
              </td>
            </tr>
          ))}
          {paginatedUsers.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalItems={filteredUsers.length}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1); // reset page when size changes
        }}
      />

      <EditUserModal
        user={editUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveUser}
      />

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        userName={selectedUser ? `${selectedUser.firstName} ${selectedUser.lastName}` : ''}
      />
    </div>
  );
};

export default UsersPage;
