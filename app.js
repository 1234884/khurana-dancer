const express=require("express");
const path = require("path");
const app=express();
const port = 80;
const mongoose = require("mongoose");
const bodyparser=require("body-parser");

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

var contactSchema = new mongoose.Schema({
    name: String ,
    phone:String ,
    email:String ,
    address:String ,
    desc:String
  });

  var Contact = mongoose.model('Contact', contactSchema);


app.use('/static',express.static('static'));
app.use(express.urlencoded());
app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));

app.get('/', (req, res)=>{
    
    const params = {};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
    
    const params = {};
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var mydata= new Contact(req.body);
    mydata.save().then(()=>{res.send("this item has been saved")}).catch(()=>{res.status(400).send("item was not saved")});

})

app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
