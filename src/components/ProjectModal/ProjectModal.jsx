import React, { useState, useEffect } from 'react';
import { FiX, FiGithub } from 'react-icons/fi';

const ProjectModal = ({ isOpen, onClose, project }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 w-full max-w-lg transform transition-transform duration-300 ${isClosing ? 'animate-out' : 'animate-in'}`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-56 object-cover rounded-t-2xl"
        />

        <div className="p-6 flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold text-white">{project.title}</h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10 -mt-2 -mr-2"
            >
              <FiX size={24} />
            </button>
          </div>

          <p className="text-gray-300 text-base leading-relaxed">
            {project.fullDescription}
          </p>

          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center gap-2 font-semibold bg-white text-black p-3 px-5 rounded-full w-full cursor-pointer border border-transparent hover:bg-gray-200 transition-colors"
          >
            <FiGithub />
            <span>Source Code</span>
          </a>
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;
