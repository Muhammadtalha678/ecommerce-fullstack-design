import express from 'express'

const app = express()

app.get('/', (req, res) => {
    return res.send('Hello World')    
})

app.listen(5000, () => {
    console.log('Project runnig on port 5000');
    
})