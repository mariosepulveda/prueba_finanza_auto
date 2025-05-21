// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { User } from '../types/User';

// const UserDetail: React.FC = () => {
//     const navigate = useNavigate();
//     const location = useLocation();
//     const user = location.state?.user as User;

//     if (!user) {
//         return <div className="p-4">Usuario no encontrado.</div>;
//     }

//     return (
//         <div className="p-6 max-w-xl mx-auto">
//             <button
//                 onClick={() => navigate(-1)}
//                 className="mb-4 text-blue-600 hover:underline"
//             >
//                 ← Volver
//             </button>

//             <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
//                 <div className="flex items-center space-x-4 mb-4">
//                     <img
//                         src={user.picture}
//                         alt={`${user.firstName} ${user.lastName}`}
//                         className="w-20 h-20 rounded-full border"
//                     />
//                     <div>
//                         <h2 className="text-xl font-semibold">{user.title} {user.firstName} {user.lastName}</h2>
//                         <p className="text-gray-600">{user.email}</p>
//                     </div>
//                 </div>

//                 <div className="space-y-2">
//                     <div><span className="font-semibold">Género:</span> {user.gender}</div>
//                     <div><span className="font-semibold">Teléfono:</span> {user.phone}</div>
//                     <div><span className="font-semibold">Fecha de nacimiento:</span> {user.dateOfBirth}</div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserDetail;

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../types/User';
import { getUserById } from '../services/userService';

const UserDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (id) {
                const data = await getUserById(id);
                setUser(data);
            }
            setLoading(false);
        };

        fetchUser();
    }, [id]);

    if (loading) {
        return <div className="p-4">Cargando usuario...</div>;
    }

    if (!user) {
        return <div className="p-4">Usuario no encontrado.</div>;
    }

const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

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
                        src={user.picture}
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
                    <div><span className="font-semibold">Fecha de nacimiento:</span> {formatDate(user.dateOfBirth)}</div>
                    <div><span className="font-semibold">Registro:</span> {formatDate(user.registerDate)}</div>
                    <div><span className="font-semibold">Localización:</span> {user.location?.country}, {user.location?.city}</div>
                </div>
            </div>
        </div>
    );
};

export default UserDetail;
