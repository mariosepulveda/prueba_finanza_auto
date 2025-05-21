//pagina principal con la lista de usuarios
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../types/User';
import Header from '../components/Header/Header';
import ConfirmModal from '../components/ConfirmModal/ConfirmModal';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import EditUserModal from './features/EditUserModal';
import Pagination from '../components/Pagination/Pagination';
import { getUsers } from '../services/userService';
import { updateUser, getUserById } from '../services/userService';
import { deleteUser } from '../services/userService';

const UsersPage: React.FC = () => {

  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);

//peticion para obtener la lista de usuarios
  const fetchUsers = async () => {
    const apiUsers = await getUsers(currentPage, pageSize);
    setUsers(apiUsers.data);
    setTotalItems(apiUsers.total);

  };

  useEffect(() => {

    fetchUsers();
  }, [currentPage, pageSize]);

  //manejador de eventos para la eliminacion de usuarios
  const handleDelete = async () => {
    if (!selectedUser) return;

    const deleted = await deleteUser(selectedUser.id);
    if (deleted) {
      fetchUsers();

      setIsDeleteModalOpen(false);
      setSelectedUser(null);
    } else {
      alert('Hubo un error al eliminar el usuario.');
    }
  };


//Manejador de eventos para la edicion de usuarios
  const handleEditClick = async (id: string) => {
    const userDetail = await getUserById(id);
    if (userDetail) {
      setSelectedUser(userDetail);
      setIsEditModalOpen(true);
    } else {
      console.error('No se pudo cargar el usuario');
    }
  };

  const handleSave = async (updatedUser: User) => {
    const result = await updateUser(updatedUser.id, updatedUser);
    if (result) {
      //Actualiza la tabla o el estado
      fetchUsers();
      console.log('Usuario actualizado con éxito:', result);
    } else {
      // show error alert
      console.error('Error actualizando el usuario');
    }
  };

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
            <th className="border p-2">id</th>
            <th className="border p-2">Título</th>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Apellido</th>
            <th className="border p-2">Imagen</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="hover:bg-gray-100">
              <td className="border p-2">{user.id}</td>
              <td className="border p-2">{user.title}</td>
              <td className="border p-2">{user.firstName}</td>
              <td className="border p-2">{user.lastName}</td>
              <td className="border p-2">{user.picture}</td>
              <td className="border p-2 space-x-2 flex flex-row flex-nowrap justify-evenly">
                <Eye className="w-5 h-5 inline text-green-500 cursor-pointer"
                  title="Ver detalles"
                  onClick={() => navigate(`/user/${user.id}`)}
                />
                <Pencil className="w-5 h-5 inline text-yellow-500 cursor-pointer"
                  title="Editar usuario"
                  onClick={() => {
                    // setEditUser(user);
                    handleEditClick(String(user.id));
                    // setIsEditModalOpen(true);
                  }}
                />
                <Trash2 className="w-5 h-5 inline text-red-500 cursor-pointer"
                  title="Eliminar usuario"
                  onClick={() => {
                    setSelectedUser(user);
                    setIsDeleteModalOpen(true);
                  }}
                />
              </td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center p-4">No se encontraron usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={(page) => setCurrentPage(page)}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setCurrentPage(1); // reset page when size changes
        }}
      />

      <EditUserModal
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSave}
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
