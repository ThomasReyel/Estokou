import '../css/BaseBoard.css';
function BaseBoard() {
  return (

    <div className="baseboard">
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>Sobre</h4>
            <p>Sistema de Gerenciamento de Estoque feito para simplificar sua vida.</p>
          </div>
          <div className="footer-section">
            <h4>Contato</h4>
            <p><i className="fas fa-envelope"></i> suporte@sistema.com</p>
            <p><i className="fas fa-phone"></i> +55 (84) 1234-5678</p>
          </div>
        </div>
      </footer>
    </div>

  );
}

export default BaseBoard;