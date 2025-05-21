// src/components/EditUserModal.tsx
import React, { useState, useEffect } from 'react';
import type { User } from '../../types/User';

interface EditUserModalProps {
    user: User | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({ user, isOpen, onClose, onSave }) => {
    const [form, setForm] = useState<User>({} as User);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (user) setForm(user);
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const validate = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        if (!form.firstName) newErrors.firstName = 'Este campo es obligatorio';
        if (!form.lastName) newErrors.lastName = 'Este campo es obligatorio';
        if (!form.email) newErrors.email = 'Correo requerido';
        if (!form.birthDate) newErrors.birthDate = 'Fecha requerida';
        if (!form.phone) newErrors.phone = 'Teléfono requerido';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSave(form);
            onClose();
        }
    };

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-xl">
                <h2 className="text-2xl font-semibold mb-4">Editar Usuario</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium mb-1">Título</label>
                        <select name="title" value={form.title} onChange={handleChange} className="w-full border rounded-md p-2">
                            <option value="">Seleccione...</option>
                            <option value="mr">Mr</option>
                            <option value="ms">Ms</option>
                            <option value="mrs">Mrs</option>
                            <option value="miss">Miss</option>
                            <option value="dr">Dr</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Nombres</label>
                        <input name="firstName" value={form.firstName} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Apellidos</label>
                        <input name="lastName" value={form.lastName} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Imagen (URL)</label>
                        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
                    </div>
                    
                    <div>
                        <label className="block font-medium mb-1">Género</label>
                        <input name="gender" value={form.gender} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Correo</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Teléfono</label>
                        <input name="phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Fecha de Nacimiento</label>
                        <input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} className="w-full border p-2 rounded" />
                        {errors.birthDate && <p className="text-red-500 text-sm">{errors.birthDate}</p>}
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
