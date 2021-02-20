const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

require('./config/mongoose.config'); 
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
require('./routes/user.routes')(app);
require('./routes/customer.routes')(app);
require('./routes/type.routes')(app);
require('./routes/fridge.routes')(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000")
})
