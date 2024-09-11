const { select,input, checkbox} = require('@inquirer/prompts') //importamos modulos

let meta = {
    value: 'Tomar 3L de água no dia',
    checked: false
}
let metas = [meta]
const cadastrarMeta = async () =>{
   
    const meta = await input ({message: "Digite sua meta:"})//pegamos o input no module, e colocamos await para esperar que o usuário digite sua meta

    if(meta.length == 0){ //se meta for igual a zero então mostrar mensagem de meta vazia
        console.log('A meta não pode ser vazia')
        return  //retorna a função e a pessoa volta para os selects
        //caso eu queira que a pessoa respondesse a meta eu chamaria a função no return cadastrarMeta()
    }
    metas.push(
        { value: meta, checked: false}
    )
      
   
    //função push() significa colocar alguma coisa dentro    

}
const listarMetas = async () =>{
     const respostas = await checkbox({
        message: "Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter apra finalizar essa etapa",
        choices: [...metas], //pega tudo que ta dentro de let metas e joga para dentro de choices
        instructions: false
    })
    metas.forEach((m) => { //aqui vou desmarcar todas as metas
        m.checked = false //usamos esse forEach pq se não quando marcar e desmarcar alguma meta ele aparece novamente que está marcado, essa função serve para acabar com isso.
    })
     if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return 
     }
   

     respostas.forEach((resposta) => { //forEach vai olhar um por um 
        const meta = metas.find((m) => {
            return m.value == resposta      //se resposta do usuário == meta definida == checkbox = true
        })
        meta.checked = true
     })
     console.log("Meta(s) concluida(s)")

}
const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked 
    })
   if(realizadas.length == 0){
    console.log("Você não realizou nenhuma meta :(")
    return
   }
   await select({
        message: "Metas Realizadas " + realizadas.length ,
        choices: [...realizadas]
   })
}
const metasAbertas = async () =>{
    const abertas = metas.filter((meta) => {
        return meta.checked != true //se meta.checked for diferente de true, vai transformar a operação em false
        //poderia ter usado return !meta.checked
    })
    if(abertas.length == 0){
        console.log("Não existem metas abertas! :)"  )
        return
    }
    await select({
        message: "Metas Abertas " + abertas.length,
        choices: [...abertas]
    })
}
const start =  async () =>{
   
    while(true){
      
        const opcao = await select ({ //await= espere, usado para esperar a seleção do usuário, se n o pc roda todo o comando de uma vez
            message: "Menu",
            choices: [
                {
                name: "Cadastrar meta",
                value: "cadastrar"
                },
                {
                    name: "Listar",
                    value: "listar"
                  
                },
                {  
                    name: "Metas Realizadas",
                    value: "realizadas" //nome tem que estar igual no case
                   
                },
                {  
                    name: "Metas Abertas",
                    value: "abertas" //nome tem que estar igual no case
                   
                },
                {  
                    name: "Sair",
                    value: "sair"
                   
                },
               
            ]
        })

        switch(opcao){
            case "cadastrar": 
                    await  cadastrarMeta()
                break
            case "listar": 
                    await listarMetas()
                break
            case "realizadas":
                await metasRealizadas()
                break
            case "abertas":
                await metasAbertas()
                break
            case "sair":
                console.log("Nós vemos depois!")
                return
    }
}
}
start()