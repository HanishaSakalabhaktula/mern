const mongoose = require('mongoose')

module.exports = () => {
    try{
        mongoose.connect(process.env.DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("database connection successful");
    }catch(e){
        console.log(e);
        console.log("Could not connect")
    }
}