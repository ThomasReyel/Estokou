
import '../css/Report.css';
import UserNavbar from './UserNavbar';
import api from '../servico/App';
import Profile from './Profiles';
import { useEffect, useState } from 'react';
import BaseBoard from './BaseBoard';
import Checker from './Checker';

function TableReport() {
    const storageId = Profile.getStorageId();
    const [movimentacoes, setMovimentacoes] = useState([]);
    useEffect(() => {
        const fetchEstoques = async () => {
            try {
                const responseMovi = await api.get('/api/movimentacaos?id_estoque=' + storageId); // Altere para o endpoint correto
                const movimentacoesInfo = responseMovi.data;
                setMovimentacoes(movimentacoesInfo);
            } catch (err) {
                console.error("Erro ao buscar estoques: ", err);
            }
        };
        fetchEstoques();
    }, [storageId]);

    const entradas = movimentacoes.filter(movimentacao => movimentacao.operacao === 1);
    const saidas = movimentacoes.filter(movimentacao => movimentacao.operacao !== 1);
    const totalEntradas = entradas.reduce((acc, mov) => acc + mov.valorTotal, 0);
    const totalSaidas = saidas.reduce((acc, mov) => acc + mov.valorTotal, 0);
    const saldoFinal = totalSaidas - totalEntradas;
    const movimentacoesFiltrados = movimentacoes
    
    return (
        <div>
            <div className='container'>
                <Checker/>
                <UserNavbar />
                <h1>Relatório de Movimentações</h1>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet"></link>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Movimentações</th>
                            <th>Data</th>
                            <th>Quantidade</th>
                            <th>ID do Produto</th>
                            <th>operação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movimentacoesFiltrados.map((movimentacao) => (
                            <tr key={movimentacao.id}>
                                <td>{movimentacao.id || "N/A"}</td>
                                <td>{movimentacao.data || "N/A"}</td>
                                <td>{movimentacao.quantidadeMovi || "N/A"}</td>
                                <td>{movimentacao.id_prod || "N/A"}</td>
                                <td>{movimentacao.operacao ? "Entrada" : "Saída"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Valor Total de Entrada</th>
                            <th>Valor Total de Saída</th>
                            <th>Balanço Final</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>{totalEntradas.toFixed(2)}</td>
                            <td>{totalSaidas.toFixed(2)}</td>
                            <td>{saldoFinal.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

            </div >
            <BaseBoard />
        </div>

    );
}
export default TableReport;