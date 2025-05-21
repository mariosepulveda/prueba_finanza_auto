import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { User } from '../types/User';

const UserDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.user as User;

    if (!user) {
        return <div className="p-4">Usuario no encontrado.</div>;
    }

    return (
        <div className="p-6 max-w-xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 text-blue-600 hover:underline"
            >
                ← Volver
            </button>

            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <div className="flex items-center space-x-4 mb-4">
                    <img
                        src={user.imageUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-20 h-20 rounded-full border"
                    />
                    <div>
                        <h2 className="text-xl font-semibold">{user.title} {user.firstName} {user.lastName}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div><span className="font-semibold">Género:</span> {user.gender}</div>
                    <div><span className="font-semibold">Teléfono:</span> {user.phone}</div>
                    <div><span className="font-semibold">Fecha de nacimiento:</span> {user.birthDate}</div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
