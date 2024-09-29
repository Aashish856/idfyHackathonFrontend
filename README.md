This is the frontend for pii detection pipeline

To start
Step 1 - npm install
Step 2 - npm start

There are four options available for the data streams

Currently - MySql and Custom data are working

Custom Data -:

-> Some datafiles are stored in backend to replicate the different data streams like structured, unstrutured, semi-structured

-> You can mention the path and type in the input boxes and pii detection algo will run on that data

Path for structured data -> "./data/structured_data.csv"

Path for unstructured data -> "./data/unstructured_data"

Path for semi-structured_data -> "./data/semi_structured_data.json"



For Sql Database

i have made a free account on freemysqlhosting.net and pushed some tables in that

You can use below mentioned credentials to test out my sql data stream

// Database configuration

const dbConfig = {

  host: 'sql12.freemysqlhosting.net',

  user: 'sql12734197',

  password: 'RGjLjw6t55',

  database: 'sql12734197',
};
