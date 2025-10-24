import {Link} from "react-router-dom";
import "./styles/Download.css";


function Download() {

  // Função que gerencia o evento de download do arquivo pelo código informado
  const getFile = () => {
    const code = document.querySelector("input[type='text']").value;
    if (!code) {
        alert("Por favor, insira o código do arquivo.");
        return;
    }
    
    // Envia o código para o endpoint da API.
    fetch(process.env.REACT_APP_API_URL + `/files/download/${code}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("File download failed.");
            }
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
        // Abre a janela de download do arquivo para o cliente
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
        // Caso o código esteja errado envia o alerta.
        .catch((error) => {
            alert("Erro ao baixar o arquivo. Verifique o código e tente novamente.");
        });
  }

  return (
    <>
      <div className="disclaimer">
        Atenção essa é apenas uma DEMO! Favor não fazer uploads de arquivos importantes / sensiveis pois não tem data para deleção MAS SERÃO DELETADOS SEM AVISO! Logo o serviço estará pronto! Aguarde.
      </div>  
      <div className="app-container">
        <div className="card">
          <div className="header">
            <h1 className="logo">
              <span className="logo-fast">Fast</span>
              <span className="logo-up">Up</span>
            </h1>
            <p className="subtitle">Baixe seus arquivos rapidamente</p>
          </div>

          {/* Sessão de download */}

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

          {/* Link para a Sessão de Upload */}

          <div className="upload-section">
            <Link to="/upload" className="upload-link">
              <svg className="upload-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 15H13V9H16L12 4L8 9H11V15Z" fill="currentColor"/>
                <path d="M20 18H4V11H2V18C2 19.103 2.897 20 4 20H20C21.103 20 22 19.103 22 18V11H20V18Z" fill="currentColor"/>
              </svg>
              Enviar um novo arquivo
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
          <div className="credits">
            Desenvolvido por <a href="https://github.com/devsants" target="_blank" rel="noopener noreferrer">Ricardo Oliveira</a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Download;