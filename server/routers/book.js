const express = require("express")

const BookController = require("../controllers/books")
const multipart = require("connect-multiparty");

const md_auth = require('../middlewares/authenticated')
const md_upload_avatar = multipart({uploadDir: "./uploads/avatar"})
const api = express.Router();

api.get("/books",[md_auth.ensureAuth], BookController.getBook);
api.post("/create-book", BookController.createBook);
api.get("/book-active",[md_auth.ensureAuth], BookController.getBookActive);
api.put("/upload-avatar-book/:id",[md_auth.ensureAuth, md_upload_avatar], BookController.uploadAvatar);
api.get("/get-avatar-book/:avatarName", BookController.getAvatar);
api.put("/activate-book/:id", [md_auth.ensureAuth], BookController.activateBook);
api.delete("/delete-book/:id", [md_auth.ensureAuth], BookController.deleteBook)
api.put("/update-book/:id", [md_auth.ensureAuth], BookController.updateBook);
module.exports = api;