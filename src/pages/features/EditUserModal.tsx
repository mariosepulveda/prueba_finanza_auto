import React, { useState, useEffect } from 'react';
import type { User } from '../../types/User';

interface EditUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

const nameRegex = /^([a-zA-Z]{2,})(\s[a-zA-Z]{2,})?$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|co|org|gov|edu)$/;
const phoneRegex = /^\+57\s?\d{10}$/;

const today = new Date().toISOString().split('T')[0];
const minBirthDate = new Date();
minBirthDate.setFullYear(minBirthDate.getFullYear() - 80);
const minDate = minBirthDate.toISOString().split('T')[0];

const EditUserModal: React.FC<EditUserModalProps> = ({ user, isOpen, onClose, onSave }) => {
    const [form, setForm] = useState<User>({} as User);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const formatDate = (isoDate?: string) => {
            return isoDate? isoDate.split('T')[0] : ""; // solo toma la parte YYYY-MM-DD
        };
        if (user) setForm({...user,
            dateOfBirth: formatDate(user.dateOfBirth)
        });
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        validate(name, value);
    };

const validate = (name: string, value: string) => {
    let error = "";

    if (name === "firstName") {
        if (!value) error = "Este campo es obligatorio";
        else if (!nameRegex.test(value)) error = "Debe tener al menos 2 letras. Solo letras, opcional un segundo nombre";
    }

    if (name === "lastName") {
        if (!value) error = "Este campo es obligatorio";
        else if (!nameRegex.test(value)) error = "Debe tener al menos 2 letras. Solo letras, opcional un segundo apellido";
    }

    if (name === "email") {
        if (!value) error = "Correo requerido";
        else if (!emailRegex.test(value)) error = "Correo inválido. Solo dominios .com, .co, .org, .gov, .edu";
    }

    if (name === "phone") {
        if (!value) error = "Teléfono requerido";
        else if (!phoneRegex.test(value)) error = "Formato inválido. Ej: +57 3001234567";
    }

    if (name === "dateOfBirth") {
        if (!value) error = "Fecha requerida";
        else if (value < minDate || value > today) error = `Fecha debe estar entre ${minDate} y ${today}`;
    }

    if (name === "picture") {
        const urlRegex = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;
        if (value && !urlRegex.test(value)) {
            error = "Debe ser una URL válida de imagen (.jpg, .png, etc.)";
        }
    }

    setErrors(prev => ({ ...prev, [name]: error }));
};


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
            onSave(form);
            onClose();
    };

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl max-h-screen overflow-y-auto">
                <h2 className="text-2xl font-semibold mb-2">Editar Usuario</h2>
                <p className='w-full bg-gray-200 border rounded-md p-2'>Id:{form.id}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Título</label>
                        <select name="title" value={form.title} onChange={handleChange} className="w-full border rounded-md p-2">
                            <option value="mr">Mr</option>
                            <option value="ms">Ms</option>
                            <option value="mrs">Mrs</option>
                            <option value="miss">Miss</option>
                            <option value="dr">Dr</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Nombres</label>
                        <input name="firstName" value={form.firstName ?? ""} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Apellidos</label>
                        <input name="lastName" value={form.lastName ?? ""} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Imagen (URL)</label>
                        <input name="imageUrl" value={form.picture ?? ""} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.picture && <p className="text-red-500 text-sm">{errors.picture}</p>}
                    </div>
                    
                    <div>
                        <label className="block font-medium mb-1">Género</label>
                        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded-md p-2" required>
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Correo</label>
                        <input type="email" name="email" value={form.email ?? ""} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Teléfono</label>
                        <input name="phone" value={form.phone ?? ""} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Fecha de Nacimiento</label>
                        <input type="date" name="dateOfBirth" value={form.dateOfBirth ?? ""} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
                    </div>

                    <div className="flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">Cancelar</button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;
