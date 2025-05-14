import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

/**
 * Modal de gestion des notes
 */
const BookingNotesModal = ({ 
  showModal, 
  notes, 
  adminNotes, 
  onNotesChange, 
  onAdminNotesChange, 
  onSave, 
  onClose, 
  saving 
}) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Gestion des notes
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes client
              </label>
              <textarea
                value={notes}
                onChange={(e) => onNotesChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
                placeholder="Notes visibles par le client..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes administrateur
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => onAdminNotesChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows="4"
                placeholder="Notes internes (non visibles par le client)..."
              />
            </div>
          </div>
          
          <div className="mt-6 flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={onSave}
              disabled={saving}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors disabled:opacity-50"
            >
              {saving ? (
                <>
                  <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
                  Sauvegarde...
                </>
              ) : (
                'Sauvegarder'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingNotesModal;