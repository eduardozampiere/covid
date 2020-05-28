const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/covid", {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
	console.log("MongoDB connected");
}).catch((err) => {
	console.log("Error in MongoDB connection");
});
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

module.exports = mongoose;