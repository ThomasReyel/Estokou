import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import api from "../servico/App";
import Profile from './Profiles';

function DropdownProd() {
    const [estoques, setEstoques] = useState([]);
    const [selectedStorageId, setSelectedStorageId] = useState(null);
    const [selectedStorageName, setSelectedStorageName] = useState("");

    useEffect(() => {
        const fetchEstoques = async () => {
            try {
                const response = await api.get('/api/estoques?id_usuario=' + Profile.getId());
                setEstoques(response.data);
            } catch (err) {
                console.error("Erro ao buscar estoques: ", err);
            }
        };
        fetchEstoques();
    }, []);

    function handleTradeStorage(id, nome) {
        Profile.setStorageId(id);
        setSelectedStorageId(id);
        Profile.setStorageName(nome);
        setSelectedStorageName(nome);
        window.location.reload();
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Trocar estoque
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {estoques.length > 0 ? (
                    estoques.map((estoque) => (
                        <Dropdown.Item
                            key={estoque.id}
                            active={selectedStorageId === estoque.id && selectedStorageName === estoque.nome}
                            onClick={() => handleTradeStorage(estoque.id, estoque.nome)}
                        >
                            {estoque.nome}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>Você não tem estoques cadastrados</Dropdown.Item>
                )}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DropdownProd;

