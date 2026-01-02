const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

const DATA_FILE = path.join(__dirname, 'data', 'rsvps.json');

function ensureDataFile(){
  const dir = path.dirname(DATA_FILE);
  if(!fs.existsSync(dir)) fs.mkdirSync(dir, {recursive:true});
  if(!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}

app.post('/api/rsvp', (req, res) => {
  const {name, email, guests} = req.body || {};
  if(!name || !email) return res.status(400).json({message:'Nome e email são obrigatórios.'});

  ensureDataFile();
  try{
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const arr = JSON.parse(raw || '[]');
    const entry = {
      id: Date.now(),
      name: String(name),
      email: String(email),
      guests: Number(guests) || 1,
      message: req.body.message || '',
      time: new Date().toISOString()
    };
    arr.push(entry);
    fs.writeFileSync(DATA_FILE, JSON.stringify(arr, null, 2), 'utf8');
    return res.status(201).json({message:'Salvo'});
  }catch(err){
    console.error('Erro ao salvar RSVP', err);
    return res.status(500).json({message:'Erro interno ao salvar.'});
  }
});

app.get('/api/rsvps', (req, res) => {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  res.json(JSON.parse(raw || '[]'));
});

app.listen(PORT, ()=>{
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
