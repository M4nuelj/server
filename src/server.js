const express= require('express'); 
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
});
app.get('/manu',(req, res)=>{
    res.json([{nombre:'Tanjiro', cargo:'Hunter', status:'In training'}, {nombre:'Inozuke', cargo:'Hunter', status:'In training'}])
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})