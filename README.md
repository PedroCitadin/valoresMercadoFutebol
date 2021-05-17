# valoresMercadoFutebol
Projeto Intermediário PPW 2

A aplicação faz requisição ao site https://www.transfermarkt.com.br, um site especializado em valores de mercado e estatisticas envolvendo futebol.
As URL especificas que foram alvo de requisição estão disponíveis no arquivo dados.json

existem 3 endpoints na aplicação, sendo dois de dados extraidos do site Transfermarkt, e um que contém informações sobre o autor

os dois endpoints principais retornam as infomações dos jogadoes de futebol mais valiosos do mundo, e as informações dos clubes mais valiosos respectivamente

os dados são retornados em formato JSON, sendo os dados dos jogadores possuindo os atributos: nome, posição, idade, nacionalidade, clube, valor de mercado e uma url com uma foto do jogador.
os dados dos clubes possuem os atributos: nome, país, liga, valor de mercado e uma url com uma imagem do escudo do clube


Ambos os endpoints possuem um filtro, sendo o de jogadores podendo ser filtrados por ligas, e os clubes pela confederação continental a qual pertencem.

-----Modo de uso-------------

a url principal da aplicação é: http://valores-futebol.herokuapp.com/

a url que retorna os dados dos jogadores é: http://valores-futebol.herokuapp.com/topjogadores
o filtro por liga funciona da seguinte forma: 
http://valores-futebol.herokuapp.com/topjogadores?liga=NOMEDALIGA

as ligas disponiveis são:
brasileirao;
seriea;
premierleague
ligue1;
bundesliga;
laliga;

Para retornar os dados dos clubes, é utilizado a seguinte url: http://valores-futebol.herokuapp.com/topclubes
o filtro de confederação funciona da seguinte forma: 
http://valores-futebol.herokuapp.com/topclubes?confederacao=SIGLACONFEDERACAO

as confederações disponíveis são: 
AFC;
CAF;
CONCACAF;
CONMEBOL;
OFC;
UEFA;


caso seja informado um valor que não existe, o sistema irá retornar apenas uma mensagem informando o erro


Para retornar os dados do Autor é utilizado a seguinte URL: http://valores-futebol.herokuapp.com/autor
