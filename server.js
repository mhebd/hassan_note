const express = require('express');
const dotenv = require('dotenv').config({ path: 'config/.env' });
const morgan = require('morgan');
const cors = require('cors');
const database = require('./db/database');
const error = require('./middleware/error');
const path = require('path');

// Routes Path
const userRouter = require('./router/userRoute');
const articleRouter = require('./router/articleRoute');
const categoryRouter = require('./router/categoryRoute');
const pageRouter = require('./router/pageRoute');
const commentRouter = require('./router/commentRoute');
const settingRouter = require('./router/settingRoute');
const uploadImgRouter = require('./router/uploadImgRoute');

// Create Server
const app = express();

// Use MiddleWare
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '/')));

// Add Database
database();

// Route End Point
app.use('/api/v1/user', userRouter);
app.use('/api/v1/article', articleRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/page', pageRouter);
app.use('/api/v1/comment', commentRouter);
app.use('/api/v1/setting', settingRouter);
app.use('/api/v1/upload-img', uploadImgRouter);

// Show Error Message
app.use(error);

//->Show UI...
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
} else if (process.env.NODE_ENV === 'development') {
	app.get('/', (req, res) => {
		res.send('Hello, Developer...');
	});
}

// Listening Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log(`Server is running on http://localhost:${PORT}`);
	}
});
