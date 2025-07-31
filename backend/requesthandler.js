import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import  userSchema from './model/user.model.js'
const {sign} = pkg

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"",
        pass:"",
    }
})
export async function signUp(req,res) {
    try{
        const{email,password,cpassword,username,phone,profile} = req.body;
        if(!(email&&password&&cpassword&&username&&phone&&profile))
            return res.this.status(404).send({msg:'field are empty'})
        bcrypt.hash(password,10).then((hashedPassword)=>{
            userSchema.create({email,password:hashedPassword,username,phone,profile}).then(()=>{
                return res.status(201).send({msg:'succsessful'})
            }).catch((error)=>{
                return res.status(404).send({msg:'not registered'})

            })
        }).catch((error)=>{
            return res.status(404).send({msg:'error'})
        })
    }catch(error){
        return res.status(404).send({msg:'error'})
    }
}

export async function signIn(req,res) {
    try{
        const {email,password}=req.body
        if(!(email&&password))
            return res.status(404).send({msg:"feilds sre empty"})

        const user=await userSchema.findOne({email})

        if(user===null)
            return res.status(404).send({msg:'invalid email'})

        const success=await bcrypt.compare(password,user.password)
        if(success!==true)
            return res.status(404).send({msg:'email or password is invalid'})

        const token = await sign({userId:user._id},process.env.JWT_KEY,{expiresIn:'24h'})
        return res.status(200).send({msg:"successfull logined",token})
    
    
    }catch{
        return res.status(404).send({msg:"error"})
    }
}

export async function profile (req,res) {
    try{
        const _id = req.user.userId

        const user = await userSchema.findOne({_id},{password:0});
        if(!user)
            return res.status(403).send({msg:'Login to continue'})
        return res.status(200).send(user);

    } catch (error){
        return res.status(404).send({msg:'error'})
    }
}