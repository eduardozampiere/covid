# Acompanhamento de casos da Covid-19
O projeto faz uma análise dos dados da Covid-19 no Brasil. Casos e óbitos por dia, por uf e por região do país.
Os dados sao obtidos atraves do github do wesley cota pela url:https://raw.githubusercontent.com/wcota/covid19br/master/cases-brazil-states.csv .
Foi o melhor compilado de dados que encontrei.

## Prints
![print1](https://github.com/eduardozampiere/covid/blob/master/prints/covid-1.png)
![print2](https://github.com/eduardozampiere/covid/blob/master/prints/covid-2.png)
![print3](https://github.com/eduardozampiere/covid/blob/master/prints/covid-3.png)
![print4](https://github.com/eduardozampiere/covid/blob/master/prints/covid-4.png)
![print5](https://github.com/eduardozampiere/covid/blob/master/prints/covid-5.png)
![print6](https://github.com/eduardozampiere/covid/blob/master/prints/covid-6.png)
![print7](https://github.com/eduardozampiere/covid/blob/master/prints/covid-7.png)

## Dados retornados
O sistema retorna um objeto javascript como exemplificado abaixo:

````js
const dataReturned = {
  confirmados: // Total de casos no país
  dias_projecao: // Dias que o sistema realiza a projecao de casos
  dobro: // Número de dias em que o numero de infectados dobra
  letalidade: //Taxa de letalidade por casos 
  letalidade_dia: *
  mortos: // Total de mortos no país
  por_cem_mil: *
  por_dia: *
  por_dia_novos: *
  por_estados: *
  por_regiao: *
  por_semana: *
  primeira_morte: "2020-03-17"
  primeiro_caso: "2020-02-25"
  projecao: *
  ultimo_dia: "2020-05-05"
}


letalidade_dia: {
  //data: // taxa de letalidade por casos confirmados naquela data
}

por_cem_mil: {
  //UF: {
    casos: // numero de casos por cem mil habitantes da uf,
    mortos: //numero de mortes por cem mil habitantes da uf
  } 
}

por_dia: {
  //data:{
    casos: // numero de casos acumulados na data em todo o país
    mortos: // numero de mortos acumulados na data em todo o país
  }
}

por_dia_novos: {
  //data:{
    casos: // numero de casos novos na data em todo o país
    mortos: // numero de mortos novos na data em todo o país
  }
}
por_estado: {
  //UF: {
    casos: // numero de casos 
    mortos: //
  }
}
````
os demais objetos seguem o mesmo padrão

### Como o sistema realiza a projeção de casos ?

O sistema usa o crescimento exponencial para realizar a projeção. 
Uma função exponencial f(x, y, z) 
onde x é o numero de dias que devem ser projetados. Ou seja, x >= 1.
y é o numero de casos confirmados mais recente.
z é o numero de dias após o ultimo.

O retorno é o numero de casos projetados para aquele dia (ultimo_dia + z).
````
f(x, y, z) = (y) * 2^(x/z)
````