const express = require("express")
const server = express()

// pegar banco de dados
const db = require("./database/db")
// Configurar pasta publica
server.use(express.static("public"))

server.use(express.urlencoded({extended: true}))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

//configurar caminhos da minha aplicação
// página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um titulo"})

})

server.get("/create-point", (req, res) => {

    // req.query: 
    req.query
    return res.render("create-point.html",)

})

server.post("/savepoint", (req, res) => {

    console.log(req.body)

     const query = `
            INSERT INTO places (
                image,
                name,
                address,
                address2,
                state,
                city,
                itens
            ) VALUES (?,?,?,?,?,?,?);
        `

        const values = [
            req.body.image,
            req.body.name,
            req.body.address,
            req.body.address2,
            req.body.state,
            req.body.city,
            req.body.itens
        ]

        function afterInsertData(err) {
            if(err) {
                 console.log(err)
                 return req.send("Erro no Cadastro")
            }

            return res.render("create-point.html", { saved: true})
        }
        db.run(query, values, afterInsertData)

    
      db.all(`SELECT * FROM places`, function(err, rows) {
          if(err) {
              return console.log(err)
        }

    

    }) 
    })

server.get("/search-results", (req, res) => {

    const search = req.query.search 

    if(search == "") {
        return res.render("search-results.html", { total: 0}) 
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
            if(err) {
                return console.log(err)
            }
    
            const total =rows.length
           return res.render("search-results.html", { places: rows, total})
        })



        })
    
// ligar o servidor
server.listen(3000)