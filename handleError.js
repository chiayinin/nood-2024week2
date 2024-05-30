const headers = {
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
  'Content-Type': 'application/json'
};
const handleError = (res, err) => {
  res.writeHead(400,headers);
  res.write(JSON.stringify({
    status: false,
    message: err.message ? err.message : "資料有誤或無此 ID"
  }));
  res.end();
};

module.exports = handleError;
