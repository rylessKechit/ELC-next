// components/about/TimelineSection.jsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const TimelineSection = () => {
  const [isHorizontal, setIsHorizontal] = useState(false);
  const containerRef = useRef(null);

  // Check if we have enough space for horizontal layout
  useEffect(() => {
    const checkLayout = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setIsHorizontal(containerWidth >= 1200); // Switch to horizontal if width > 1200px
      }
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  const timelineEvents = [
    {
      year: '2018',
      title: 'Naissance de l\'Idée',
      description: 'Après des années d\'expérience comme chauffeurs privés pour des compagnies prestigieuses, nos deux fondateurs imaginent un service plus personnalisé axé sur l\'excellence.',
      icon: 'fas fa-lightbulb',
      color: 'bg-blue-500'
    },
    {
      year: '2019',
      title: 'Fondation d\'Elysian Luxury Chauffeurs',
      description: 'Avec deux véhicules et une passion commune pour le service d\'exception, nos fondateurs lancent officiellement leur entreprise dans l\'Essonne.',
      icon: 'fas fa-flag',
      color: 'bg-green-500'
    },
    {
      year: '2020',
      title: 'Développement en période difficile',
      description: 'Malgré les défis de la pandémie, nous avons su nous adapter en proposant des services sécurisés et en établissant des partenariats solides.',
      icon: 'fas fa-shield-alt',
      color: 'bg-purple-500'
    },
    {
      year: '2022',
      title: 'Expansion de la flotte',
      description: 'Acquisition de nouveaux véhicules premium et développement de notre offre de services pour répondre à une clientèle grandissante.',
      icon: 'fas fa-car',
      color: 'bg-orange-500'
    },
    {
      year: '2023',
      title: 'Engagement écologique',
      description: 'Introduction de véhicules 100% électriques dans notre flotte et mise en place de pratiques respectueuses de l\'environnement.',
      icon: 'fas fa-leaf',
      color: 'bg-emerald-500'
    },
    {
      year: '2025',
      title: 'Aujourd\'hui',
      description: 'Nous continuons d\'innover et d\'offrir un service d\'excellence avec une équipe dévouée et une flotte diversifiée pour tous vos besoins de transport haut de gamme.',
      icon: 'fas fa-star',
      color: 'bg-primary'
    }
  ];

  // Animation hook for each timeline item
  const TimelineItem = ({ event, index, isLast }) => {
    const { ref, inView } = useInView({
      threshold: 0.3,
      triggerOnce: true
    });

    return (
      <div
        ref={ref}
        className={`timeline-item ${
          isHorizontal ? 'horizontal-item' : 'vertical-item'
        } ${inView ? 'in-view' : ''}`}
        style={{ animationDelay: `${index * 0.2}s` }}
      >
        {isHorizontal ? (
          <HorizontalTimelineItem event={event} index={index} isLast={isLast} />
        ) : (
          <VerticalTimelineItem event={event} index={index} isLast={isLast} />
        )}
      </div>
    );
  };

  const VerticalTimelineItem = ({ event, index, isLast }) => (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200"></div>
      )}
      
      {/* Timeline dot */}
      <div className={`absolute left-4 top-6 w-4 h-4 ${event.color} rounded-full border-4 border-white shadow-lg z-10`}></div>
      
      {/* Content */}
      <div className="ml-16 pb-12">
        <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
          <div className="flex items-center mb-4">
            <div className={`w-12 h-12 ${event.color} rounded-full flex items-center justify-center mr-4`}>
              <i className={`${event.icon} text-white text-xl`}></i>
            </div>
            <div>
              <span className={`inline-block px-3 py-1 ${event.color} text-white text-sm font-bold rounded-full`}>
                {event.year}
              </span>
              <h3 className="text-xl font-bold text-secondary mt-2">{event.title}</h3>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );

  const HorizontalTimelineItem = ({ event, index, isLast }) => (
    <div className="flex flex-col items-center text-center min-w-0 flex-1">
      {/* Content card */}
      <div className="bg-white rounded-lg shadow-lg p-6 w-64 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 mb-8">
        <div className={`w-16 h-16 ${event.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <i className={`${event.icon} text-white text-2xl`}></i>
        </div>
        <span className={`inline-block px-3 py-1 ${event.color} text-white text-sm font-bold rounded-full mb-3`}>
          {event.year}
        </span>
        <h3 className="text-lg font-bold text-secondary mb-3">{event.title}</h3>
        <p className="text-gray-700 text-sm leading-relaxed">{event.description}</p>
      </div>
      
      {/* Timeline dot and line */}
      <div className="relative">
        <div className={`w-6 h-6 ${event.color} rounded-full border-4 border-white shadow-lg`}></div>
        {!isLast && (
          <div className="absolute left-6 top-3 w-64 h-0.5 bg-gray-200"></div>
        )}
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">

        <div className={`timeline-container ${isHorizontal ? 'horizontal-timeline' : 'vertical-timeline'}`}>
          {timelineEvents.map((event, index) => (
            <TimelineItem
              key={event.year}
              event={event}
              index={index}
              isLast={index === timelineEvents.length - 1}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline-item {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.6s ease-out;
        }

        .timeline-item.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        .vertical-timeline .timeline-item:nth-child(even) .bg-white {
          transform: translateX(-10px);
        }

        .vertical-timeline .timeline-item:nth-child(odd) .bg-white:hover {
          transform: translateY(-4px) translateX(10px);
        }

        .vertical-timeline .timeline-item:nth-child(even) .bg-white:hover {
          transform: translateY(-4px) translateX(-20px);
        }

        .horizontal-timeline {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          overflow-x: auto;
          padding: 2rem 0;
        }

        .horizontal-timeline .timeline-item {
          transform: translateY(50px);
        }

        .horizontal-timeline .timeline-item.in-view {
          transform: translateY(0);
        }

        .vertical-timeline {
          max-width: 4xl;
          margin: 0 auto;
        }

        @media (max-width: 1199px) {
          .horizontal-timeline {
            flex-direction: column;
          }
        }

        /* Animation pour les icônes */
        .timeline-item.in-view .fa-lightbulb {
          animation: pulse 2s infinite;
        }

        .timeline-item.in-view .fa-flag {
          animation: wave 1.5s ease-in-out;
        }

        .timeline-item.in-view .fa-shield-alt {
          animation: shield 1s ease-out;
        }

        .timeline-item.in-view .fa-car {
          animation: drive 1.5s ease-out;
        }

        .timeline-item.in-view .fa-leaf {
          animation: grow 1.2s ease-out;
        }

        .timeline-item.in-view .fa-star {
          animation: sparkle 1.5s ease-out;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        @keyframes wave {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(10deg); }
          75% { transform: rotate(-10deg); }
          100% { transform: rotate(0deg); }
        }

        @keyframes shield {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        @keyframes drive {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(0); }
        }

        @keyframes grow {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        @keyframes sparkle {
          0% { transform: rotate(0deg) scale(0); }
          50% { transform: rotate(180deg) scale(1.3); }
          100% { transform: rotate(360deg) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default TimelineSection;