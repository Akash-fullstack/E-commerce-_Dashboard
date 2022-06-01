const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
const app = express();
const Jwt = require('jsonwebtoken')
const jwtKey = "e-comm";


app.use(express.json())
app.use(cors());

app.post("/register", async (req, resq) => {
    let user = new User(req.body)
    let result = await user.save()
    result = result.toObject();
    delete result.password
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            resq.send({ result: "something went wrong." })
        }
        resq.send({ result, auth: token })
    })
})






app.post('/login', async (res, resq) => {
    if (res.body.password && res.body.email) {
        let user = await User.findOne(res.body).select("-password")
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "10h" }, (err, token) => {
                if (err) {
                    resq.send({ result: "something went wrong." })
                }
                resq.send({ user, auth: token })
            })

        } else {
            resq.send({ result: 'no user found' })

        }
    }
})
app.post('/add-product', verifyToken,async (res, resq) => {
    let product = new Product(res.body)
    let result = await product.save()
    resq.send(result)
})
app.get('/products',verifyToken, async (res, resq) => {
    let products = await Product.find();
    if (products.length > 0) {
        resq.send(products)
    } else {
        resq.send({ result: "no Products" })
    }
})

app.delete('/product/:id', verifyToken,async (rep, resq) => {
    const result = await Product.deleteOne({ _id: rep.params.id })
    resq.send({ result });
});

app.get('/product/:id',verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "no result" })
    }
})
app.put('/product/:id', verifyToken,async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        {
            $set: req.body
        }
    )
    res.send(result)
})
app.get('/search/:key', verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }

        ]
    })
    res.send(result)
});

function verifyToken(req, res, next){
    let token = req.headers['authorization'];
    if(token){
       token= token.split(' ')[1];
    console.log("MIddleware called if",token);
    Jwt.verify(token,jwtKey,(err,valid)=>{
        if(err){
         res.status(401).send({result:"please provide valid  token"})
        }else{
            next();
        }
          
    })

    }else{
         res.status(403).send({result:"add token"})
    }


    // console.log("MIddleware called ",token);
    
}

app.listen(5000);









