const http = require('http');
const fs = require('fs');

const readFile = (file) => {
  return new Promise((resolve, reject)=> {
    fs.readFile(file, (err, data)=> {
      if(err){
        reject(err);
      }else{
        resolve(data.toString())
      }
    })
  })
}

const readFileJSON = async (file) => {
  const jsonString = await readFile(file);
  return JSON.parse(jsonString);
}

const server = http.createServer( async (req, res) => {
  try{
    if(req.url === '/'){
      const html = await readFile('./index.html')
      res.write(html);
      res.end();
    }
    else if (req.url === './api/guest'){
      const users = await readFileJSON('./users.json')
      res.write(JSON.stringify(users));
      res.end()
    }
  }
  catch{
    res.statusCode = 500;
    res.write(ex.message);
    res.end();
  }
})

server.listen(3001);
