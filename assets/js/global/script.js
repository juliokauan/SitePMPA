function erroPopup(mensagem){
    const erroExiste = document.querySelector("erro");
    if (erroExiste){
        erroExiste.remove();
    }
    const erro = document.createElement("div");
    erro.id = "erro";
    erro.class = "fundoEscuro";
    
    erro.innerHTML = `
        <div id = "containerErro">
            <p id="mensagemErro">${mensagem}</p>
            <button class="botaoX">X</button>
        </div>`;

    const erroContainer = document.querySelector("#containerErro");

    document.body.appendChild(erro);
    setTimeout(() => {
        erro.classList.add("mostrar");
        erroContainer.classList.add("mostrar");
    }, 10);

    setTimeout(() =>{
        fecharErro();
    }, 5000);
}

function fecharErro(){
    const erro = document.querySelector("erro");
    if (erro){
        const erroContainer = document.querySelector("#containerErro"); 
        erro.classList.remove("mostrar");
        erroContainer.classList.remove("mostrar");
        
        setTimeout(() =>{
           if (erro.parentElement){
            erro.remove();
           } 
        }, 300);
    }
}