const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const adddeleteRoutes=require('./routes/AddDelete');
const Product=require('./models/Product')
dotenv.config();

const app = express();

app.use(cors());



app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  const userRoutes = require('./routes/UserRoutes'); 
  app.use('/user', userRoutes);

app.use('/auth', authRoutes);
app.use('/adddelete',adddeleteRoutes);
app.get("/products",  async (req, res) => {
  try {
      const products = await Product.find(); 
      res.status(200).json(products); 
  } catch (error) {
      res.status(500).json({ message: "Error fetching products", error });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
