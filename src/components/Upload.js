import { useState, useRef, useCallback, useEffect } from 'react';
import './styles/Upload.css';
import { Link } from "react-router-dom";

function Upload() {
  // document.title = "FastUp - Upload";
  const [uploadStatus, setUploadStatus] = useState(" ");
  const [statusClass, setStatusClass] = useState("status");
  const [isDragging, setIsDragging] = useState(false);
  const [showDropOverlay, setShowDropOverlay] = useState(false);
  const fileInputRef = useRef(null);

  // Função que gerencia o evento de arrastar arquivos
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
      setShowDropOverlay(true);
    }
  }, [isDragging]);

  // Função que gerencia o evento que sai da área de arrastar
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Verifica se o mouse saiu da janela ou do elemento raiz
    if (e.clientX <= 0 || e.clientY <= 0 || 
        e.clientX >= window.innerWidth || e.clientY >= window.innerHeight) {
      setIsDragging(false);
      setShowDropOverlay(false);
    }
  }, []);

  // Função que gerencia o evento que solta o arquivo
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setShowDropOverlay(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, []);

  // Função que gerencia a mudança no input do arquivo
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  // Função que gerencia o evento de upload do arquivo
  const handleFileUpload = async (file) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    // Já no frontend, realiza a verificação do tamanho do arquivo
    if(file.size > 10000000) {
      setUploadStatus("O arquivo não pode ser maior que 10MB.");
      setStatusClass("status status-error");
      return;
    }

    // Faz a tentativa de contato com a API de upload de arquivo
    
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/files/upload", {
        method: "POST",
        body: formData,
      });
      
      // Caso seja bem sucedida, exibe a mensagem de sucesso e coleta o código gerado pelo backend
      if (response.ok) {
        const data = await response.json();
        setUploadStatus("Upload Concluído! Código: " + data.fileCode);
        setStatusClass("status status-success");

      }
      // Caso não seja bem sucedida, exibe o erro.
      else {
        console.error("Falha no upload:", response.statusText);
        setUploadStatus("Falha no upload do arquivo.");
        setStatusClass("status status-error");
      }
    }
    // Casa alguma falha na conexão, coleta o erro e imprime no console.
    catch (error) {
      console.error("Erro no upload:", error);
      setUploadStatus("Erro de conexão. Tente novamente.");
      setStatusClass("status status-error");
    }
  };

  // Função que aciona o input do arquivo
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Adiciona os event listeners para a janela inteira
  useEffect(() => {
    const handleWindowDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleWindowDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener('dragover', handleWindowDragOver);
    window.addEventListener('drop', handleWindowDrop);

    return () => {
      window.removeEventListener('dragover', handleWindowDragOver);
      window.removeEventListener('drop', handleWindowDrop);
    };
  }, []);

  return (
    <>
      {/* Disclaimer no canto superior direito */}
      <div className="disclaimer">
        Atenção essa é apenas uma DEMO! Por favor, não faça uploads de arquivos importantes/sensíveis, pois não tem data para deleção MAS SERÃO DELETADOS SEM AVISO! Logo o serviço completo estará pronto! Obrigado.
      </div>
      
      {/* Overlay de drag and drop para a tela inteira */}
      {showDropOverlay && (
        <div 
          className="fullscreen-drop-overlay"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="drop-overlay-content">
            <div className="upload-icon-container large">
              <svg className="upload-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill="currentColor"/>
                <path d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z" fill="currentColor"/>
              </svg>
            </div>
            <h2 className="drop-title">Solte o arquivo para fazer upload</h2>
            <p className="drop-subtitle">Solte o arquivo em qualquer lugar desta página</p>
          </div>
        </div>
      )}
      
      {/* Container principal */}
      <div className="app-container">
        <div className="card">
          <div className="header">
            <h1 className="logo">
              <span className="logo-fast">Fast</span>
              <span className="logo-up">Up</span>
            </h1>
            <p className="subtitle">Upload e download rápido de arquivos</p>
          </div>

          {/* Área e Seção de Upload */}
          <div 
            className="upload-area"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileInput}
          >
            <div className="upload-content">
              <input 
                ref={fileInputRef}
                type="file" 
                id="file-upload" 
                onChange={handleFileInputChange} 
                className="file-input" 
              />
              <div className="upload-icon-container">
                <svg className="upload-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill="currentColor"/>
                  <path d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="upload-text">
                <p className="upload-title">
                  Arraste e solte seu arquivo
                </p>
                <p className="upload-subtitle">ou clique para procurar</p>
              </div>
            </div>
          </div>

          <p className={statusClass}>
            {uploadStatus}
          </p>

          <div className="divider">
            <span>ou</span>
          </div>

          {/* Link para a Sessão de Download */}
          <div className="download-section">
            <Link to="/download" className="download-link">
              <svg className="download-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill="currentColor"/>
                <path d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z" fill="currentColor"/>
              </svg>
              Baixar um arquivo
            </Link>
          </div>

          {/* Botões do GitHub */}
          <div className="github-buttons">
            <a 
              href="https://github.com/devsants/fastup-api" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-button"
            >
              <svg className="github-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"/>
              </svg>
              Veja a API
            </a>
            <a 
              href="https://github.com/devsants/fastup-front" 
              target="_blank" 
              rel="noopener noreferrer"
              className="github-button"
            >
              <svg className="github-icon" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0.296997C5.37 0.296997 0 5.67 0 12.297C0 17.6 3.438 22.097 8.205 23.682C8.805 23.795 9.025 23.424 9.025 23.105C9.025 22.82 9.015 22.065 9.01 21.065C5.672 21.789 4.968 19.455 4.968 19.455C4.422 18.07 3.633 17.7 3.633 17.7C2.546 16.956 3.717 16.971 3.717 16.971C4.922 17.055 5.555 18.207 5.555 18.207C6.625 20.042 8.364 19.512 9.05 19.205C9.158 18.429 9.467 17.9 9.81 17.6C7.145 17.3 4.344 16.268 4.344 11.67C4.344 10.36 4.809 9.29 5.579 8.45C5.444 8.147 5.039 6.927 5.684 5.274C5.684 5.274 6.689 4.952 8.984 6.504C9.944 6.237 10.964 6.105 11.984 6.099C13.004 6.105 14.024 6.237 14.984 6.504C17.264 4.952 18.269 5.274 18.269 5.274C18.914 6.927 18.509 8.147 18.389 8.45C19.154 9.29 19.619 10.36 19.619 11.67C19.619 16.28 16.814 17.295 14.144 17.59C14.564 17.95 14.954 18.686 14.954 19.81C14.954 21.416 14.939 22.706 14.939 23.096C14.939 23.411 15.149 23.786 15.764 23.666C20.565 22.092 24 17.592 24 12.297C24 5.67 18.627 0.296997 12 0.296997Z"/>
              </svg>
              Veja o Frontend
            </a>
          </div>

          {/* Créditos discretos no final */}
          <div className="credits">
            Desenvolvido por <a href="https://github.com/devsants" target="_blank" rel="noopener noreferrer">devSants</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;