const obtain_respostas = localStorage.getItem("Respostas");
if (obtain_respostas) {
    const respostas = JSON.parse(obtain_respostas);
    console.log(respostas);
    localStorage.removeItem("Respostas");
}
else{
    console.log("Sem Resposta");
}