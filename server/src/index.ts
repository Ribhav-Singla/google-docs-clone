import { Server } from "socket.io";
import mongoose from 'mongoose';
import {Document} from './schema'

mongoose.connect('mongodb+srv://ribhavsingla:votVM7N6QbadQkUZ@cluster0.qx2gg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err)=>{
    console.log('Error connecting to MongoDB')
})

const io = new Server(3001,{
    cors:{
        origin : '*',
        methods : ['GET', 'POST'],
    }
})

io.on('connection', (socket)=>{

    socket.on('get-document',async (documentId) =>{
        const document = await findOrCreateDocument(documentId)
        if(!document) return
        socket.join(documentId)
        socket.emit('load-document',document.data)

        socket.on('send-changes',(delta:any)=>{
            socket.broadcast.to(documentId).emit('receive-changes', delta)
        })

        socket.on('save-document',async data=>{
            await Document.findByIdAndUpdate( documentId , { data })
        })
    })

})

const findOrCreateDocument = async(id:string)=>{
    if(id == null) return
    const document = await Document.findById(id)
    if(document) return document
    // else create a new document with data set as empty string
    return await Document.create({_id : id ,data : ""})
}