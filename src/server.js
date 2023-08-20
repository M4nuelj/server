import express from 'express';
const app =express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port=3000;

app.listen(port, ()=>{
    console.log(`Example app listening on port http://localhost:${port}`)
});

let users=[
    {
        id:"1",
        name:'Tanjiro', 
        lastName:'Kamado', 
        age:15
    },
    {
        id:"2",
        name:'Inosuke', 
        lastName:'Hashibira',
        age:17
    },
    {   id:"3",
        name:'Nezuco',
        lastName:'Kamado', 
        age:13
    }
];


app.post("/users", (req, res)=>{
    const receivedUser= req.body;
    users.push({
        id: (Math.random()*100000).toFixed(0),
        ...receivedUser,
    });

    return res.status(201).json({message: "User created"});
    
});



app.get("/users",(req, res)=>{
    return res.status(200).json(users)

});


app.get("/users/:id",(req,res)=>{
    const id= req.params.id;
    const usersfinded=users.findIndex((u)=>u.id==id);
    
    if(usersfinded===-1){
        return res.status(400).json({
            error: "We couldn't find the user with the id " +id,
        });
    }else{
        return res.status(200).json(users[usersfinded]);
    };
});

app.put("/users/:id", (req,res)=>{
    const newUserData=req.body;
    if(newUserData.id){
        return res.status(400).json({
            err:"You can not modify the id"
        });
    }
    const id=req.params.id;
    const indexFinded=users.findIndex((u)=>u.id==id);

    if(indexFinded==-1){
        return res.status(400).json({
            err: "The user was not finded with the id "+id
        });
    }
    users[indexFinded]={
        id:users[indexFinded].id, ...newUserData,
    };
    return res.status(201).json({
        message: "The user was modified successfully"
    });

   
});

app.delete("/users/:id", (req, res)=>{
    const id= req.params.id;

    const idFinded=users.findIndex((u)=>u.id==id);

    if(idFinded==-1){
        return res.status(400).json({
            err: "The id that you are looking for was not finded"
        });
    }
    users= users.filter((u)=>u.id!==id);
    return res.status(200).json({message:"The user was deleted"})

});