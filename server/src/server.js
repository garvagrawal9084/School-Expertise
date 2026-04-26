import { app } from "./app.js";
import dotenv from "dotenv"
import connectDb from "./db/index.js";

dotenv.config("./.env")

connectDb()
.then(() => {
  app.on("error" , (error) => {
    console.log("err :- " , error) 
  })

  app.listen(process.env.PORT || 5000 , () => {
    console.log("Server is running at port " , process.env.PORT)
  })
}).catch((err) => {
  console.log("Mongo db Connection failed !! " , err)
})