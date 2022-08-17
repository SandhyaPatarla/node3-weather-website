const path=require('path')
const express= require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')



const app=express()
const port=process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath=path.join(__dirname,'../public')
//console.log(__dirname)

//setting up static directory to serve
app.use(express.static(publicDirectoryPath))


const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialsPath)

//setup handle bars engine and views location
app.set('views',viewsPath)
//handle bars enable us dynamic in web pages
app.set('view engine','hbs')


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sandhya'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Page',
        name:'Sandhya'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help Page',
        content:'Hey hi any help needed',
        name:'Sandhya'
    })
})


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            message:'You must enter a address'
        })
    }
    else{
        geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
            if(error){
                return res.send({
                    message:error
                })
            }
            forecast(Latitude,Longitude,(error,forecastdata)=>{
              if(error){
                return res.send({
                    message:error
                })
              }
              res.send({
                Forecast:forecastdata,
                Location:Location,
                
              })
            })
          })
    }
    
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'404',
        errorMessage:'Help article not found',
        name:'Sandhya'
    })
})



app.get('*',(req,res)=>{
    res.render('error',{
        title:'404',
        errorMessage:'page not found',
        name:'Sandhya'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})