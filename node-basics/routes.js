const fs = require('fs');

function requestHandler(req, res) {
    res.setHeader('Content-Type','text/html');
    res.statusCode = 200;
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        res.write(`
        <html>
            <head>
                <title>Node Js</title>
            </head>
            <body>
                <h3>Enter the message</h3>
                <form action="/message" method="post">
                    <input type="text" name="message" id="">
                    <button type="submit"> Send</button>
                </form>
            </body>
        </html>
        `);
        return res.end();
    }
    else if( url === '/message' && method === 'POST') {
        let body = [];
        req.on('data',(chunk)=>{
            body.push(chunk);
        })
        req.on('end',()=>{
            const bodyParser = Buffer.concat(body).toString();
            const msg = bodyParser.split('=')[1];
            fs.writeFile('message.txt',msg, err =>{
                res.statusCode = 302;
                res.setHeader('Location','/');
                return res.end();
            });
        })

    }
    res.write(`
    <html>
        <head>
            <title>node js</title>
        </head>
        <body>
            <h1>I have strongest body </h1>
        </body>
    </html>
    `);
    res.end()
}

module.exports  = requestHandler;