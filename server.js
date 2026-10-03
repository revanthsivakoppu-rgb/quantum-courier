'use strict';
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=__dirname,port=Number(process.env.PORT||4173);
http.createServer((req,res)=>{let rel;try{rel=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
const allowed=new Set(['/','/index.html','/style.css','/quantum.js','/game.js','/replay.js','/levels.js','/onboarding.js','/home-lab.js']);if(!allowed.has(rel)){res.writeHead(404);res.end('Not found');return;}
const file=path.join(root,rel==='/'?'index.html':rel.slice(1));fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8'}[path.extname(file)],'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(data);});
}).listen(port,'127.0.0.1',()=>console.log(`Quantum Courier ready at http://127.0.0.1:${port}`));
