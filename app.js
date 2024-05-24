import * as http from 'http';
import mongoose from 'mongoose';

mongoose
  .connect('mongodb://localhost:27017/posts')
  .then(() => console.log("mongoose 資料庫連結成功"));

const requestListener = (req, res) => {
  console.log('路由:', req.url);
  res.end();
};

const app = http.createServer(requestListener);
app.listen(3005);
