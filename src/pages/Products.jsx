import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import ModalCarrinho from '../components/ModalCarrinho'

import '../css/products.css'

export default function Products() {
    const navigate = useNavigate()

    const [produtos, setProdutos] = useState([])
    const [carrinho, setCarrinho] = useState([])

    const [msgButton, setMsgButton] = useState({})

    const [openModalCarrinho, setOpenModalCarrinho] = useState(false)

    const [mostrarFiltro, setMostrarFiltro] = useState(false)
    const [filtroSelecionado, setFiltroSelecionado] = useState('')

    useEffect(() => {
        // Adiciona o ID ao body quando o componente é montado
        document.body.id = 'products-page'

        // Remove o ID do body quando o componente é desmontado
        return () => {
            document.body.id = ''
        };
    }, []);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => setProdutos(data))
    }, [])

    //Navega para a tela de Detalhes do Produto
    const handleClickDetails = (id) => {
        navigate(`/products/${id}`)
    }

    const handleAddToCart = (id, title, image, price, qtd = 1) => {

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

        // Define a mensagem de 'Adicionado' para o item específico
        setMsgButton((prev) => ({ ...prev, [id]: "Adicionado" }));

        // Remove a mensagem após 3 segundos
        setTimeout(() => {
            setMsgButton((prev) => ({ ...prev, [id]: "Adicionar Ao Carrinho" }));
        }, 2000);
        
    };

    //Mostra o Modal do carrinho
    const handleCarrinho = () => {
        setOpenModalCarrinho(true)
    }

    //Faz os filtros apareceram ou não
    const handleFiltro = () => {
        setMostrarFiltro(!mostrarFiltro)
    }

    //Pega o filtro selecionado para filtrar os produtos
    const handleFiltroSelecionado = (categoria) => {
        setFiltroSelecionado(categoria)
    }

    // Filtra os produtos com base no filtro selecionado
    const produtosFiltrados = filtroSelecionado 
        ? produtos.filter(({ category }) => category === filtroSelecionado)
        : produtos;

    //Faz Logout
    const handleLogout = () => {1
        navigate(`/`)
    }

    return (
        <div className="products-container">
            <header className="products-header">
                <i className="fi fi-br-shopping-cart" onClick={handleCarrinho} alt='Carrinho'>
                    {carrinho.length > 0 && <span className="cart-count">{carrinho.length}</span>}
                </i>
                <i className="fi fi-br-bars-filter" onClick={handleFiltro} alt='Filtros'></i>
                <i className="fi fi-rr-exit" onClick={handleLogout} alt='Logout'></i>
            </header>

            {openModalCarrinho && <ModalCarrinho setOpenModalCarrinho={() => setOpenModalCarrinho(!openModalCarrinho)} carrinho={carrinho} setCarrinho={setCarrinho}/>}

            <div className="DivtituloProdutos">
                <h1 className="tituloProdutos">PRODUTOS</h1>
            </div>
            
            {mostrarFiltro && 
                <div className="products-filters">
                    <ul>
                        {[...new Set(produtos.map(({ category }) => category))].map((category) => (
                            <li className="products-filters-itens" key={category} onClick={() => handleFiltroSelecionado(category)}>{category}</li>
                        ))}
                        <li className="products-filters-itens" onClick={() => handleFiltroSelecionado('')}>Limpar filtro</li>
                    </ul>
                </div>
            }

            <div className="products-grid">
                {produtosFiltrados.map(({id, title, image, price}) => (
                    <div key={id} className="product-card" onClick={() => handleClickDetails(id)}>
                        <img src={image} alt={title} />
                        <h2>{title}</h2>
                        <div className="product-price">R$ {price.toFixed(2)}</div>
                        <p>Clique para ver mais detalhes</p>
                        <button className={`add-to-cart-button ${msgButton[id] === "Adicionado" ? "added" : ""}`} 
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(id, title, image, price) }}>
                            {msgButton[id] === "Adicionado" ? (
                                <>
                                    <i className="fi fi-br-check"></i> {/* Ícone que você deseja usar */}
                                    {msgButton[id]}
                                </>
                                ) : (
                                    msgButton[id] || "Adicionar ao Carrinho"
                                )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

