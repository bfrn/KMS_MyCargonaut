const express = require('express')
const app = express()

app.get('/', (req,res) => {
   res.send('Hey!')
})

app.listen(8080, () => console.log('Server Running on Port 8080\nOpen http://Localhost:8080'))
