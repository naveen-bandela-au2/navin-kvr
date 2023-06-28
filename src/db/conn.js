const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connection successfull!',process.env.MONGO_URI);
}).catch((e) => {
    console.log('Connection failed!',process.env.MONGO_URI);
})
