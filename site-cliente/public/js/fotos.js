
function mostrarNomeImagem() {
    const inputFoto = document.getElementById('input_foto');
    const nomeImagem = document.getElementById('nome_imagem');
    if (inputFoto.files.length > 0) {
        nomeImagem.textContent = `Imagem selecionada: ${inputFoto.files[0].name}`;
    } else {
        nomeImagem.textContent = 'Clique aqui para selecionar uma imagem';
    }
}
