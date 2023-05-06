const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer((req,res)=>{


    console.log(req.url);
   


    if(req.url ==='/'){
        
        fs.readFile(path.join(__dirname,'public','index.html'), (err, content)=>{
            if (err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(content);

        });
    }
    else if(req.url =='/about.html'){

        fs.readFile(path.join(__dirname,'public','aboutX.html'),(err, content)=>{
            if (err) throw err;
            res.writeHead(200,{'Content-Type':'text/html'});
            res.end(content);
        })

    }
    else if (req.url.startsWith('/Images/')) {
        const imagePath = path.join(__dirname, 'public', req.url);
        const imageStream = fs.createReadStream(imagePath);

        res.setHeader("Access-Control-Allow-Origin", "*");

        
        if (req.url.match(/.*\.jpg$/i)) {
          res.writeHead(200, { 'Content-Type': 'image/jpg' });
        }
      
        imageStream.pipe(res);
      
        imageStream.on('error', () => {
          res.writeHead(404, { 'Content-type': 'text/html' });
          res.end("<h1> 404 Not Found </h1>");
        });
      }  
    else if (req.url === '/style.css') { // else if statement for style.css
        fs.readFile(path.join(__dirname, 'public', 'style.css'), (err, content) => {
            if (err) throw err;
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.writeHead(200, { 'Content-type': 'text/css' });
            res.end(content);
        });}
    else if(req.url ==='/api'){

        

            
            //Code to connect to MongoDB:     
    
            var input;
    
           
            const { MongoClient } = require('mongodb');
    
            main(processData);
            async function main(callback) {
    
                const uri =  "mongodb+srv://chandusekhar1997:Iamgtus%402022@cluster0.ignav6z.mongodb.net/?retryWrites=true&w=majority";
                
                const client = new MongoClient(uri, {useUnifiedTopology:true
                  });
    
                //Use a try-catch block to connect to the MongoDB Atlas cluster:
                try {
                    //Import the MongoClient class from the mongodb package:
    
    
                    // Connect to MongoDB Atlas cluster
                    await client.connect();
                    console.log('Connected to MongoDB Atlas cluster');
    
                    const Metals = client.db('MetalVault').collection('Metals');
    
    
                    const collectionData = {
    
                        
                        MetalDetails: await Metals.find().toArray()
                    };
                    
                    console.log(collectionData);
    
    
                    input = collectionData;
                    console.log('input data');
                    console.log(input);
                    // Calling callback function with passing data as a parameter
                    callback(input);
    
                } catch (err) {
                    console.error(err);
                } finally {
                    // Close the MongoDB Atlas cluster connection
                    await client.close();
                    console.log('Disconnected from MongoDB Atlas cluster');
                }
    
            }
    
            function processData(data) {
                res.setHeader("Access-Control-Allow-Origin", "*");
                    res.writeHead(200, { 'Content-type': 'application/json' })
                    res.end(JSON.stringify(data));
            }

    
        }

    
    else{

        res.writeHead(404,{'Content-Type':'text/html'});
        res.end(" <h1> 404 Nothing Found </h1>")
    }



})

server.listen(5511, ()=> console.log("Our server is running"));