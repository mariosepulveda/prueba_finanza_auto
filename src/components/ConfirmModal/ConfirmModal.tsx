import React from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    userName?: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose, onConfirm, userName }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
            <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">¿Estás seguro?</h2>
                <p className="text-gray-600 mb-6">
                    Estás a punto de eliminar al usuario <span className="font-semibold">{userName}</span>. Esta acción no se puede deshacer.
                </p>
                <div className="flex justify-end space-x-3">
                    <button
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 transition"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
                        onClick={onConfirm}
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
