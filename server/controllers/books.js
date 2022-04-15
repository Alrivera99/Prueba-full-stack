const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt-node");
const jwt = require("../services/jwt")
const Book = require("../models/books");
const { exists } = require("../models/books");


function createBook(req, res){
    const books =new Book();
    const { title, author, year,genre} = req.body;
    title.title=title;
    author.author=author;
    books.year = year;
    books.genre = genre;
    books.active =  true;
   
    books.save((err, booksStored) =>{
        if(err){
            res.status(500).send({message: "El libro ya existe"});
        }else{
            if(!booksStored){
                res.status(404).send({message: "Error al crear al libro"});
            }else{
                res.status(200).send({books: booksStored, message: "Libro creado correctamente."});
            }
        }
    });
}

function getBook(req, res){
    Book.find().then(Books =>{
        if(!Books){
            res.status(404).send({message: "No se ha encontrado ningun libro"});
        } else{
            res.status(200).send({Books});
        }
    })
}

function getBookActive(req, res){
    const query = req.query;
    Book.find({active: query.active}).then(Books =>{
        if(!Books){
            res.status(404).send({message: "No se ha encontrado ningun libro"});
        } else{
            res.status(200).send({Books});
        }
    })
}

function uploadAvatar (req, res){
    const params = req.params;
    Book.findById({ _id: params.id}, (err, bookData) => {
        if(err){
            res.status(500).send({ message : "Error del servidor"})
        } else{
            if(!bookData){
                res.status(404).send({message: "No se ha encontrado ningun usuario."})
            } else{
                let book = bookData;   

                if(req.files){
                    let filePath = req.files.avatar.path;
                    let fileSplit = filePath.split('\\');
                    let fileName = fileSplit[2];

                    let extSplit = fileName.split(".");
                    let fileExt = extSplit[1];

                
                    if(fileExt !== "png" && fileExt !== "jpg"){
                        res.status(400).send({message: "La extension de la imagen no es valida.(Extensiones permitidas: .png, .jpg)"});
                    }
                    else{
                        book.avatar = fileName;
                        Book.findByIdAndUpdate({ _id: params.id}, book, (err, bookResult) =>{
                            if(err){
                                res.status(500).send({message: "Error del servidor."});
                            } else{
                                if(!bookResult){
                                    res.status(400).send({message: "No se ha encontrado ningun libro."})
                                } else{
                                    res.status(200).send({ avatarName: fileName});
                                }
                            }
                        })
                    }
                }
            }
        }
    })   

}

function getAvatar(req, res){
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/avatar/" + avatarName;

    fs.exists(filePath, exists =>{
        if(!exists){
        res.status(404).send({message: "El avatar que buscas no existe."})
        } else{
            res.sendFile(path.resolve(filePath));
        }
    });
}

async function updateBook(req, res){
    var BookData = req.body;
    BookData.title = req.body.title
    BookData.author = req.body.author
    BookData.year = req.body.year
     BookData.genre = req.body.genre
    const params = req.params;

    Book.findByIdAndUpdate({ _id: params.id}, BookData, (err, bookUpdate) =>{
        if(err){
            res.status(500).send({ message: "Error del servidor."});
        } else{
            if(!bookUpdate){
                res.status(404).send({message: "No se ha encontrado ningun libro."})
            } else{
                res.status(200).send({message: "Libro actualizado correctamente"})
            }
        }
    })
}

function deleteBook(req, res){
    const {id} = req.params

    Book.findByIdAndRemove(id, (err, bookDelete) =>{
        if(err){
            res.status(500).send({message: "Error del servidor."});
        }else{
            if(!bookDelete){
                res.status(404).send({message: "No se ha encontrado el libro."});
            } else{
                res.status(200).send({message: "El libro fue eliminado correctamente"})
            }
        }
    })
}

module.exports={
    createBook,
    getBook,
    getBookActive,
    getAvatar,
    uploadAvatar,
    updateBook,
    deleteBook
}; 