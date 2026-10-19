// reference to express npm lib
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
// local file imports
import spices from './controllers/spiceController.js';
// create instance of a new express application
const app = express();
app.use(express.json());
// mongoose db conn
const db = process.env.DB || "";
mongoose.connect(db, {})
    .then((res) => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
// swagger setup
const swaggerSpec = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'FitPal API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/*.js']
};
// Create document from specs
const openApiSpecs = swaggerJSDoc(swaggerSpec);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpecs));
// Map url
app.use('api/v1/spices', spices);
// run express web server & listen for http requests
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Express running at https://localhost:4000`);
});
