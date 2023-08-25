const express=require('express');
const app = express();
const route = require('./Routes/contact_routes');

app.use(express.json());
app.use('/api', route);
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});