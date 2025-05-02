import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const app = express();
const prisma = new PrismaClient();
app.use(cors()) // habilita CORS

app.use(express.json());

// Criar usuário
app.post('/usuarios', async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age
      }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.', details: error.message });
  }
});

// Listar usuários
app.get('/usuarios', async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.', details: error.message });
  }
});

app.put('/usuarios/:id', async (req, res) => {
  try{
    await prisma.user.update({
        where: {
            id: req.params.id
        },

        data: {
          email: req.body.email,
          name: req.body.name,
          age: req.body.age
        }
    })
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários.', details: error.message });
  }
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: "Usuário deletado com sucesso"})
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
