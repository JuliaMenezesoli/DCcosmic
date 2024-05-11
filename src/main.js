const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const port = 3000
mongoose.connect('mongodb+srv://julimenezesoli:PXjZq8JCvlI4EXCb@dc.vxyp5ac.mongodb.net/?retryWrites=true&w=majority&appName=DC')

const Film = mongoose.model('Film', {
    title : String,
    description : String,
    imagem_url: String,
    trailer_url: String,

}); 

app.get("/", async (req, res)=> {
    const films = await Film.find()
    return res.send(films) 
} )

app.delete("/:id", async (req, res) => {
const film = await Film.findByIdAndDelete (req.params.id)
return res.send(film)
} )

app.put("/:id", async (req, res) =>  {
const film = await Film.findByIdAndUpdate (req.params.id, {
        title: req.body.title,
        description: req.body.description,
        imagem_url: req.body.imagem_url,
        trailer_url: req.body.trailer_url, 
}) 

return res.send(film)

})

app.post("/", async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        imagem_url: req.body.imagem_url,
        trailer_url: req.body.trailer_url,

    })

    await film.save()
    return res.send(film)

} ) 

app.listen(port, () => {
    console.log('App running'
    )
} )