
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
                const data = await getUserById(id); // consulta los detalles  del usuario por el id 
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

    const translateTitle = (title: string): string => {
        const titles: Record<string, string> = {
            mr: "Sr.",
            ms: "Sra.",
            mrs: "Sra.",
            miss: "Señorita",
            dr: "Dr."
        };
        return titles[title.toLowerCase()] || title;
    };

    const translateGender = (gender: string): string => {
        const genders: Record<string, string> = {
            male: "Masculino",
            female: "Femenino",
            other: "Otro"
        };
        return genders[gender.toLowerCase()] || gender;
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
                        <h2 className="text-xl font-semibold">{translateTitle(user.title)} {user.firstName} {user.lastName}</h2>
                        <p className="text-gray-600">{user.email}</p>
                    </div>
                </div>

                <div className="space-y-2">
                    <div><span className="font-semibold">Género:</span> {translateGender(user.gender)}</div>
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
