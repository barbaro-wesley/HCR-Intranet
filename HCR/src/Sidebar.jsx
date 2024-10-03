import React, { useState } from 'react';
import './Sidebar.css'; // Verifique se o CSS da Sidebar não está causando conflitos
import hcr from './assets/hcr-logo.png';

export default function Sidebar({ setMessage }) {
  // Estados para controlar a expansão dos menus
  const [showInternados, setShowInternados] = useState(false);
  const [showCirurgia, setShowCirurgia] = useState(false);
  const [showEmergencia, setShowEmergencia] = useState(false);

  return (
    <div className="sidebar1">
      <img src={hcr} alt="HCR Logo" />
      {/* Home Button */}
      <div className="menu-item1">
        <button className="menu-button1" onClick={() => setMessage('home')}>🏠 HOME</button>
      </div>

      {/* Internados Menu */}
      <div className="menu-item1">
        <button className="menu-button1" onClick={() => setShowInternados(!showInternados)}>
          🏥 Cadastros {showInternados ? '▲' : '▼'}
        </button>
        {showInternados && (
          <div className="sub-menu1">
            <button className="sub-menu-item1" onClick={() => setMessage('Cadastros-por-raça')}>
              Cadastro por raça.
            </button>
            <button className="sub-menu-item1" onClick={() => setMessage('Internados-setor')}>
              Internados por Setor
            </button>
          </div>
        )}
      </div>

      {/* Cirurgia Menu */}
      <div className="menu-item1">
        <button className="menu-button1" onClick={() => setShowCirurgia(!showCirurgia)}>
          🏥 Cirurgia {showCirurgia ? '▲' : '▼'}
        </button>
        {showCirurgia && (
          <div className="sub-menu1">
            <button className="sub-menu-item1" onClick={() => setMessage('Cirurgia-cirurgiao')}>
              Cirurgia por cirurgião
            </button>
            <button className="sub-menu-item1" onClick={() => setMessage('Cirurgia-complexidade')}>
              Cirurgia por complexidade
            </button>
            <button className="sub-menu-item1" onClick={() => setMessage('Cirurgia-localidade')}>
              Cirurgia por localidade
            </button>
          </div>
        )}
      </div>

      {/* Emergencia Menu */}
      <div className="menu-item1">
        <button className="menu-button1" onClick={() => setShowEmergencia(!showEmergencia)}>
          🏥 Emergência {showEmergencia ? '▲' : '▼'}
        </button>
        {showEmergencia && (
          <div className="sub-menu1">
            <button className="sub-menu-item1" onClick={() => setMessage('atendimento-cbo')}>
              Atendimento por CBO
            </button>
            <button className="sub-menu-item1" onClick={() => setMessage('atendimento-cores')}>
              Atendimento por Cores
            </button>
            <button className="sub-menu-item1" onClick={() => setMessage('ocupacao')}>
              Ocupação
            </button>
          </div>
        )}
      </div>
      
    </div>
  );
}
