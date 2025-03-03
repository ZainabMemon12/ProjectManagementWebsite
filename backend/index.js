const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
const cors = require('cors')
const path = require('path');
// adminpaths
const adminRoutes = require("./routes/admin.route.js")
const adminModel = require('./models/admin.model.js')
// projectpaths
const projectModel = require('./models/project.model.js');
const projectRoute = require('./routes/project.route.js');






app.use(cors());

app.use(cors({
    origin: "https://projectmanagementwebsite-frontend.onrender.com/", 
    methods: ["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type","Authorization"] ,
    credentials: true, 
}));
// middle wares 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Backend is live! 🚀");
});

// routes
app.use("/api/admin",adminRoutes)
app.use('/api/project', projectRoute);



// mongodb connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log(err);
    });
  
    const PORT = process.env.PORT || 4000;
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`)
    })
