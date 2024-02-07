import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'

import emailVerifier from './middlewares/emailVerifier'
import idVerifier from './middlewares/idVerifier'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    return response.json('OK')

});

app.listen(8080, () => console.log("Servidor iniciado"))

let user = []
let annotations = []
let idUser = 1
let idNote = 1

//-------------------User Control---------------------------------------------------------

app.post('/singup', emailVerifier, async(req, res) => {
    let data = req.body
    let email = data.email
    let pass = data.pass
    let hashPassword = await bcrypt.hash(pass , 10)
    let emailAlreadyRegistered = user.findIndex(user => user.email === email)
    if (emailAlreadyRegistered == -1) {
        user.push({
            idUser: idUser,
            name: data.name,
            email: data.email,
            pass: hashPassword
        })
        idUser++
        res
            .status(201)
            .json({ sucess: true, msg: "Success: You have been successfully registered!" })
    } else {
        res
            .status(409)
            .json({ sucess: false, msg: "Error: This email address is already registered. Please use a different email address or try logging in." })
    }
})

app.get('/getusers', (req, res) => {
    res
        .status(200)
        .json({ success: true, msg: "Users retrieved successfully", data: user })
})

app.put('/updateuser/:userID', async(req, res) => {
    let data = req.body
    let userID = Number(req.params.userID)
    let newPassword = data.newPass
    let hashPassword = await bcrypt.hash(newPassword , 10)
    let indexUser = user.findIndex(user => user.idUser == userID)
    if (indexUser != -1) {
        const userUpdate = user[indexUser]
        userUpdate.name = data.newName
        userUpdate.email = data.newEmail
        userUpdate.pass = hashPassword
        res
            .status(200)
            .json({ success: true, msg: "User updated successfully", newUser: userUpdate })
    } else {
        res
            .status(404)
            .json({ success: false, msg: "Could not update the user" })
    }
})

app.delete('/excludeuser/:userID', idVerifier, (req, res) => {
    let userID = Number(req.params.userID)
    let indexUser = user.findIndex(user => user.idUser == userID)
    if (indexUser != -1) {
        user.splice(indexUser, 1)
        res
            .status(200)
            .json({ success: true, msg: "User successfully deleted" })
    } else {
        res
            .status(404)
            .json({ sucess: false, msg: "User not found" })
    }
})

//-------------------Note Control---------------------------------------------------------

app.get('/getnote', (req, res) => {
    res
        .status(200)
        .json({ sucess: true, msg: "Notes retrieved successfully", data: annotations })
})

app.post('/createnote', async(req, res) => {
    let data = req.body
    let email = data.email
    let password = data.pass
    let note = data.note
    let findEmail = user.findIndex(user => user.email === email)
    if (findEmail != -1) {
        let userEmail = user[findEmail]
        let passwordMath = await bcrypt.compare(password, userEmail.pass)
        if (passwordMath) {
            let findEmailAlreadyAnnotations = annotations.findIndex(user => user.email === email)
            if (findEmailAlreadyAnnotations == -1) {
                annotations.push({
                    idAnnotation: idNote,
                    email: email,
                    annotations: note
                })
                idNote++
                res
                    .status(200)
                    .json({ sucess: true, msg: "Logged in successfully", data: annotations })
            } else {
                res
                    .status(400)
                    .json({ success: false, msg: "User already has a message registered." })
            }

        } else {
            res
                .status(401)
                .json({ success: false, msg: "Error: Invalid password." })
        }
    } else {
        res.json("Email not found, User not registred")
    }
})

app.delete('/deletenote/:idAnnotation', (req, res) => {
    let idAnnotation = Number(req.params.idAnnotation)
    let findID = annotations.findIndex(annotation => annotation.idAnnotation === idAnnotation)
    if (findID != -1) {
        annotations.splice(findID, 1)
        res
            .status(200)
            .json({ success: true, msg: "Message has been deleted." })
    } else {
        res
            .status(400)
            .json({ success: false, msg: "No message was found with the indicated ID." })
    }
})

app.put('/updatenote/:idAnnotation', async(req, res) => {
    let idAnnotation = Number(req.params.idAnnotation)
    let data = req.body
    let email = data.email
    let password = data.pass
    let note = data.note

    let findEmail = user.findIndex(user => user.email === email)
    let findID = annotations.findIndex(annotation => annotation.idAnnotation === idAnnotation)
    if (findID != -1) {
        let userEmail = user[findEmail]
        let passwordMath = await bcrypt.compare(password, userEmail.pass)
        if (passwordMath) {
            let bringAnotation = annotations[findID]
            bringAnotation.annotations = note
            res
                .status(200)
                .json({ success: true, msg: "Message for altered message.", data: bringAnotation })
        } else {
            res
                .status(400)
                .json({ sucess: false, msg: "Incorrect username or password." })
        }
    } else {
        res
            .status(400)
            .json({ success: false, msg: "Annotation not found" })
    }
})