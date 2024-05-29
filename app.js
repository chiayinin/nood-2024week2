import * as http from 'http';
import mongoose from 'mongoose';
import Post from './modules/posts.js';

const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
}

mongoose
  .connect('mongodb://localhost:27017/posts')
  .then(() => console.log("mongoose 資料庫連結成功"));

const requestListener = async (req, res) => {
  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  // 取得所有資料
  if(req.url == '/posts' && req.method == 'GET') {
    console.log('GET ALL');
    const post = await Post.find(); // 透過 mongoose find() 方法取得所有資料

    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "status" : "success",
      post
    }));
    res.end();
  } else if(req.method == 'OPTION') {
    res.writeHead(200, headers);
    res.end();
  } else {
    console.log('else');
  }
};

const app = http.createServer(requestListener);
app.listen(3005);
