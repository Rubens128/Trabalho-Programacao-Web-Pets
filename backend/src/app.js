const teste = require("./service/usuarioService.js")
const express = require("express");
const cors = require("cors");

const app = express();

const authRoutes = require("./routes/authRoutes.js");
const usuarioRoutes = require("./routes/usuarioRoutes.js");
const petsRoutes = require("./routes/petsRoutes.js");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.json({
        message: "Teste de API",
    })
});

app.use("/auth", authRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/pets", petsRoutes);

app.put("/testePetsEditar", (req, res) => {
  return res.status(200).json({
    mensagem: "sucesso",
  })
})
 
app.delete("/testePetsDeletar", (req, res) => {
  return res.status(200).json({
    mensagem: "sucesso",
  })
})
 
app.post("/testePetsAdicionar", (req, res) => {
  return res.status(200).json({
    mensagem: "sucesso",
  })
})
 
app.get("/testeTeste", teste.teste);

app.get("/testePets", (req, res) =>{
   
    return res.json([
  {
    "id": 1,
    "adicionadoEm": "2026-01-10",
    "dataNasc": "2022-05-14",
    "descricao": "Cachorro dócil, gosta de brincar e passear.",
    "donoId": 101,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/1.jpg",
    "local": "São Paulo - SP",
    "nome": "Thor",
    "status": "Disponível"
  },
  {
    "id": 2,
    "adicionadoEm": "2026-01-11",
    "dataNasc": "2021-08-20",
    "descricao": "Gata tranquila, carinhosa e acostumada com apartamento.",
    "donoId": 102,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/2.jpg",
    "local": "Rio de Janeiro - RJ",
    "nome": "Luna",
    "status": "Disponível"
  },
  {
    "id": 3,
    "adicionadoEm": "2026-01-12",
    "dataNasc": "2023-02-03",
    "descricao": "Coelho pequeno, calmo e fácil de cuidar.",
    "donoId": 103,
    "especie": "Coelho",
    "fotoPetUrl": "https://example.com/pets/3.jpg",
    "local": "Curitiba - PR",
    "nome": "Bolinha",
    "status": "Adotado"
  },
  {
    "id": 4,
    "adicionadoEm": "2026-01-13",
    "dataNasc": "2020-11-30",
    "descricao": "Cachorra protetora, obediente e muito companheira.",
    "donoId": 104,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/4.jpg",
    "local": "Belo Horizonte - MG",
    "nome": "Mel",
    "status": "Disponível"
  },
  {
    "id": 5,
    "adicionadoEm": "2026-01-14",
    "dataNasc": "2024-01-18",
    "descricao": "Gatinho filhote, brincalhão e curioso.",
    "donoId": 105,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/5.jpg",
    "local": "Porto Alegre - RS",
    "nome": "Simba",
    "status": "Disponível"
  },
  {
    "id": 6,
    "adicionadoEm": "2026-01-15",
    "dataNasc": "2022-09-09",
    "descricao": "Cachorro de porte médio, energético e sociável.",
    "donoId": 106,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/6.jpg",
    "local": "Campinas - SP",
    "nome": "Rex",
    "status": "Adotado"
  },
  {
    "id": 7,
    "adicionadoEm": "2026-01-16",
    "dataNasc": "2021-03-25",
    "descricao": "Gata independente, limpa e muito esperta.",
    "donoId": 107,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/7.jpg",
    "local": "Florianópolis - SC",
    "nome": "Mia",
    "status": "Disponível"
  },
  {
    "id": 8,
    "adicionadoEm": "2026-01-17",
    "dataNasc": "2023-07-12",
    "descricao": "Hamster ativo, pequeno e acostumado com gaiola.",
    "donoId": 108,
    "especie": "Hamster",
    "fotoPetUrl": "https://example.com/pets/8.jpg",
    "local": "Santos - SP",
    "nome": "Pipoca",
    "status": "Disponível"
  },
  {
    "id": 9,
    "adicionadoEm": "2026-01-18",
    "dataNasc": "2019-12-05",
    "descricao": "Cachorro adulto, calmo e ótimo para famílias.",
    "donoId": 109,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/9.jpg",
    "local": "Salvador - BA",
    "nome": "Bob",
    "status": "Disponível"
  },
  {
    "id": 10,
    "adicionadoEm": "2026-01-19",
    "dataNasc": "2022-04-21",
    "descricao": "Papagaio comunicativo, saudável e bem cuidado.",
    "donoId": 110,
    "especie": "Ave",
    "fotoPetUrl": "https://example.com/pets/10.jpg",
    "local": "Recife - PE",
    "nome": "Louro",
    "status": "Adotado"
  },
  {
    "id": 11,
    "adicionadoEm": "2026-01-20",
    "dataNasc": "2021-10-10",
    "descricao": "Cachorra carinhosa, gosta de crianças e outros animais.",
    "donoId": 111,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/11.jpg",
    "local": "Fortaleza - CE",
    "nome": "Nina",
    "status": "Disponível"
  },
  {
    "id": 12,
    "adicionadoEm": "2026-01-21",
    "dataNasc": "2023-06-15",
    "descricao": "Gato brincalhão, saudável e muito curioso.",
    "donoId": 112,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/12.jpg",
    "local": "Goiânia - GO",
    "nome": "Oliver",
    "status": "Disponível"
  },
  {
    "id": 13,
    "adicionadoEm": "2026-01-22",
    "dataNasc": "2020-02-28",
    "descricao": "Tartaruga calma, ideal para ambiente controlado.",
    "donoId": 113,
    "especie": "Tartaruga",
    "fotoPetUrl": "https://example.com/pets/13.jpg",
    "local": "Brasília - DF",
    "nome": "Tuca",
    "status": "Disponível"
  },
  {
    "id": 14,
    "adicionadoEm": "2026-01-23",
    "dataNasc": "2022-12-01",
    "descricao": "Cachorro pequeno, dócil e acostumado com crianças.",
    "donoId": 114,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/14.jpg",
    "local": "Manaus - AM",
    "nome": "Max",
    "status": "Adotado"
  },
  {
    "id": 15,
    "adicionadoEm": "2026-01-24",
    "dataNasc": "2024-03-03",
    "descricao": "Gatinha filhote, muito carinhosa e ativa.",
    "donoId": 115,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/15.jpg",
    "local": "Belém - PA",
    "nome": "Amora",
    "status": "Disponível"
  },
  {
    "id": 16,
    "adicionadoEm": "2026-01-25",
    "dataNasc": "2021-01-17",
    "descricao": "Cachorro esperto, treinado e muito companheiro.",
    "donoId": 116,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/16.jpg",
    "local": "São Luís - MA",
    "nome": "Apolo",
    "status": "Disponível"
  },
  {
    "id": 17,
    "adicionadoEm": "2026-01-26",
    "dataNasc": "2022-07-07",
    "descricao": "Pássaro pequeno, canta bastante e é bem ativo.",
    "donoId": 117,
    "especie": "Ave",
    "fotoPetUrl": "https://example.com/pets/17.jpg",
    "local": "Natal - RN",
    "nome": "Blue",
    "status": "Disponível"
  },
  {
    "id": 18,
    "adicionadoEm": "2026-01-27",
    "dataNasc": "2020-09-13",
    "descricao": "Gato adulto, calmo e muito limpo.",
    "donoId": 118,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/18.jpg",
    "local": "João Pessoa - PB",
    "nome": "Tom",
    "status": "Adotado"
  },
  {
    "id": 19,
    "adicionadoEm": "2026-01-28",
    "dataNasc": "2023-11-11",
    "descricao": "Cachorrinha filhote, brincalhona e saudável.",
    "donoId": 119,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/19.jpg",
    "local": "Vitória - ES",
    "nome": "Bela",
    "status": "Disponível"
  },
  {
    "id": 20,
    "adicionadoEm": "2026-01-29",
    "dataNasc": "2022-08-19",
    "descricao": "Coelho branco, dócil e acostumado com pessoas.",
    "donoId": 120,
    "especie": "Coelho",
    "fotoPetUrl": "https://example.com/pets/20.jpg",
    "local": "Niterói - RJ",
    "nome": "Algodão",
    "status": "Disponível"
  },
   {
    "id": 21,
    "adicionadoEm": "2026-01-30",
    "dataNasc": "2021-05-12",
    "descricao": "Cachorro amigável e acostumado com outros animais.",
    "donoId": 121,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/21.jpg",
    "local": "Brasília - DF",
    "nome": "Zeus",
    "status": "Disponível"
  },
  {
    "id": 22,
    "adicionadoEm": "2026-01-31",
    "dataNasc": "2022-06-15",
    "descricao": "Gata tranquila e muito carinhosa.",
    "donoId": 122,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/22.jpg",
    "local": "Brasília - DF",
    "nome": "Pandora",
    "status": "Disponível"
  },
  {
    "id": 23,
    "adicionadoEm": "2026-02-01",
    "dataNasc": "2023-01-08",
    "descricao": "Hamster pequeno e ativo.",
    "donoId": 123,
    "especie": "Hamster",
    "fotoPetUrl": "https://example.com/pets/23.jpg",
    "local": "Goiânia - GO",
    "nome": "Cookie",
    "status": "Disponível"
  },
  {
    "id": 24,
    "adicionadoEm": "2026-02-02",
    "dataNasc": "2020-03-10",
    "descricao": "Cachorro obediente e muito companheiro.",
    "donoId": 124,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/24.jpg",
    "local": "Campinas - SP",
    "nome": "Spike",
    "status": "Adotado"
  },
  {
    "id": 25,
    "adicionadoEm": "2026-02-03",
    "dataNasc": "2024-02-20",
    "descricao": "Gatinha filhote muito brincalhona.",
    "donoId": 125,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/25.jpg",
    "local": "Curitiba - PR",
    "nome": "Mimi",
    "status": "Disponível"
  },
  {
    "id": 26,
    "adicionadoEm": "2026-02-04",
    "dataNasc": "2021-07-30",
    "descricao": "Papagaio saudável e comunicativo.",
    "donoId": 126,
    "especie": "Ave",
    "fotoPetUrl": "https://example.com/pets/26.jpg",
    "local": "Salvador - BA",
    "nome": "Kiko",
    "status": "Disponível"
  },
  {
    "id": 27,
    "adicionadoEm": "2026-02-05",
    "dataNasc": "2022-11-11",
    "descricao": "Coelho dócil e acostumado com crianças.",
    "donoId": 127,
    "especie": "Coelho",
    "fotoPetUrl": "https://example.com/pets/27.jpg",
    "local": "Recife - PE",
    "nome": "Floquinho",
    "status": "Disponível"
  },
  {
    "id": 28,
    "adicionadoEm": "2026-02-06",
    "dataNasc": "2020-12-01",
    "descricao": "Cachorra calma e muito afetuosa.",
    "donoId": 128,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/28.jpg",
    "local": "Fortaleza - CE",
    "nome": "Jade",
    "status": "Adotado"
  },
  {
    "id": 29,
    "adicionadoEm": "2026-02-07",
    "dataNasc": "2021-09-21",
    "descricao": "Gato independente e saudável.",
    "donoId": 129,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/29.jpg",
    "local": "Florianópolis - SC",
    "nome": "Garfield",
    "status": "Disponível"
  },
  {
    "id": 30,
    "adicionadoEm": "2026-02-08",
    "dataNasc": "2023-04-14",
    "descricao": "Tartaruga tranquila e fácil de cuidar.",
    "donoId": 130,
    "especie": "Tartaruga",
    "fotoPetUrl": "https://example.com/pets/30.jpg",
    "local": "Vitória - ES",
    "nome": "Casquinha",
    "status": "Disponível"
  },
  {
    "id": 31,
    "adicionadoEm": "2026-02-09",
    "dataNasc": "2022-02-12",
    "descricao": "Cachorro ativo e brincalhão.",
    "donoId": 131,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/31.jpg",
    "local": "São Paulo - SP",
    "nome": "Luke",
    "status": "Disponível"
  },
  {
    "id": 32,
    "adicionadoEm": "2026-02-10",
    "dataNasc": "2021-04-04",
    "descricao": "Gata dócil e muito companheira.",
    "donoId": 132,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/32.jpg",
    "local": "Rio de Janeiro - RJ",
    "nome": "Lili",
    "status": "Disponível"
  },
  {
    "id": 33,
    "adicionadoEm": "2026-02-11",
    "dataNasc": "2023-05-19",
    "descricao": "Hamster amigável e saudável.",
    "donoId": 133,
    "especie": "Hamster",
    "fotoPetUrl": "https://example.com/pets/33.jpg",
    "local": "Belo Horizonte - MG",
    "nome": "Pingo",
    "status": "Disponível"
  },
  {
    "id": 34,
    "adicionadoEm": "2026-02-12",
    "dataNasc": "2020-06-17",
    "descricao": "Cachorro adulto muito tranquilo.",
    "donoId": 134,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/34.jpg",
    "local": "Porto Alegre - RS",
    "nome": "Toby",
    "status": "Adotado"
  },
  {
    "id": 35,
    "adicionadoEm": "2026-02-13",
    "dataNasc": "2024-01-05",
    "descricao": "Gatinho filhote muito curioso.",
    "donoId": 135,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/35.jpg",
    "local": "Santos - SP",
    "nome": "Nino",
    "status": "Disponível"
  },
  {
    "id": 36,
    "adicionadoEm": "2026-02-14",
    "dataNasc": "2022-10-08",
    "descricao": "Ave pequena e muito ativa.",
    "donoId": 136,
    "especie": "Ave",
    "fotoPetUrl": "https://example.com/pets/36.jpg",
    "local": "Belém - PA",
    "nome": "Piu",
    "status": "Disponível"
  },
  {
    "id": 37,
    "adicionadoEm": "2026-02-15",
    "dataNasc": "2021-11-22",
    "descricao": "Coelho branco e muito dócil.",
    "donoId": 137,
    "especie": "Coelho",
    "fotoPetUrl": "https://example.com/pets/37.jpg",
    "local": "Manaus - AM",
    "nome": "Neve",
    "status": "Disponível"
  },
  {
    "id": 38,
    "adicionadoEm": "2026-02-16",
    "dataNasc": "2020-08-09",
    "descricao": "Cachorra obediente e protetora.",
    "donoId": 138,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/38.jpg",
    "local": "Natal - RN",
    "nome": "Kiara",
    "status": "Disponível"
  },
  {
    "id": 39,
    "adicionadoEm": "2026-02-17",
    "dataNasc": "2022-03-27",
    "descricao": "Gato brincalhão e sociável.",
    "donoId": 139,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/39.jpg",
    "local": "João Pessoa - PB",
    "nome": "Fred",
    "status": "Adotado"
  },
  {
    "id": 40,
    "adicionadoEm": "2026-02-18",
    "dataNasc": "2023-08-12",
    "descricao": "Tartaruga saudável e tranquila.",
    "donoId": 140,
    "especie": "Tartaruga",
    "fotoPetUrl": "https://example.com/pets/40.jpg",
    "local": "São Luís - MA",
    "nome": "Shelly",
    "status": "Disponível"
  },
  {
    "id": 41,
    "adicionadoEm": "2026-02-19",
    "dataNasc": "2021-01-14",
    "descricao": "Cachorro de porte médio muito amigável.",
    "donoId": 141,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/41.jpg",
    "local": "Aracaju - SE",
    "nome": "Marley",
    "status": "Disponível"
  },
  {
    "id": 42,
    "adicionadoEm": "2026-02-20",
    "dataNasc": "2022-07-01",
    "descricao": "Gata calma e carinhosa.",
    "donoId": 142,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/42.jpg",
    "local": "Maceió - AL",
    "nome": "Cacau",
    "status": "Disponível"
  },
  {
    "id": 43,
    "adicionadoEm": "2026-02-21",
    "dataNasc": "2023-09-09",
    "descricao": "Hamster muito ativo e saudável.",
    "donoId": 143,
    "especie": "Hamster",
    "fotoPetUrl": "https://example.com/pets/43.jpg",
    "local": "Palmas - TO",
    "nome": "Tico",
    "status": "Disponível"
  },
  {
    "id": 44,
    "adicionadoEm": "2026-02-22",
    "dataNasc": "2020-05-23",
    "descricao": "Cachorro adulto dócil e tranquilo.",
    "donoId": 144,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/44.jpg",
    "local": "Campo Grande - MS",
    "nome": "Bidu",
    "status": "Adotado"
  },
  {
    "id": 45,
    "adicionadoEm": "2026-02-23",
    "dataNasc": "2024-02-11",
    "descricao": "Gatinha filhote muito divertida.",
    "donoId": 145,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/45.jpg",
    "local": "Cuiabá - MT",
    "nome": "Lola",
    "status": "Disponível"
  },
  {
    "id": 46,
    "adicionadoEm": "2026-02-24",
    "dataNasc": "2021-06-18",
    "descricao": "Papagaio falante e saudável.",
    "donoId": 146,
    "especie": "Ave",
    "fotoPetUrl": "https://example.com/pets/46.jpg",
    "local": "Teresina - PI",
    "nome": "Zeca",
    "status": "Disponível"
  },
  {
    "id": 47,
    "adicionadoEm": "2026-02-25",
    "dataNasc": "2022-12-22",
    "descricao": "Coelho dócil e muito amigável.",
    "donoId": 147,
    "especie": "Coelho",
    "fotoPetUrl": "https://example.com/pets/47.jpg",
    "local": "Macapá - AP",
    "nome": "Snow",
    "status": "Disponível"
  },
  {
    "id": 48,
    "adicionadoEm": "2026-02-26",
    "dataNasc": "2021-08-15",
    "descricao": "Cachorra companheira e obediente.",
    "donoId": 148,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/48.jpg",
    "local": "Boa Vista - RR",
    "nome": "Maya",
    "status": "Disponível"
  },
  {
    "id": 49,
    "adicionadoEm": "2026-02-27",
    "dataNasc": "2022-04-29",
    "descricao": "Gato muito sociável e brincalhão.",
    "donoId": 149,
    "especie": "Gato",
    "fotoPetUrl": "https://example.com/pets/49.jpg",
    "local": "Rio Branco - AC",
    "nome": "Mingau",
    "status": "Disponível"
  },
  {
    "id": 50,
    "adicionadoEm": "2026-02-28",
    "dataNasc": "2023-03-16",
    "descricao": "Cachorro jovem e cheio de energia.",
    "donoId": 150,
    "especie": "Cachorro",
    "fotoPetUrl": "https://example.com/pets/50.jpg",
    "local": "Porto Velho - RO",
    "nome": "Rocky",
    "status": "Disponível"
  }
])
})
 
app.get("/testeUsuario", (req, res) => {
 
  return res.json([
    {
      nome: "Ana Souza",
      email: "ana.souza@email.com",
      tipo: "Administrador",
      data: "2024-01-10",
      petsAdicionado: 8,
      petsAdotados: 2,
      acoes: "Editar",
    },
    {
      nome: "Bruno Lima",
      email: "bruno.lima@email.com",
      tipo: "Usuário",
      data: "2024-01-15",
      petsAdicionado: 3,
      petsAdotados: 1,
      acoes: "Editar",
    },
    {
      nome: "Carla Mendes",
      email: "carla.mendes@email.com",
      tipo: "Voluntário",
      data: "2024-02-02",
      petsAdicionado: 12,
      petsAdotados: 4,
      acoes: "Editar",
    },
    {
      nome: "Diego Alves",
      email: "diego.alves@email.com",
      tipo: "Usuário",
      data: "2024-02-18",
      petsAdicionado: 1,
      petsAdotados: 3,
      acoes: "Editar",
    },
    {
      nome: "Eduarda Rocha",
      email: "eduarda.rocha@email.com",
      tipo: "Administrador",
      data: "2024-03-05",
      petsAdicionado: 15,
      petsAdotados: 6,
      acoes: "Editar",
    },
    {
      nome: "Felipe Costa",
      email: "felipe.costa@email.com",
      tipo: "Usuário",
      data: "2024-03-12",
      petsAdicionado: 4,
      petsAdotados: 0,
      acoes: "Editar",
    },
    {
      nome: "Gabriela Nunes",
      email: "gabriela.nunes@email.com",
      tipo: "Voluntário",
      data: "2024-03-25",
      petsAdicionado: 10,
      petsAdotados: 5,
      acoes: "Editar",
    }
  ])
})
 
app.delete("/testeUsuarioDeletar", (req, res) => {
  return res.status(200).json({
    mensagem: "sucesso",
  })
})
 
app.put("/testeUsuarioEditar", (req, res) => {
  return res.status(200).json({
    mensagem: "sucesso",
  })
})
 
 
app.post("/testeUsuarioAdicionar", (req, res) => {
  return res.status(200).json({
    mensagem: "sucesso",
  })
})
 
app.post("/testeRelatorioAdicionar", (req, res) => {
  return res.status(200).json({
    mensagem: "sucesso",
  })
})

app.get("/testeRelatorioListar", (req, res) => {
  return res.json([
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: false, posseMoradia: "próprio", tipoMoradia: "casa" },
    id: "pedido001",
    antigoDonoId: "teste123",
    comentario: "Eu quero muito adotar ele",
    dataPedido: new Date("2026-06-15T00:00:00-03:00"),
    endereco: { bairro: "Centro", cep: "01001-000", cidade: "São Paulo", complemento: "Casa 2", estado: "SP", numero: "120", referencia: "Perto da praça", rua: "Rua das Flores" },
    experiencia: { experienciaAnterior: "Já tive muitos pets durante a vida", jaTevePets: true },
    nomeAntigoDono: "Carlos Almeida",
    novoDonoId: "teste321",
    petId: "pet123",
    status: "pendente",
    nomePet: "Thor",
    usuario: { cpf: "000.000.000-00", dataNascimento: new Date("1995-04-12T00:00:00-03:00"), email: "ana.silva@example.com", nomeCompleto: "Ana Silva", telefone: "(11) 90000-0001" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: true, posseMoradia: "alugado", tipoMoradia: "apartamento" },
    id: "pedido002",
    antigoDonoId: "teste123",
    comentario: "Tenho carinho e tempo para cuidar dele todos os dias",
    dataPedido: new Date("2026-06-15T01:20:00-03:00"),
    endereco: { bairro: "Jardins", cep: "01415-000", cidade: "São Paulo", complemento: "Apto 804", estado: "SP", numero: "350", referencia: "Ao lado do mercado", rua: "Alameda Santos" },
    experiencia: { experienciaAnterior: "Já cuidei de gatos e cachorros da família", jaTevePets: true },
    nomeAntigoDono: "Marina Costa",
    novoDonoId: "teste322",
    petId: "pet124",
    status: "pendente",
    nomePet: "Luna",
    usuario: { cpf: "000.000.000-01", dataNascimento: new Date("1990-08-23T00:00:00-03:00"), email: "bruno.oliveira@example.com", nomeCompleto: "Bruno Oliveira", telefone: "(11) 90000-0002" },
  },
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: false, posseMoradia: "próprio", tipoMoradia: "casa" },
    id: "pedido003",
    antigoDonoId: "teste123",
    comentario: "Minha família está preparada para receber um novo pet",
    dataPedido: new Date("2026-06-15T02:35:00-03:00"),
    endereco: { bairro: "Boa Vista", cep: "30140-000", cidade: "Belo Horizonte", complemento: "", estado: "MG", numero: "77", referencia: "Próximo à padaria", rua: "Rua Minas Gerais" },
    experiencia: { experienciaAnterior: "Já tive cachorro por 10 anos", jaTevePets: true },
    nomeAntigoDono: "João Pereira",
    novoDonoId: "teste323",
    petId: "pet125",
    status: "pendente",
    nomePet: "Mel",
    usuario: { cpf: "000.000.000-02", dataNascimento: new Date("1988-12-01T00:00:00-03:00"), email: "camila.santos@example.com", nomeCompleto: "Camila Santos", telefone: "(31) 90000-0003" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: false, posseMoradia: "alugado", tipoMoradia: "apartamento" },
    id: "pedido004",
    antigoDonoId: "teste123",
    comentario: "Moro sozinho e quero uma companhia para cuidar com responsabilidade",
    dataPedido: new Date("2026-06-15T03:10:00-03:00"),
    endereco: { bairro: "Copacabana", cep: "22040-002", cidade: "Rio de Janeiro", complemento: "Apto 302", estado: "RJ", numero: "455", referencia: "Perto da praia", rua: "Rua Barata Ribeiro" },
    experiencia: { experienciaAnterior: "Nunca tive pet, mas já pesquisei bastante sobre cuidados", jaTevePets: false },
    nomeAntigoDono: "Fernanda Lima",
    novoDonoId: "teste324",
    petId: "pet126",
    status: "pendente",
    nomePet: "Nina",
    usuario: { cpf: "000.000.000-03", dataNascimento: new Date("1998-03-17T00:00:00-03:00"), email: "diego.martins@example.com", nomeCompleto: "Diego Martins", telefone: "(21) 90000-0004" },
  },
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: true, posseMoradia: "próprio", tipoMoradia: "casa" },
    id: "pedido005",
    antigoDonoId: "teste123",
    comentario: "Já tenho um cachorro dócil e acredito que eles vão se adaptar bem",
    dataPedido: new Date("2026-06-15T04:45:00-03:00"),
    endereco: { bairro: "Água Verde", cep: "80620-000", cidade: "Curitiba", complemento: "", estado: "PR", numero: "981", referencia: "Casa com portão azul", rua: "Rua Amazonas" },
    experiencia: { experienciaAnterior: "Tenho experiência com adaptação entre animais", jaTevePets: true },
    nomeAntigoDono: "Rafael Souza",
    novoDonoId: "teste325",
    petId: "pet127",
    status: "pendente",
    nomePet: "Bob",
    usuario: { cpf: "000.000.000-04", dataNascimento: new Date("1985-06-30T00:00:00-03:00"), email: "elaine.rocha@example.com", nomeCompleto: "Elaine Rocha", telefone: "(41) 90000-0005" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: false, posseMoradia: "próprio", tipoMoradia: "apartamento" },
    id: "pedido006",
    antigoDonoId: "teste123",
    comentario: "Quero oferecer um lar calmo e seguro para ele",
    dataPedido: new Date("2026-06-15T05:05:00-03:00"),
    endereco: { bairro: "Moinhos de Vento", cep: "90570-020", cidade: "Porto Alegre", complemento: "Bloco B, Apto 1201", estado: "RS", numero: "220", referencia: "Em frente à farmácia", rua: "Rua Padre Chagas" },
    experiencia: { experienciaAnterior: "Já tive gato quando criança", jaTevePets: false },
    nomeAntigoDono: "Patrícia Gomes",
    novoDonoId: "teste326",
    petId: "pet128",
    status: "pendente",
    nomePet: "Simba",
    usuario: { cpf: "000.000.000-05", dataNascimento: new Date("1993-01-09T00:00:00-03:00"), email: "fabio.mendes@example.com", nomeCompleto: "Fábio Mendes", telefone: "(51) 90000-0006" },
  },
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: false, posseMoradia: "próprio", tipoMoradia: "casa" },
    id: "pedido007",
    antigoDonoId: "teste123",
    comentario: "Tenho quintal telado e rotina flexível para cuidar bem",
    dataPedido: new Date("2026-06-15T06:18:00-03:00"),
    endereco: { bairro: "Meireles", cep: "60165-121", cidade: "Fortaleza", complemento: "", estado: "CE", numero: "42", referencia: "Perto da avenida principal", rua: "Rua Silva Paulet" },
    experiencia: { experienciaAnterior: "Já tive vários cães resgatados", jaTevePets: true },
    nomeAntigoDono: "Lucas Barbosa",
    novoDonoId: "teste327",
    petId: "pet129",
    status: "pendente",
    nomePet: "Amora",
    usuario: { cpf: "000.000.000-06", dataNascimento: new Date("1991-11-14T00:00:00-03:00"), email: "gabriela.lopes@example.com", nomeCompleto: "Gabriela Lopes", telefone: "(85) 90000-0007" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: true, posseMoradia: "alugado", tipoMoradia: "apartamento" },
    id: "pedido008",
    antigoDonoId: "teste123",
    comentario: "Meu gato é tranquilo e já conviveu com outros animais",
    dataPedido: new Date("2026-06-15T07:22:00-03:00"),
    endereco: { bairro: "Pituba", cep: "41810-012", cidade: "Salvador", complemento: "Apto 506", estado: "BA", numero: "1500", referencia: "Próximo ao shopping", rua: "Avenida Paulo VI" },
    experiencia: { experienciaAnterior: "Tenho experiência com gatos adultos", jaTevePets: true },
    nomeAntigoDono: "Aline Duarte",
    novoDonoId: "teste328",
    petId: "pet130",
    status: "pendente",
    nomePet: "Milo",
    usuario: { cpf: "000.000.000-07", dataNascimento: new Date("1997-09-05T00:00:00-03:00"), email: "henrique.farias@example.com", nomeCompleto: "Henrique Farias", telefone: "(71) 90000-0008" },
  },
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: true, posseMoradia: "próprio", tipoMoradia: "casa" },
    id: "pedido009",
    antigoDonoId: "teste123",
    comentario: "A casa tem área externa segura e minha família ama animais",
    dataPedido: new Date("2026-06-15T08:40:00-03:00"),
    endereco: { bairro: "Ponta Verde", cep: "57035-000", cidade: "Maceió", complemento: "", estado: "AL", numero: "89", referencia: "Rua sem saída", rua: "Rua Deputado José Lages" },
    experiencia: { experienciaAnterior: "Já tive cachorro e gato juntos", jaTevePets: true },
    nomeAntigoDono: "Sérgio Teixeira",
    novoDonoId: "teste329",
    petId: "pet131",
    status: "pendente",
    nomePet: "Belinha",
    usuario: { cpf: "000.000.000-08", dataNascimento: new Date("1982-02-20T00:00:00-03:00"), email: "isabela.nunes@example.com", nomeCompleto: "Isabela Nunes", telefone: "(82) 90000-0009" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: false, posseMoradia: "alugado", tipoMoradia: "casa" },
    id: "pedido010",
    antigoDonoId: "teste123",
    comentario: "Estou preparado para arcar com alimentação, vacinas e cuidados",
    dataPedido: new Date("2026-06-15T09:15:00-03:00"),
    endereco: { bairro: "Tambaú", cep: "58039-010", cidade: "João Pessoa", complemento: "Fundos", estado: "PB", numero: "310", referencia: "Perto da escola municipal", rua: "Rua Professora Maria Sales" },
    experiencia: { experienciaAnterior: "Já cuidei de pets temporariamente", jaTevePets: true },
    nomeAntigoDono: "Renata Alves",
    novoDonoId: "teste330",
    petId: "pet132",
    status: "pendente",
    nomePet: "Fred",
    usuario: { cpf: "000.000.000-09", dataNascimento: new Date("1994-07-18T00:00:00-03:00"), email: "joao.victor@example.com", nomeCompleto: "João Victor", telefone: "(83) 90000-0010" },
  },
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: false, posseMoradia: "próprio", tipoMoradia: "casa" },
    id: "pedido011",
    antigoDonoId: "teste123",
    comentario: "Tenho rotina em casa e posso acompanhar a adaptação de perto",
    dataPedido: new Date("2026-06-15T10:00:00-03:00"),
    endereco: { bairro: "Asa Sul", cep: "70390-100", cidade: "Brasília", complemento: "Casa 5", estado: "DF", numero: "15", referencia: "Quadra próxima ao parque", rua: "SQS 308" },
    experiencia: { experienciaAnterior: "Já tive pets idosos e filhotes", jaTevePets: true },
    nomeAntigoDono: "Bianca Cardoso",
    novoDonoId: "teste331",
    petId: "pet133",
    status: "pendente",
    nomePet: "Pandora",
    usuario: { cpf: "000.000.000-10", dataNascimento: new Date("1989-10-27T00:00:00-03:00"), email: "karina.machado@example.com", nomeCompleto: "Karina Machado", telefone: "(61) 90000-0011" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: false, posseMoradia: "alugado", tipoMoradia: "apartamento" },
    id: "pedido012",
    antigoDonoId: "teste123",
    comentario: "Quero adotar com responsabilidade e seguir todas as orientações",
    dataPedido: new Date("2026-06-15T11:12:00-03:00"),
    endereco: { bairro: "Setor Bueno", cep: "74210-240", cidade: "Goiânia", complemento: "Apto 1002", estado: "GO", numero: "700", referencia: "Perto do parque", rua: "Avenida T-9" },
    experiencia: { experienciaAnterior: "Nunca tive pet próprio", jaTevePets: false },
    nomeAntigoDono: "Eduardo Ribeiro",
    novoDonoId: "teste332",
    petId: "pet134",
    status: "pendente",
    nomePet: "Jade",
    usuario: { cpf: "000.000.000-11", dataNascimento: new Date("2000-05-08T00:00:00-03:00"), email: "laura.ferreira@example.com", nomeCompleto: "Laura Ferreira", telefone: "(62) 90000-0012" },
  },
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: true, posseMoradia: "próprio", tipoMoradia: "casa" },
    id: "pedido013",
    antigoDonoId: "teste123",
    comentario: "Meus animais são vacinados e castrados, ambiente bem cuidado",
    dataPedido: new Date("2026-06-15T12:25:00-03:00"),
    endereco: { bairro: "Marco", cep: "66093-000", cidade: "Belém", complemento: "", estado: "PA", numero: "112", referencia: "Ao lado de uma clínica veterinária", rua: "Travessa Perebebuí" },
    experiencia: { experienciaAnterior: "Tenho muita experiência com resgate animal", jaTevePets: true },
    nomeAntigoDono: "Vanessa Moraes",
    novoDonoId: "teste333",
    petId: "pet135",
    status: "pendente",
    nomePet: "Tobias",
    usuario: { cpf: "000.000.000-12", dataNascimento: new Date("1980-09-19T00:00:00-03:00"), email: "marcos.vieira@example.com", nomeCompleto: "Marcos Vieira", telefone: "(91) 90000-0013" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: true, posseMoradia: "próprio", tipoMoradia: "apartamento" },
    id: "pedido014",
    antigoDonoId: "teste123",
    comentario: "Tenho rede de proteção e outro pet sociável",
    dataPedido: new Date("2026-06-15T13:33:00-03:00"),
    endereco: { bairro: "Adrianópolis", cep: "69057-070", cidade: "Manaus", complemento: "Apto 604", estado: "AM", numero: "66", referencia: "Condomínio próximo ao hospital", rua: "Rua Recife" },
    experiencia: { experienciaAnterior: "Já tive gato e cachorro", jaTevePets: true },
    nomeAntigoDono: "André Campos",
    novoDonoId: "teste334",
    petId: "pet136",
    status: "pendente",
    nomePet: "Pipoca",
    usuario: { cpf: "000.000.000-13", dataNascimento: new Date("1992-12-22T00:00:00-03:00"), email: "natalia.correia@example.com", nomeCompleto: "Natália Correia", telefone: "(92) 90000-0014" },
  },
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: false, posseMoradia: "alugado", tipoMoradia: "casa" },
    id: "pedido015",
    antigoDonoId: "teste123",
    comentario: "A casa possui muro alto e eu trabalho perto de casa",
    dataPedido: new Date("2026-06-15T14:41:00-03:00"),
    endereco: { bairro: "Jardim Camburi", cep: "29090-350", cidade: "Vitória", complemento: "", estado: "ES", numero: "500", referencia: "Próximo ao posto de saúde", rua: "Rua Carlos Gomes" },
    experiencia: { experienciaAnterior: "Já fui tutor de dois cachorros", jaTevePets: true },
    nomeAntigoDono: "Juliana Batista",
    novoDonoId: "teste335",
    petId: "pet137",
    status: "pendente",
    nomePet: "Rex",
    usuario: { cpf: "000.000.000-14", dataNascimento: new Date("1986-04-04T00:00:00-03:00"), email: "otavio.ramos@example.com", nomeCompleto: "Otávio Ramos", telefone: "(27) 90000-0015" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: false, posseMoradia: "próprio", tipoMoradia: "apartamento" },
    id: "pedido016",
    antigoDonoId: "teste123",
    comentario: "Tenho tempo livre à noite e finais de semana para cuidar dele",
    dataPedido: new Date("2026-06-15T15:50:00-03:00"),
    endereco: { bairro: "Centro", cep: "88010-400", cidade: "Florianópolis", complemento: "Apto 203", estado: "SC", numero: "28", referencia: "Perto do terminal", rua: "Rua Felipe Schmidt" },
    experiencia: { experienciaAnterior: "Já ajudei em lar temporário", jaTevePets: true },
    nomeAntigoDono: "Gustavo Rocha",
    novoDonoId: "teste336",
    petId: "pet138",
    status: "pendente",
    nomePet: "Kiara",
    usuario: { cpf: "000.000.000-15", dataNascimento: new Date("1996-06-16T00:00:00-03:00"), email: "priscila.andrade@example.com", nomeCompleto: "Priscila Andrade", telefone: "(48) 90000-0016" },
  },
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: false, posseMoradia: "próprio", tipoMoradia: "casa" },
    id: "pedido017",
    antigoDonoId: "teste123",
    comentario: "Tenho quintal amplo e família disposta a ajudar nos cuidados",
    dataPedido: new Date("2026-06-15T16:07:00-03:00"),
    endereco: { bairro: "Bosque", cep: "69900-078", cidade: "Rio Branco", complemento: "", estado: "AC", numero: "301", referencia: "Perto da igreja", rua: "Rua Alvorada" },
    experiencia: { experienciaAnterior: "Já tive pets de pequeno e médio porte", jaTevePets: true },
    nomeAntigoDono: "Letícia Figueiredo",
    novoDonoId: "teste337",
    petId: "pet139",
    status: "pendente",
    nomePet: "Bento",
    usuario: { cpf: "000.000.000-16", dataNascimento: new Date("1987-03-11T00:00:00-03:00"), email: "ricardo.melo@example.com", nomeCompleto: "Ricardo Melo", telefone: "(68) 90000-0017" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: true, posseMoradia: "alugado", tipoMoradia: "apartamento" },
    id: "pedido018",
    antigoDonoId: "teste123",
    comentario: "Tenho um cachorro tranquilo e faço passeios diários",
    dataPedido: new Date("2026-06-15T17:19:00-03:00"),
    endereco: { bairro: "Cohama", cep: "65074-115", cidade: "São Luís", complemento: "Apto 707", estado: "MA", numero: "900", referencia: "Ao lado do supermercado", rua: "Avenida Daniel de La Touche" },
    experiencia: { experienciaAnterior: "Já tive animais desde criança", jaTevePets: true },
    nomeAntigoDono: "Helena Torres",
    novoDonoId: "teste338",
    petId: "pet140",
    status: "pendente",
    nomePet: "Meg",
    usuario: { cpf: "000.000.000-17", dataNascimento: new Date("1999-01-29T00:00:00-03:00"), email: "sofia.carvalho@example.com", nomeCompleto: "Sofia Carvalho", telefone: "(98) 90000-0018" },
  },
  {
    ambiente: { areaExternaSegura: true, outrosAnimais: false, posseMoradia: "próprio", tipoMoradia: "casa" },
    id: "pedido019",
    antigoDonoId: "teste123",
    comentario: "Quero dar uma segunda chance e um lar permanente para ele",
    dataPedido: new Date("2026-06-15T18:30:00-03:00"),
    endereco: { bairro: "Farolândia", cep: "49032-000", cidade: "Aracaju", complemento: "", estado: "SE", numero: "74", referencia: "Próximo à praça principal", rua: "Rua Arauá" },
    experiencia: { experienciaAnterior: "Já tive um cachorro adotado", jaTevePets: true },
    nomeAntigoDono: "Márcio Lima",
    novoDonoId: "teste339",
    petId: "pet141",
    status: "pendente",
    nomePet: "Cacau",
    usuario: { cpf: "000.000.000-18", dataNascimento: new Date("1991-08-07T00:00:00-03:00"), email: "thiago.barbosa@example.com", nomeCompleto: "Thiago Barbosa", telefone: "(79) 90000-0019" },
  },
  {
    ambiente: { areaExternaSegura: false, outrosAnimais: false, posseMoradia: "alugado", tipoMoradia: "apartamento" },
    id: "pedido020",
    antigoDonoId: "teste123",
    comentario: "Tenho estabilidade financeira e muito carinho para oferecer",
    dataPedido: new Date("2026-06-15T19:45:00-03:00"),
    endereco: { bairro: "Centro", cep: "79002-071", cidade: "Campo Grande", complemento: "Apto 901", estado: "MS", numero: "100", referencia: "Prédio ao lado da farmácia", rua: "Rua 14 de Julho" },
    experiencia: { experienciaAnterior: "Nunca tive pet, mas tenho apoio da família", jaTevePets: false },
    nomeAntigoDono: "Cláudia Moreira",
    novoDonoId: "teste340",
    petId: "pet142",
    status: "pendente",
    nomePet: "Lola",
    usuario: { cpf: "000.000.000-19", dataNascimento: new Date("1998-10-10T00:00:00-03:00"), email: "vinicius.pinto@example.com", nomeCompleto: "Vinicius Pinto", telefone: "(67) 90000-0020" },
  },
]);
});

app.delete("/testeRelatorioDeletar", (req, res) => {
  return res.status(200).json({
    mensagem: "sucesso",
  })
})

app.put("/testeRelatorioEditar", (req, res) => {
  return res.status(200).json({
    mensagem: "sucesso",
  })
})

module.exports = app;