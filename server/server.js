const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://csms1008:0u9oVyCt3MtZfGJr@cluster0.33sk1uu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

// Define the victim schema
const victimSchema = new mongoose.Schema({
  ncrp: String,
  dateOfFraud: Date,
  victimName: String,
  totalAmountLost: String,
});

const Victim = mongoose.model('Victim', victimSchema);

// Routes
app.post('/todos', async (req, res) => {
  try {
    const { ncrp, dateOfFraud, victimName, totalAmountLost } = req.body;
    const newVictim = new Victim({ ncrp, dateOfFraud, victimName, totalAmountLost });
    await newVictim.save();
    res.status(201).json(newVictim);
  } catch (error) {
    console.error('Error adding victim: ', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
