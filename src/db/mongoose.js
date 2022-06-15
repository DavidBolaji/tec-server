const mongoose = require('mongoose');
let server;
if (process.env.ENV === "local") {
    server = process.env.MONGODB_URI_LOCAL
} else {
    server = process.env.MONGODB_URI_PROD
}
mongoose.connect(server, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true
})

module.exports = mongoose;