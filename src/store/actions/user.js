export function toggleUser(email, nome) {
    return {
        type: 'PERFIL_LOGADO',
        email,
        nome,
    };
}