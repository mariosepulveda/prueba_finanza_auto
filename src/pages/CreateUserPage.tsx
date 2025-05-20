import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';

interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    picture: string;
}

const today = new Date().toISOString().split('T')[0]; // Fecha máxima (hoy)
const minBirthDate = new Date();
minBirthDate.setFullYear(minBirthDate.getFullYear() - 80);
const minDate = minBirthDate.toISOString().split('T')[0]; // Fecha mínima (80 años atrás)


const nameRegex = /^([a-zA-Z]{2,})(\s[a-zA-Z]{2,})?$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+57\s?\d{10}$/;


const CreateUserPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        firstName: '',
        lastName: '',
        imageUrl: '',
        gender: '',
        email: '',
        birthDate: '',
        phone: '',
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        validateField(name, value);

    };

    const validateField = (name: string, value: string) => {
        let error = '';

        switch (name) {
            case 'firstName':
                if (!nameRegex.test(value) || value.length < 2 || value.length > 50) {
                    error = 'Nombres inválidos (2-50 caracteres, letras y espacio).';
                }
                break;
            case 'lastName':
                if (!nameRegex.test(value) || value.length < 2 || value.length > 50) {
                    error = 'Apellidos inválidos (2-50 caracteres, letras y espacio).';
                }
                break;
            case 'email':
                if (value && !emailRegex.test(value)) {
                    error = 'Correo electrónico inválido.';
                }
                break;
            case 'birthDate':
                if (!value || value < minDate || value > today) {
                    error = 'Fecha de nacimiento fuera de rango.';
                }
                break;
            case 'phone':
                if (!phoneRegex.test(value) || value.length > 20) {
                    error = 'Formato de teléfono inválido. Ej: +57 321 456 78 90';
                }
                break;
            default:
                error = '';
        }

        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const fieldsToValidate = Object.keys(form);
        const newErrors: { [key: string]: string } = {};

        fieldsToValidate.forEach(field => {
            validateField(field, form[field as keyof typeof form]);
            if (errors[field]) newErrors[field] = errors[field];
        });

        const hasErrors = Object.values(newErrors).some(error => error !== '');
        if (hasErrors) {
            console.log('Formulario con errores');
            return;
        }

        console.log('Formulario válido:', form);
        const newUser = {
            ...form,
            id: Date.now().toString(), // o cualquier forma de generar un id único
        };
        const existingUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
        existingUsers.push(newUser);
        localStorage.setItem('localUsers', JSON.stringify(existingUsers));
        navigate('/');
    };

    return (
        <>
            <Header />
            <div className="p-4 max-w-lg mx-auto">
                <h2 className="text-2xl font-bold mb-4">Crear Usuario</h2>
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Crear Usuario</h2>

                    <div>
                        <label className="block font-medium mb-1">Título</label>
                        <select name="title" value={form.title} onChange={handleChange} className="w-full border rounded-md p-2" required>
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
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            maxLength={50}
                            className="w-full border rounded-md p-2"
                            placeholder="Ej: Juan Carlos"
                            required
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}

                    </div>

                    <div>
                        <label className="block font-medium mb-1">Apellidos</label>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            maxLength={50}
                            className="w-full border rounded-md p-2"
                            placeholder="Ej: Pérez Gómez"
                            required
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}

                    </div>

                    <div>
                        <label className="block font-medium mb-1">Imagen (URL)</label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                            placeholder="https://..."
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Género</label>
                        <select name="gender" value={form.gender} onChange={handleChange} className="w-full border rounded-md p-2" required>
                            <option value="">Seleccione...</option>
                            <option value="male">Masculino</option>
                            <option value="female">Femenino</option>
                            <option value="other">Otro</option>
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium mb-1">Correo Electrónico</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                    </div>

                    <div>
                        <label className="block font-medium mb-1">Fecha de Nacimiento</label>
                        <input
                            type="date"
                            onKeyDown={(e) => e.preventDefault()}
                            name="birthDate"
                            value={form.birthDate}
                            onChange={handleChange}
                            className="w-full border rounded-md p-2"
                            min={minDate}
                            max={today}
                            required
                        />
                        {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}

                    </div>

                    <div>
                        <label className="block font-medium mb-1">Teléfono</label>
                        <input
                            type="text"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            maxLength={20}
                            className="w-full border rounded-md p-2"
                            placeholder="+57 1234567890"
                            required
                        />
                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}

                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Crear Usuario
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateUserPage;
