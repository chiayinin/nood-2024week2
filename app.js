import * as http from 'http';

const requestListener = (req, res) => {
  console.log('路由:', req.url);
  res.end();
};

const app = http.createServer(requestListener);
app.listen(3005);
