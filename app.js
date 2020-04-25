const expres = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = expres();

const PORT = process.env.PORT || 3000;

dotenv.config();

// midelwares
app.use(expres.json());
app.use(expres.urlencoded({ extended: false }));

//rutas
app.use(require('./routes/index.routes'));

// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})
mongoose.connection
    .openUri(process.env.MONGO, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('Database connected');
    })
    .catch((error) => {
        throw error;
    });

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});
