import '../css/notFound.css'


function NotFound() {
    return (
      <div className="not-found-container">
        <h1 className="not-found-title">PÁGINA NÃO ENCONTRADA</h1>
        <p className="not-found-description">
          A página que você está procurando não existe. Por favor, verifique o endereço ou volte para a página inicial.
        </p>
        <button className="not-found-button" onClick={() => window.history.back()}>
          Voltar
        </button>
      </div>
    );
  }
  
  export default NotFound;
  