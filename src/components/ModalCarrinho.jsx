import { useNavigate } from "react-router-dom";
import '../css/modal.css';
import { useState } from "react";

export default function ModalCarrinho({ setOpenModalCarrinho, carrinho, setCarrinho }) {
    const navigate = useNavigate();

    const total = carrinho.reduce((acc, { price, qtd }) => acc + (price * qtd), 0);

    const handleFinalizar = () => {
        navigate('/CheckOut', { state: { carrinho } });
    };

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

    const handlerMaisQtd = (id) => {
        setCarrinho(carrinho.map(item => {
            if (item.id === id) {
                return { ...item, qtd: item.qtd + 1 };
            }
            return item;
        }));
    };

    const handlerExcluir = (id) => {
        setCarrinho(carrinho.filter(item => item.id !== id));
    };

    return (
        <div className="backgroundModal">
            <div className="modalcarrinho">
                <button className="closeButton modalcarrinhobutton" onClick={() => setOpenModalCarrinho(false)}>X</button>
                <h1>Carrinho</h1>
                <table className="carrinhoTable">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Produto</th>
                            <th>Descrição</th>
                            <th>Quantidade</th>
                            <th>Preço</th>
                            <th>OBS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrinho.map(({ id, title, image, price, qtd }, index) => (
                            <tr key={id}>
                                <td>{index + 1}</td>
                                <td><img src={image} className="itensCarrinhoImagem" alt={title} /></td>
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
                        <tr className="totalRow">
                            <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                            <td>R$ {total.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>
                {carrinho.length === 0 ?
                    <button className="buttonCarrinho" disabled>FINALIZAR</button> :
                    <button className="buttonCarrinho" onClick={handleFinalizar}>FINALIZAR</button>}
            </div>
        </div>
    );
}
