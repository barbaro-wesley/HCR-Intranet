import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import hcrLogo from './assets/hcr-logo.png'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileImage } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function Data() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // Adiciona um estado para controlar se a sidebar está contraída

  // Mapeamento dos links e gráficos
  const graficoLinks = {
    'Cadastros-por-raça': {
      resource: "/adhoc/Marau/Cadastros/Cadastros___Ativos_por_Raça_Cor",
      auth: {
        name: "alexandre_conteratto",
        password: "AC@bi2023"
      },
    },
    'Internados-setor': {
      resource: "/adhoc/Marau/ESUS___Atendimento_Individual/ESUS___Ficha_Atendimento_Individual___Por_Sexo",
      auth: {
        name: "alexandre_conteratto",
        password: "AC@bi2023"
      },
    },
    'Cirurgia-cirurgiao': {
      resource: "/adhoc/HCR__Marau_/Cirurgias/HCR___Cirurgias_Por_Cirurgião_Complexidade___Mensal",
      auth: {
        name: "alexandre_conteratto",
        password: "AC@bi2023"
      },
    },
    'Cirurgia-complexidade': {
      resource: "/adhoc/HCR__Marau_/Cirurgias/HCR___Cirurgias_Por_Complexidade___Mensal",
      auth: {
        name: "alexandre_conteratto",
        password: "AC@bi2023"
      },
    },
    'Cirurgia-localidade': {
      resource: "/adhoc/HCR__Marau_/Cirurgias/HCR___Cirurgias_Por_Localidade_Complexidade___Mensal",
      auth: {
        name: "alexandre_conteratto",
        password: "AC@bi2023"
      },
    },
    'atendimento-cbo': {
      resource: "/adhoc/HCR__Marau_/Estatísticas/Atendimentos___Por_CBO",
      auth: {
        name: "alexandre_conteratto",
        password: "AC@bi2023"
      },
    },
    'atendimento-cores': {
      resource: "/adhoc/HCR__Marau_/Estatísticas/Atendimentos___Por_Escala_Manchester",
      auth: {
        name: "alexandre_conteratto",
        password: "AC@bi2023"
      },
    },
    'ocupacao': {
      resource: "/adhoc/HCR__Marau_/Estatísticas/HCR____Ocupação",
      auth: {
        name: "alexandre_conteratto",
        password: "AC@bi2023"
      },
    },
  };

  const loadGrafico = (menuOption) => {
    const grafico = graficoLinks[menuOption];
    if (grafico) {
      window.visualize({
        auth: grafico.auth
      }, function(v) {
        v("#container").adhocView({
          resource: grafico.resource,
          error: function(e) {
            console.error(e);
            alert("Erro ao carregar gráfico");
          }
        });
      });
    }
  };

  useEffect(() => {
    if (selectedMenu) {
      loadGrafico(selectedMenu);
    }
  }, [selectedMenu]);

  // Função para exportar o gráfico e logo como PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const imgLogo = hcrLogo;
    const logoWidth = 70;
    const logoHeight = 30;
    const logoX = (pageWidth - logoWidth) / 2;
    doc.addImage(imgLogo, 'PNG', logoX, 10, logoWidth, logoHeight);

    const chartContainer = document.getElementById('container');
    html2canvas(chartContainer).then((canvas) => {
      const imgWidth = 190;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/png');
      doc.addImage(imgData, 'PNG', 10, 50, imgWidth, imgHeight);
      doc.save('relatorio-hospital.pdf');
    });
  };

  // Função para exportar como PNG
  const exportAsImage = () => {
    const container = document.getElementById('container');
    html2canvas(container).then(canvas => {
      const link = document.createElement('a');
      link.download = `${selectedMenu}-grafico.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar setMessage={setSelectedMenu} setIsSidebarCollapsed={setIsSidebarCollapsed} />

      {/* Área principal */}
      <div
        style={{
          marginLeft: isSidebarCollapsed ? '60px' : '260px', // Ajusta dinamicamente a margem dependendo da contração da sidebar
          padding: '20px',
          width: '100%',
          transition: 'margin-left 0.3s ease', // Animação suave
        }}
      >
        <h1>{selectedMenu || 'Selecione uma opção do menu'}</h1>

        {/* Botões de exportação */}
        {selectedMenu && (
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}> {/* Botões lado a lado */}
            <button onClick={exportAsImage} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <FontAwesomeIcon icon={faFileImage} style={{ marginRight: '5px', color: 'green' }} />
              Exportar como PNG
            </button>
            <button onClick={generatePDF} style={{ display: 'flex', alignItems: 'center', padding: '10px 20px' }}>
              <FontAwesomeIcon icon={faFilePdf} style={{ marginRight: '5px', color: 'red' }} />
              Exportar como PDF
            </button>
          </div>
        )}

        {/* Contêiner para o gráfico */}
        <div
          id="container"
          style={{
            width: '100%',
            minWidth: '1000px',
            minHeight: '600px',
            overflowX: 'auto',
            overflowY: 'auto',
            border: '1px solid #ccc',
            padding: '10px',
            boxSizing: 'border-box',
            backgroundColor: 'white',
          }}
        >
          {/* O gráfico será inserido aqui */}
        </div>
      </div>
    </div>
  );
}

export default Data;
