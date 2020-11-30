import { createStore } from 'redux';

const INICIAL_STATE = {
    email: {},
    nome: {},
}

export default function course(state = INICIAL_STATE, action) {
    if (action.type == 'PERFIL_LOGADO') {
        return {...state, email: action.email, nome: action.nome }

    }
    return state;
}