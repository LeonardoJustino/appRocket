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
     if(respostas.length == 0){
        console.log("Nenhuma meta selecionada!")
        return 
     }
     metas.forEach((m) => { //aqui vou desmarcar todas as metas
        m.checked = false //usamos esse forEach pq se não quando marcar e desmarcar alguma meta ele aparece novamente que está marcado, essa função serve para acabar com isso.
    })

     respostas.forEach((resposta) => { //forEach vai olhar um por um 
        const meta = metas.find((m) => {
            return m.value == resposta      //se resposta do usuário == meta definida == checkbox = true
        })
        meta.checked = true
     })
     console.log("Meta(s) concluida(s)")

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
                    name: "Sair",
                    value: "sair"
                   
                }
            ]
        })

        switch(opcao){
            case "cadastrar": 
                    await  cadastrarMeta()
                break
            case "listar": 
                    await listarMetas()
                break
            case "sair":
                console.log("Nós vemos depois!")
                return
    }
}
}
start()