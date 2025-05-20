import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="w-full bg-white dark:bg-gray-900 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                {/* Logo / Title */}
                <div className="text-xl font-bold text-red-900 dark:text-white">
                    Módulo de consulta y registro de usuarios en el sistema
                </div>

                {/* Navigation */}
                <nav className="space-x-4 hidden md:flex">
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                        Inicio
                    </a>
                    <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                        Contacto
                    </a>
                </nav>

                {/* Botón (puede ser login/logout o modo oscuro) */}
                <div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Salir
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
