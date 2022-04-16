db.createCollection("Alunos")
//cria collection

db.Alunos.insert({
        "Nome" : "F�bio Papini",
        "Curso" : "An�lise e desenvolvimento de sistemas",
        "Notas" : [10, 8.5, 10],
        "Habilidade" : [
            {"Nome" : "Ingl�s",
            "N�vel" : "Iniciante"},
            {"Nome" : "L�gica de Programa��o",
            "N�vel" : "Intermedi�rio"}
        ]
    })
//insere dados
    
db.Alunos.find().pretty() 
//pesquisar todos os dados da collection
//pretty opcional para organizar a exibi��o de forma leg�vel
    
db.Alunos.find({"Nome" : "Paulo"}).pretty()
//Pesquisa com base no nome definido

db.Alunos.find({
    "Nome" : "Antonio Marcos Reina Junior",
    "Habilidades.Nome" : "Ingl�s"
    })
//Pesquisa com base em uma classe criada e o campo
//espec�fico
    
db.Alunos.remove({
    "_id" : ObjectId("62598898ac0594a36be42b38")
    })
//remover objeto por id especifico
   
db.Alunos.update(
                {"cursos.nome" : "Sistemas de informa��o"},
                { 
                    $set : {
                        "cursos.nome" : "Sistemas de Informa��o"
                    }
                }
                )
//Realiza a altera��o do primeiro campo que for pego pelo
//update

db.Alunos.update(
                {"cursos.nome" : "Sistemas de informa��o"},
                { 
                    $set : {
                        "cursos.nome" : "Sistemas de Informa��o"
                    },
                    {
                        multi : true
                    }
                }
                )
//Realiza a altera��o em todos os campos que forem compat�veis
//conforme a instru��o feita no mongo 
                
db.Alunos.update(
                {"_id" : ObjectId("6259b8b1ac0594a36be42b42")},
                {
                    $push : {
                        "Notas" : 8.4
                    }
                }
            )
//Adiciona um valor a um array como atualiza��o do update
     
db.Alunos.update(
                {"_id" : ObjectId("6259b8b1ac0594a36be42b42")},
                {
                    $push : {
                        "Notas" : {$each : [5, 8.5]}
                    }
                }
            )
//Adiciona mais de um valor a um array como atualiza��o do update
                
db.Alunos.find({
                "Notas" : 8.5
})
//Pesquisa nota espec�fica no array dos alunos que possuem essa nota

db.Alunos.find({
        "Notas" : { $gt : 5 } 
})
//Pesquisar nota maior que 5 dentro do Array, 
//possuindo uma nota maior que 5 j� tr�ra os resultados
//gt(greater than(maior que)) >

db.Alunos.findOne({
        "Notas" : { $gt : 5 } 
})
//Pesquisar nota maior que 5 dentro do Array, 
//possuindo uma nota maior que 5 trar� o resultado 
//somente da primeira pessoa que encontrar
//gt(greater than(maior que)) >

db.Alunos.find().sort({"Nome" : 1})
//Realiza a busca com base no nome em ordem crescente

db.Alunos.find().sort({"Nome" : -1})
//Realiza a busca com base no nome em ordem decrescente

db.Alunos.find().sort({"Nome" : 1}).limit(3)
//Realiza a busca com base no nome em ordem crescente,
//e limitando aos 3 primeiros o retorno da busca

db.Alunos.update(
{"_id" : ObjectId("6259ea39ac0594a36be42b47")},
{
    $set : {
    "Localiza��o" : {
        "Endere�o" : "Rua Vergueiro, 3185",
        "Cidade" : "S�o Paulo",
        Coordinates : [-23.588213, -46.632356],
        type : "Point"
}
}
})
//Update adicionando a localiza��o do usu�rio
//coordinates padr�o para uso de coordenadas em ingl�s
//do mongoDB, type define o tipo para localiza��o.

db.Alunos.aggregate([
    {
         $geoNear : {
             near : {
                 coordinates: [-23.5640265, -46.6527128],
                 type : "Point"
              },
              distanceField : "distancia.calculada",
              spherical : true}
    }, {$limit : 4}, 
       { $skip : 1}
])
//Conjunto de dados a agregar(aggregate)
//geoNear (proximidade geografica)
//spherical indica um globo esfera
//retorna da menor at� a maior dist�ncia
//para limitar a quantidade de retorno ao inv�s de limit
//limit : 4(quantidade que deseja mostrar)
//skip ignora 1, no caso o primeiro, que retornaria
//0 de dist�ncia que seria a mesma pessoa pois a mesma
//seria a mais proxima de si.
    
db.Alunos.createIndex({
        localizacao : "2dsphere" 
    })
//cria um index de defini��o para separar
// a geolocaliza��o


