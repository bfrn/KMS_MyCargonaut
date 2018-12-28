import app from './src/app'

const PORT = 8080

app.listen(PORT, (err)=>{
   if(err) return console.log("Error Server Start")
   return console.log('Express Server Listing on http://Localhost:'+PORT)
})