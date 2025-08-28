import {Link} from "react-router-dom";
import "./styles/Download.css";


function Download() {
  // document.title = "FastUp - Download";
  const getFile = () => {
    const code = document.querySelector("input[type='text']").value;
    if (!code) {
        alert("Por favor, insira o código do arquivo.");
        return;
    }
    
    // Envia o código para o endpoint da API.
    fetch(`https://api.fastup.top:443/files/download/${code}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("File download failed.");
            }
            // Obter o filename do header Content-Disposition
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename = `file${code}`;
            if (contentDisposition) {
              const filenameMatch = contentDisposition.match(/filename*?=(?:UTF-8'')?["']?([^;"']+)["']?/i);
              if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1];
              }
            }
            
            return response.blob().then(blob => ({ blob, filename }));
        })
        .then(({ blob, filename }) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            
            // Limpeza
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        })
        .catch((error) => {
            alert("Erro ao baixar o arquivo. Verifique o código e tente novamente.");
        });
  }

  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <h1 className="logo">
            <span className="logo-fast">Fast</span>
            <span className="logo-up">Up</span>
          </h1>
          <p className="subtitle">Baixe seus arquivos rapidamente</p>
        </div>

        <div className="download-section">
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Digite o código do arquivo"
              className="code-input"
              onKeyPress={(e) => {
                if (e.key === 'Enter') getFile();
              }}
            />
            <button onClick={getFile} className="download-btn">
              <svg className="download-btn-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill="currentColor"/>
                <path d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z" fill="currentColor"/>
              </svg>
              Baixar
            </button>
          </div>
        </div>

        <div className="divider">
          <span>ou</span>
        </div>

        <div className="upload-section">
          <Link to="/upload" className="upload-link">
            <svg className="upload-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill="currentColor"/>
              <path d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z" fill="currentColor"/>
            </svg>
            Enviar um novo arquivo
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Download;