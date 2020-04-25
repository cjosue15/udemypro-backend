const expres = require('express');
const mongoose = require('mongoose');

const app = expres();

const PORT = process.env.PORT || 3000;

// midelwares
app.use(expres.json());
app.use(expres.urlencoded({ extended: false }));

//rutas
app.use(require('./routes/index.routes'));

// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true})
mongoose.connection
    .openUri('mongodb://localhost:27017/hospitalDB', {
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
