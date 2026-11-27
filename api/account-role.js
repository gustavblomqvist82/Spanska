const {user}=require("./_lib/supabase");
const {send,fail,method}=require("./_lib/http");

module.exports=async(req,res)=>{
  if(!method(req,res,"GET"))return;
  try{
    const ctx=await user(req);
    return send(res,200,{role:ctx.profile.role});
  }catch(error){
    return fail(res,error);
  }
};
