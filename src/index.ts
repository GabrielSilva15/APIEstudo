import {v4 as geraIdAleatorio} from 'uuid';
import express, {Request, Resolve} from 'express'

const app = express();

type Book = {
    id:string,
    titulo:string,
    autor:string
}

type User = {
    id:string,
    nome:string,
    cpf:string,
    books:Book[],
}

let clientes:User[] =[];

app.listen('3000',()=>{
    console.log('oi');
})

app.use(express.json());

app.get('/clientes',(req:Request,res:Resolve)=>{
    return res.status(200).json(clientes);
})

app.get('/clientes/:id',(req:Request,res:Resolve)=>{
    const {id} = req.params;

    const user = clientes.find(cliente => cliente.id === id);

    if(!user){
        return res.status(400).json('Erro ao tentar encontrar usuário com esse id');
    }

    return res.status(200).json(user);
})


app.post('/clientes/create',(req:Request,res:Resolve)=>{
    const {nome,cpf,books} = req.body;
    console.log(nome);
    
    let newUser:User ={
        id:geraIdAleatorio(),
        nome,
        cpf,
        books
    }   

    clientes.push(newUser);

    return res.status(200).json(clientes);
})


app.put('/clientes/:id',(req:Request,res:Resolve)=>{
    const {id} = req.params;
    const attUser = req.body;

    let indice = clientes.findIndex(cliente => cliente.id === id);

    console.log(indice);
    
    if(!clientes[0]){
        return res.status(400).json('Não foi possível realizar a atualização do usuário pois ele é inexistente');
    }

    
    clientes[indice].nome = attUser.nome ? attUser.nome : clientes[indice].nome;
    clientes[indice].cpf = attUser.cpf ?  attUser.cpf  : clientes[indice].cpf; 
    clientes[indice].books = attUser.books ? attUser.books : clientes[indice].books; 

    console.log(clientes);
    
    return res.status(200).json(clientes);
})


app.delete('/clientes/:id',(req:Request,res:Resolve)=>{
    const {id} = req.params;
    let arrayAtualizado:User[] = [];
    let ar = clientes.find((cliente)=> {
        if(cliente.id !== id){
            arrayAtualizado.push(cliente);
        }})

    clientes = [...arrayAtualizado];

    return res.status(200).json(clientes);
})