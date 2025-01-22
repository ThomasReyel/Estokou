import { useEffect, useState } from 'react';
import '../css/TableProdut.css';
import api from "../servico/App";
import profile from './Profiles';
import DropdownProd from './DropdownProd';


function TableProdut() {
    const [produtos, setProdutos] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchProdutos = async () => {
            const storageId = profile.getStorageId();
            try {
                const responseMovi = await api.get('/api/movimentacaos?id_estoque=' + storageId); // Altere para o endpoint correto
                const movimentacoes = responseMovi.data;
                const produtoIds = movimentacoes.map(mov => mov.id_prod);
                const produtosPromises = produtoIds.map(id =>
                    api.get(`/api/produtos?id=${id}`)
                );
                const responses = await Promise.all(produtosPromises);
                const produtos = responses.flatMap(res => res.data);
                setProdutos(produtos);


            } catch (err) {
                console.error("Erro ao buscar produtos: ", err);
            };
        }
        fetchProdutos();
    }, []);

    const produtosFiltrados = produtos
        .filter((produto, index, self) =>
            self.findIndex(p => p.id === produto.id) === index
        )
        .filter((produto) =>
            produto.nome.toLowerCase().includes(search.toLowerCase())
        );

    function handleEdit(id) {
        profile.setProductId(id);

    }

    function handleDelete(id) {
        if (window.confirm('Tem certeza de que deseja excluir este produto?')) {
            api.delete(`/api/produtos/${id}`)
                .then(() => {
                    alert('Produto excluído com sucesso!');
                    setProdutos((prevProdutos) => prevProdutos.filter(produto => produto.id !== id));
                })
                .catch((error) => {
                    console.error('Erro ao excluir o produto:', error);
                    alert('Erro ao excluir o produto.');
                });
        }
    }

    return (
        <div className="container">
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>
            <div className="header">
                <div className="search-bar">
                    <input type="text" placeholder="procurar" className="search-input" value={search} onChange={(e) => setSearch(e.target.value)}></input>
                </div>
                <div className="buttons">
                    <button className="btn"><a href='/usuario/produtos'><i className="fas fa-plus-circle"></i> Adicionar Produto</a></button>
                    <button className="btn"><a href='/usuario/produtos/desconto'><i className="fas fa-minus-circle"></i> Descontar Produto</a></button>
                    <button className="btn"><a href='/usuario/estoque'><i className="fas fa-box-open"></i> Adicionar Estoque</a></button>
                    <DropdownProd />


                </div>
            </div>

            <table className="table rounded-table">
                <thead>
                    <tr>
                        <th className='celulas1'>id</th>
                        <th>Nome</th>
                        <th className='celulas'>Quantidade</th>
                        <th>Valor de Compra</th>
                        <th>Valor de Venda</th>
                        <th className='celulas'>Fragilidade</th>
                        <th className='celulas'>Fornecedor</th>
                        <th className='celulas1'>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {produtosFiltrados.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td className='celulas'>{produto.quantidade}</td>
                            <td>{produto.valorCompra.toFixed(2)}</td>
                            <td>{(produto.valorVenda).toFixed(2)}</td>
                            <td className='celulas'>{produto.fragilidade ? "Sim" : "Não"}</td>
                            <td className='celulas'>{produto.fornecedor || "N/A"}</td>
                            <td className='opcoes'>
                                <a href={`/usuario/produtos/edicao`} onClick={() => handleEdit(produto.id)}><i class="fa-solid fa-pen-to-square"> editar</i></a>
                                <a href='#' onClick={() => handleDelete(produto.id)}><i class="fa-solid fa-trash">Apagar</i></a>
                            </td>
                        </tr>
                    ))}
                    <button className="btn-report"><a href='/usuario/relatorio'>Gerar relatório</a></button>
                </tbody>

            </table>
        </div >
    );
}

export default TableProdut;