const express = require('express');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const cors = require('cors');
const DBURI = 'mongodb+srv://root:1234@cluster0.7soze.mongodb.net/tp?retryWrites=true&w=majority'

const app = express();
const routes = require('./routes');

async function boostrap() {

    try {

        console.log(`trying to connect to mongoDB: ${DBURI}`);

        await mongoose.connect(DBURI, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            authSource: 'admin'
        }, function (error) {
            if (error) {
                console.log(error);
            } else {
                console.log('Connected to DB');
            }
        });
        app.listen(3001, () => {
            console.log(`Server started on port : ${3001 || 3001} ...`);
        });
        app.use(cors());

        routes(app);
    }catch (e){
        console.error(`Error in server : ${e.toString()}`);
        console.log(e)
    }
}

boostrap().then();
