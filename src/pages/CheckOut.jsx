import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react"
import '../css/checkout.css'

export default function CheckOut() {

    const location = useLocation();
    const navigate = useNavigate();

     const { carrinho: carrinhoInicial } = location.state || { carrinho: [] };

    // Use um estado local para gerenciar o carrinho, se necessário
    const [carrinho, setCarrinho] = useState(carrinhoInicial);

    // Calcula o total
    const total = carrinho.reduce((acc, { price, qtd }) => acc + (price * qtd), 0);


    const botaoVoltar = () => {
        navigate('/products' , {state: {carrinho}});
    }


    const handleFinalizado = () => {
        alert('Compra finalizada com sucesso');
         navigate('/products')

    };

    //Quantidade Botão -
    const handlerMaisQtd = (id) => {
        setCarrinho(carrinho.map(item => {
            if (item.id === id) {
                return { ...item, qtd: item.qtd + 1 };
            }
            return item;
        }));
    };

    //Quantidade Botão Menos
    const handlerMenosQtd = (id) => {
        setCarrinho(carrinho.map(item => {
            if (item.id === id) {
                // Se a quantidade for 1, removemos o item do carrinho
                if (item.qtd <= 1) {
                    return null; // Indicamos que o item deve ser removido
                } else {
                    return { ...item, qtd: item.qtd - 1 };
                }
            }
            return item;
        }).filter(item => item !== null)); // Remove os itens nulos
    };

    const handlerExcluir = (id) => {
        setCarrinho(carrinho.filter(item => item.id !== id));
    };



    return (
        
        <div className="checkout-container">

            
            <div className="products-list">
            
            <button onClick={botaoVoltar}>VOLTAR</button>
                <h2>Seus Produtos</h2>
                <div className="products-table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Imagem</th>
                                <th>Produto</th>
                                <th>Quantidade</th>
                                <th>Preço</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {carrinho.map(({ id, title, image, price, qtd }, index) => (
                                <tr key={id}>
                                    <td>{index + 1}</td>
                                    <td><img src={image} alt={title} className="product-image" /></td>
                                    <td>{title}</td>
                                    <td className="quantity-buttons">
                                        {qtd == 1 ? <button className="quantity-button" disabled>-</button> : <button className="quantity-button" onClick={() => handlerMenosQtd(id)}>-</button>}
                                        <span className="quantity-display">{qtd}</span>
                                        <button className="quantity-button" onClick={() => handlerMaisQtd(id)}>+</button>
                                    </td>
                                    <td>R$ {price.toFixed(2)}</td>
                                    <td>
                                        <button className="btnExcluir" onClick={() => handlerExcluir(id)}>Excluir</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="total-section">
                    <span className="total-label">Total:</span>
                    <span className="total-amount">R$ {total.toFixed(2)}</span>
                </div>

                {/* Seção de modos de pagamento */}
                <div className="payment-methods">
                    <h3>Escolha o Método de Pagamento</h3>
                    <div className="payment-option">
                        <input type="radio" id="credit-card" name="payment-method" value="credit-card" />
                        <label htmlFor="credit-card">Cartão de Crédito</label>
                    </div>
                    <div className="payment-option">
                        <input type="radio" id="boleto" name="payment-method" value="boleto" />
                        <label htmlFor="boleto">Boleto Bancário</label>
                    </div>
                    <div className="payment-option">
                        <input type="radio" id="pix" name="payment-method" value="pix" />
                        <label htmlFor="pix">PIX</label>
                    </div>
                </div>

                {carrinho.length > 0 ? <button type="submit" className="finalize-button" onClick={handleFinalizado}>Finalizar Compra</button>: <button type="submit" className="finalize-button" disabled>Finalizar Compra</button>}
            </div>
        </div>
    );
}
