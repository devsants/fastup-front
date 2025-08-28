import { useState, useRef, useCallback, useEffect } from 'react';
import './styles/Upload.css';
import { Link } from "react-router-dom";

function Upload() {
  document.title = "FastUp - Upload";
  const [uploadStatus, setUploadStatus] = useState(" ");
  const [statusClass, setStatusClass] = useState("status");
  const [isDragging, setIsDragging] = useState(false);
  const [showDropOverlay, setShowDropOverlay] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
      setShowDropOverlay(true);
    }
  }, [isDragging]);

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

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = async (file) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    if(file.size > 10000000) {
      setUploadStatus("O arquivo não pode ser maior que 10MB.");
      setStatusClass("status status-error");
      return;
    }
    
    try {
      const response = await fetch("http://api.fastup.top:8080/files/upload", {
        method: "POST",
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setUploadStatus("Upload Concluído! Código: " + data.fileCode);
        setStatusClass("status status-success");
      } else {
        console.error("Falha no upload:", response.statusText);
        setUploadStatus("Falha no upload do arquivo.");
        setStatusClass("status status-error");
      }
    } catch (error) {
      console.error("Erro no upload:", error);
      setUploadStatus("Erro de conexão. Tente novamente.");
      setStatusClass("status status-error");
    }
  };

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

      <div className="app-container">
        <div className="card">
          <div className="header">
            <h1 className="logo">
              <span className="logo-fast">Fast</span>
              <span className="logo-up">Up</span>
            </h1>
            <p className="subtitle">Upload e download rápido de arquivos</p>
          </div>

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

          <div className="download-section">
            <Link to="/download" className="download-link">
              <svg className="download-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill="currentColor"/>
                <path d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z" fill="currentColor"/>
              </svg>
              Baixar um arquivo
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Upload;