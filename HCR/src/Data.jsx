import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import hcrLogo from './assets/hcr-logo.png'; // Importe a logo do hospital
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faFileImage } from '@fortawesome/free-solid-svg-icons'; // Ícones de PDF e PNG
import './App.css';

function Data() {
  const [selectedMenu, setSelectedMenu] = useState('');

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

    // Definir o tamanho do PDF (A4: 210mm x 297mm)
    const pageWidth = doc.internal.pageSize.getWidth();

    // Adiciona a logo centralizada e um pouco maior
    const imgLogo = hcrLogo;
    const logoWidth = 70; // Aumentar levemente o tamanho da logo
    const logoHeight = 30;
    const logoX = (pageWidth - logoWidth) / 2; // Centraliza a logo horizontalmente
    doc.addImage(imgLogo, 'PNG', logoX, 10, logoWidth, logoHeight);

    // Capturar o gráfico com html2canvas
    const chartContainer = document.getElementById('container');
    html2canvas(chartContainer).then((canvas) => {
      const imgWidth = 190; // Largura do gráfico no PDF
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Altura proporcional

      const imgData = canvas.toDataURL('image/png'); // Converte o gráfico para PNG
      doc.addImage(imgData, 'PNG', 10, 50, imgWidth, imgHeight); // Adiciona o gráfico abaixo da logo

      // Salva o PDF com a logo e gráfico
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
      <Sidebar setMessage={setSelectedMenu} />

      {/* Área principal */}
      <div style={{ marginLeft: '260px', padding: '20px', width: '100%' }}>
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
            minHeight: '600px',  // Define uma altura maior para o contêiner
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
