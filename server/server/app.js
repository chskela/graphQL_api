const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');


const init = async () => {

  const PORT = process.env.PORT || 3005;
  const app = express();

  app.use(cors());

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
  }));

  try {
    await app.listen(PORT);
  } catch (err) {
    console.log(`Error while starting server: ${err.message}`);
  }

  console.log(`Server running at: ${PORT}`);

  mongoose.connect('mongodb+srv://chskela:Ch6517221@cluster0-gl1x3.mongodb.net/graphql', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on('error', (error) => console.log(`db connection ${error}`));
  db.once('open', () => console.log('db connection'));
};

init();
