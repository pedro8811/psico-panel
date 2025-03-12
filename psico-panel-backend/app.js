const express = require('express')
const { Sequelize, DataTypes } = require('sequelize')
const app = express()

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
})

const Pessoa = sequelize.define('Pessoa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  datainicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
  datafim: {
    type: DataTypes.DATE,
    allowNull: false
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

const Agendamento = sequelize.define('Agendamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  inicio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fim: {
    type: DataTypes.STRING,
    allowNull: false
  },
  idpessoa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Pessoa,
      key: 'id'
    }
  }
})

// Relacionamento
Pessoa.hasMany(Agendamento, { foreignKey: 'idpessoa' })
Agendamento.belongsTo(Pessoa, { foreignKey: 'idpessoa' })

app.use(express.json())

// CRUD Pessoa
app.post('/pessoas', async (req, res) => {
  try {
    const pessoa = await Pessoa.create(req.body)
    res.status(201).json(pessoa)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/pessoas', async (req, res) => {
  const pessoas = await Pessoa.findAll()
  res.json(pessoas)
})

app.get('/pessoas/:id', async (req, res) => {
  const pessoa = await Pessoa.findByPk(req.params.id)
  if (pessoa) {
    res.json(pessoa)
  } else {
    res.status(404).json({ message: 'Pessoa não encontrada' })
  }
})

app.put('/pessoas/:id', async (req, res) => {
  const pessoa = await Pessoa.findByPk(req.params.id)
  if (pessoa) {
    await pessoa.update(req.body)
    res.json(pessoa)
  } else {
    res.status(404).json({ message: 'Pessoa não encontrada' })
  }
})

app.delete('/pessoas/:id', async (req, res) => {
  const pessoa = await Pessoa.findByPk(req.params.id)
  if (pessoa) {
    await pessoa.destroy()
    res.status(204).end()
  } else {
    res.status(404).json({ message: 'Pessoa não encontrada' })
  }
})

// CRUD Agendamento
app.post('/agendamentos', async (req, res) => {
  try {
    const agendamento = await Agendamento.create(req.body)
    res.status(201).json(agendamento)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/agendamentos', async (req, res) => {
  const agendamentos = await Agendamento.findAll({ include: Pessoa })
  res.json(agendamentos)
})

app.get('/agendamentos/:id', async (req, res) => {
  const agendamento = await Agendamento.findByPk(req.params.id, { include: Pessoa })
  if (agendamento) {
    res.json(agendamento)
  } else {
    res.status(404).json({ message: 'Agendamento não encontrado' })
  }
})

app.put('/agendamentos/:id', async (req, res) => {
  const agendamento = await Agendamento.findByPk(req.params.id)
  if (agendamento) {
    await agendamento.update(req.body)
    res.json(agendamento)
  } else {
    res.status(404).json({ message: 'Agendamento não encontrado' })
  }
})

app.delete('/agendamentos/:id', async (req, res) => {
  const agendamento = await Agendamento.findByPk(req.params.id)
  if (agendamento) {
    await agendamento.destroy()
    res.status(204).end()
  } else {
    res.status(404).json({ message: 'Agendamento não encontrado' })
  }
})

sequelize.sync({ force: true }).then(() => {
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000')
  })
})