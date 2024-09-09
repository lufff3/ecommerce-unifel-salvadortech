import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import '../css/details.css';
import '../css/notFound.css'

export default function ProductDetails() {
  const [produto, setProduto] = useState(null);
  const [loading,setLoading] = useState(true)

  const navigate = useNavigate();
  const params = useParams();

  const { carrinho } = location.state || { carrinho: [] };


  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${params.id}`)
      .then(response => response.json())
      .then(data => {setProduto(data);setLoading(false)})
      .catch(error => console.error('Error fetching product:', error));
  }, [params.id]);

  const handleAddToCart = (id, title, image, price, qtd = 1) => {
    // Implementar a lógica para adicionar ao carrinho
    console.log('Adicionar ao carrinho:', produto);

      const existingProduct = carrinho.find(item => item.id === id);
  
      if (existingProduct) {
          // Atualiza a quantidade do produto existente
          setCarrinho(carrinho.map(item => 
              item.id === id ? { ...item, qtd: item.qtd + qtd } : item
          ));
      } else {
          // Adiciona um novo produto com a quantidade inicial
          setCarrinho([...carrinho, { id, title, image, price, qtd }]);
      }

      
  };
  
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Estrelas completas
    const starsArray = Array(fullStars).fill('★'); // Adiciona estrelas cheias
    return starsArray.join(''); // Converte o array para uma string
  };


  if (loading) {
    return (
      <div className="notFound">
        Carregando Produto...
      </div>
    );
  }

  if (!produto) {
    return (
      <div className="notFound">
        Produto Não Encontrado
        <br />
        <button onClick={() => navigate('/products')}>Voltar</button>
      </div>
    );
  }

  return (
    <div className="productDetail-details-container">
      <button className="button-detalhes" onClick={() => navigate(-1)}>
         Voltar
      </button>
      <h1 className="productDetail-title">Detalhes do Produto</h1>
      <div className="productDetail-details-content">
        <img src={produto.image} alt={produto.title} className="productDetail-image" />
        <div className="productDetail-info">
          <h2 className="productDetail-name">{produto.title}</h2>
          <p className="productDetail-description">{produto.description}</p>
          <div className="productDetail-meta">
            <p className="productDetail-rating">
              
              Avaliação: {produto.rating?.rate} {renderStars(produto.rating?.rate)} ({produto.rating?.count} avaliações)
              </p>

            <p className="productDetail-price">Preço: R$ {produto.price.toFixed(2)}</p>
          </div>
          <button className='add-to-cart-button' onClick={handleAddToCart}>
             Adicionar ao Carrinho
          </button>
          {console.log(carrinho)}
        </div>
      </div>
    </div>
  );
}
