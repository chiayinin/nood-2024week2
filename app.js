import * as http from 'http';
import mongoose from 'mongoose';
import Post from './modules/posts.js';
import handleSuccess from './handleSuccess.js';
import handleError from './handleError.js';

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
    const post = await Post.find(); // 透過 mongoose find() 方法取得所有資料
    handleSuccess(res, post);
    res.end();
  } else if(req.url == '/posts' && req.method == 'POST') { // 新增單筆資料
    req.on('end', async() => {
      try {
        // {
        //   "name": "aaa",
        //   "tags": "aaa",
        //   "context": "aaa",
        //   "type": "group"
        // }
        const data = JSON.parse(body);
        const newPost = await Post.create(data);

        handleSuccess(res, newPost);
        res.end();
      } catch (error) {
        handleError(res, error);
        res.end();
      }
    })
  } else if(req.url.startsWith('/posts/') && req.method == 'PATCH') {
    req.on('end', async() => {
      try {
        let data = JSON.parse(body);
        let id = req.url.split('/').pop();
        const updataPost = await Post.findByIdAndUpdate(id, data);

        handleSuccess(res, updataPost);
      } catch(error) {
        handleError(res, error);
      }
    });
  } else if(req.method == 'OPTIONS') { // OPTIONS
    res.writeHead(200, headers);
    res.end();
  } else { // 404
    res.writeHead(404, headers);
    res.write(JSON.stringify({
      "status": "false",
      "message": "無此網站路徑"
    }))
    res.end();
  }
};

const app = http.createServer(requestListener);
app.listen(3005);
