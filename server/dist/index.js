"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = require("./schema");
mongoose_1.default.connect('mongodb+srv://ribhavsingla:votVM7N6QbadQkUZ@cluster0.qx2gg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.log('Error connecting to MongoDB');
});
const io = new socket_io_1.Server(3001, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});
io.on('connection', (socket) => {
    socket.on('get-document', (documentId) => __awaiter(void 0, void 0, void 0, function* () {
        const document = yield findOrCreateDocument(documentId);
        if (!document)
            return;
        socket.join(documentId);
        socket.emit('load-document', document.data);
        socket.on('send-changes', (delta) => {
            socket.broadcast.to(documentId).emit('receive-changes', delta);
        });
        socket.on('save-document', (data) => __awaiter(void 0, void 0, void 0, function* () {
            yield schema_1.Document.findByIdAndUpdate(documentId, { data });
        }));
    }));
});
const findOrCreateDocument = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id == null)
        return;
    const document = yield schema_1.Document.findById(id);
    if (document)
        return document;
    // else create a new document with data set as empty string
    return yield schema_1.Document.create({ _id: id, data: "" });
});
