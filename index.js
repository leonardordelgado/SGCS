var btAdcionar = document.querySelector("button#btAdcionar")
btAdcionar.addEventListener('click', add)
var btApagar = document.querySelector("button#apagar")
btApagar.addEventListener('click', apagar)
var btFinaliza = document.querySelector("button#finalizar")
btFinaliza.addEventListener('click', finalizar)

var despesas = []
var receitas = []
var receita = document.querySelector('select#rec')
var despesa = document.querySelector('select#desp')
var valor =""
var elemento = document.querySelector('input#valor')
var resultado = document.querySelector('div#resultado')
elemento.focus()
function formatarMoeda(){
    
     valor = elemento.value
     
    valor = valor + '';
    valor = parseInt(valor.replace(/[\D]+/g, ''));
    valor = valor + '';
    valor = valor.replace(/([0-9]{2})$/g, ",$1");
    
    if (valor.length > 6) {
        valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    
    elemento.value = valor;
    if(valor == 'NaN') elemento.value = '';


}
function add(){
    var valor = elemento.value
    resultado.innerHTML = ""
    valor = valor + '';
    if(valor.length ==""){
        alert('Valor não informado')
    }else if(valor == 0){
        alert("Valor fora dos parametros")
    }else{
        let id =  document.getElementById('list').selectedIndex;
        var descricao = document.querySelector("input#descricao")
        
        descricao = descricao.value
        if(id == 0 ){
            var op = document.createElement('option')
            op.text = `${descricao}: R$ ${valor}`
            valor = valor.replace(/[^0-9]/g, '');
            receitas.push(valor)
            receitas.forEach(function (item, indice){
                op.setAttribute('id', item)
                receita.appendChild(op)
            })
        }else{
            var op = document.createElement('option')
            op.text = `${descricao}: R$ ${valor}`
            valor = valor.replace(/[^0-9]/g, '');
            despesas.push(valor)
            despesas.forEach(function (item, indice){
                op.setAttribute('id', indice)
                despesa.appendChild(op)
            })
        }
    }
}
function apagar(){
    let idReceitas =  document.getElementById('rec').selectedIndex;
    let idOpReceitas =  document.getElementById('rec').options;
    let idDespesas =  document.getElementById('desp').selectedIndex;
    let idOPDespesas =  document.getElementById('desp').options;
    resultado.innerHTML = ""
    if(idOpReceitas[idReceitas]== undefined && idOPDespesas[idDespesas]== undefined){
        alert("Selecione um valor para ser excluido")
    }else{
        var remov = ""
        var indices = ""
        if(idOpReceitas[idReceitas] != undefined){
            remov = `${idOpReceitas[idReceitas].id}`
            receita.removeChild(document.getElementById(`${remov}`))
            receitas.splice(receitas.indexOf(`${remov}`),1)
        }
        if(idOPDespesas[idDespesas] != undefined){
            remov = `${idOPDespesas[idDespesas].id}`
            despesa.removeChild(document.getElementById(`${remov}`))
            despesas.splice(despesas.indexOf(`${remov}`),1)
        }
    }
}
function finalizar(){
    var somaReceita = 0
    var somaDespesa = 0
    var total = ""
    var msg = ""
    resultado.innerHTML = ""
   for(let valorReceita of receitas){
        var resultValores = +valorReceita 
        somaReceita = somaReceita  += resultValores
    }

    for(let valorDespesa of despesas){
        var resultValores = +valorDespesa
        somaDespesa = somaDespesa += resultValores
    }

    total = somaReceita - somaDespesa
    var totalconvert = total
    console.log(totalconvert)

    somaReceita  = String(somaReceita)
    somaReceita  = somaReceita.replace(/([0-9]{2})$/g, ",$1");
    if (somaReceita.length > 6) {
        somaReceita  = somaReceita.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    
    somaDespesa = String(somaDespesa)
    somaDespesa = somaDespesa.replace(/([0-9]{2})$/g, ",$1");
    if (somaDespesa.length > 6) {
        somaDespesa = somaDespesa.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    total  = String(total)
    total  = total.replace(/([0-9]{2})$/g, ",$1");
    if (total.length > 6) {
        total  = total.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    }
    
    if(somaReceita == 0 || somaDespesa == 0){
        alert('E preciso que os campos sejam preenchidos!')
    }else{
        if(totalconvert < 0){
            msg = `Você esta negativo em R$ ${total}`
            var resultcalc = document.createElement('p')
            resultcalc.innerHTML += `O total da receita e R$ ${somaReceita}<br>`
            resultcalc.innerHTML += `O total da despesa e R$ ${somaDespesa}<br>`
            resultcalc.innerHTML += `${msg} <br>`
            resultado.appendChild(resultcalc)
        }else if(totalconvert == 0){
            msg = 'Você não posssui dinheiro e não existe dividas faltando'
            var resultcalc = document.createElement('p')
            resultcalc.innerHTML += `O total da receita e R$ ${somaReceita}<br>`
            resultcalc.innerHTML += `O total da despesa e R$ ${somaDespesa}<br>`
            resultcalc.innerHTML += `${msg} <br>`
            resultado.appendChild(resultcalc)
        }else if(totalconvert > 0){
            msg =`Você tem o total de R$ ${total} sobrando`
            var resultcalc = document.createElement('p')
            resultcalc.innerHTML += `O total da receita e R$ ${somaReceita}<br>`
            resultcalc.innerHTML += `O total da despesa e R$ ${somaDespesa}<br>`
            resultcalc.innerHTML += `${msg}<br>`
            resultado.appendChild(resultcalc)
        }
    }
}