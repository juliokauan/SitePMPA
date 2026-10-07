export function erroPopup(mensagem){
    document.querySelector("#erro")?.remove();
    const erro = document.createElement("div");
    erro.id = "erro";
    erro.className = "fundoEscuro";
    
    erro.innerHTML = `
    <div id = "containerErro">
        <p>${mensagem}</p>
        <button class="botaoX">X</button>
    </div>`;

    document.body.appendChild(erro);

    setTimeout(() => {
        erro.classList.add("mostrar");
        document.querySelector("#containerErro").classList.add("mostrar");
    }, 10);

    document.querySelector(".botaoX").addEventListener("click", fecharErro);

    setTimeout(fecharErro, 5000);
}

export function fecharErro(){
    const erro = document.querySelector("#erro");
    if (erro){
        erro.classList.remove("mostrar");
        document.querySelector("#containerErro").classList.remove("mostrar");

        setTimeout(() =>{
           if (erro.parentElement){
            erro.remove();
            window.location.href = "index.html";
           } 
        }, 300);
    }
}