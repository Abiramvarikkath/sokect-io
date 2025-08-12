import bcrypt from 'bcrypt'
import pkg from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import  userSchema from './model/user.model.js'
import Message from './model/Message.js'
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
        return res.status(200).send({user});

    } catch (error){
        return res.status(404).send({msg:'error'})
    }
}

export async function Listuser(req,res) {
    try{
        const _id = req.user.userId

        const user = await userSchema.findOne({_id},{password:0});
        if(!user)
            return res.status(403).send({msg:'Login to continue'})
         const people = await userSchema.find({_id:{$ne: _id}})
        return res.status(200).send({people});
    }catch (error){
        return res.status(404).send({msg:'error'})
    }
}

export async function Nav(req,res) {
    try{
        const _id = req.user.userId

        
const user = await userSchema.findOne({_id},);
        if(!user)
            return res.status(403).send({msg:'Login to continue'})
        return res.status(200).send({user});

    } catch (error){
        return res.status(404).send({msg:'error'})
    }

}
export const sendMessage = async (req,res) => {
    const senderId = req.user.userId;
    const {  receiverId, content } = req.body;
    const message = new Message({
        senderId,
        receiverId,
        content
    });

    await message.save();
    res.status(201).json(message)
}
export const getMessages = async (req,res) => {
    const currentUserId = req.user.userId;
    const { otherUserId } = req.params;
    console.log(otherUserId);

    const message = await Message.find({
        $or: [
            { senderId: currentUserId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: currentUserId }
        ]
    }).sort({ timestamp: 1 });

    res.json(message);
    
};

export const  getChatList = async (req, res) => {
    try {
        const currentUserId = req.user.userId;
        console.log('Current User ID:' , currentUserId);

        const messages = await Message.find({
            $or: [{ senderId: currentUserId }, { receiverId: currentUserId }],
        });

        const participantIds = new Set();
        messages.forEach((msg) =>{
            if (msg.senderId.toString() !== currentUserId) participantIds.add(msg.senderId.toString());
            if (msg.receiverId.toString() !== currentUserId) participantIds.add(msg.receiverId.toString());

        });

        const ids = Array.from(participantIds);

        const users = await userSchema.find({ _id: { $in: ids } }).select('-password');

        res.json({ chatList: users });
    } catch (error) {
        console.error('Error in getchatList:', error);
        res.status(500).json({ msg: 'Server error'});
        
    }
;}
