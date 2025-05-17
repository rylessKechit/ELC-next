import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

/**
 * Composant de navigation pour le planning
 */
const PlanningNavigation = ({ 
  view, 
  currentDate, 
  onNavigatePrevious, 
  onNavigateNext, 
  onNavigateToday,
  formatViewTitle 
}) => {
  // Ne pas afficher la navigation sur la vue liste
  if (view === 'list') return null;

  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onNavigatePrevious}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Période précédente"
      >
        <FontAwesomeIcon icon={faChevronLeft} className="h-5 w-5" />
      </button>
      
      <div className="text-center">
        <h3 className="font-semibold text-gray-900 text-sm">
          {formatViewTitle()}
        </h3>
        <button
          onClick={onNavigateToday}
          className="text-xs text-primary hover:underline mt-1"
        >
          Aller à aujourd'hui
        </button>
      </div>
      
      <button
        onClick={onNavigateNext}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label="Période suivante"
      >
        <FontAwesomeIcon icon={faChevronRight} className="h-5 w-5" />
      </button>
    </div>
  );
};

export default PlanningNavigation;