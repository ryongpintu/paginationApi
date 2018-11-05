const express = require('express');
const mongoose= require('mongoose');
const {Data} = require('./Models/Data');
const bodyParser = require('body-parser');
const resHeader = require('./MIddleware/resHeader');

const app = express();

mongoose.connect('mongodb://ryong:pintu123@ds239873.mlab.com:39873/storybook')
  .then(()=>{console.log('connected to db')})
  .catch((err)=>{console.log('There is some issues ..'+err);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(resHeader);


app.get('/data',(req,res)=>{
  const pageN=req.query.pageN;
  const pageS=req.query.pageS;
  
  const data = Data.find()
    .skip((pageN-1)*pageS)
    .limit(5)
    .then((data)=>{res.send(data)})
    .catch((err)=>console.log(err))
});

app.get('/',(req,res)=>{
 
  res.send('Hello This is Pagination API  Use This Link to check https://ryongpintu.github.io/paginationDemo/');
    
  });

app.get('/all',(req,res)=>{
  Data.find()
  .count()
  .then((data)=>{
    
    
    let x=Math.ceil(data/5);
    console.log(x);
    res.send(x.toString())
  })
  .catch((err)=>console.log(err))
});

app.post('/data',(req,res)=>{

 const data =new Data({

      officeName:req.body.officeName,
      pincode:req.body.pincode,
      taluk:req.body.taluk,
      cityName:req.body.cityName,
      stateName:req.body.stateName
  })

data.save()
  .then((postdata)=>{
    res.send(postdata)
  })

});
const port=process.env.PORT || 8000;
app.listen(port,()=>{console.log('listening to port')})

