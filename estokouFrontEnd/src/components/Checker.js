import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profiles";

function Checker() {
    const navigate = useNavigate();
    useEffect(() => {
        if (Profile.getId() == 0) {
            alert("Você não está logado, faça login para acessar o dashboard");
            navigate("/");

        }
    }, [navigate]);

    return null;
}

export function CheckerStorage() {
    const navigate = useNavigate();
    useEffect(() => {
        if (Profile.getStorageName() == "") {
            alert("Você não está com nenhum estoque determinado, crie ou determine um em 'trocar estoque'");
            navigate("/usuario");
        }
    }, [navigate]);

    return null;
}



export default Checker;
