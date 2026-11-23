const {createClient}=require("@supabase/supabase-js");
const url=process.env.SUPABASE_URL, secret=process.env.SUPABASE_SECRET_KEY;
function admin(){if(!url||!secret)throw new Error("Serverns Supabase-inställningar saknas.");return createClient(url,secret,{auth:{autoRefreshToken:false,persistSession:false}});}
async function user(req){const token=(req.headers.authorization||"").replace(/^Bearer\s+/i,"");if(!token)throw Object.assign(new Error("Logga in först."),{status:401});const c=admin();const {data,error}=await c.auth.getUser(token);if(error||!data.user)throw Object.assign(new Error("Sessionen är ogiltig."),{status:401});const {data:p,error:e}=await c.from("profiles").select("*").eq("id",data.user.id).single();if(e||!p)throw Object.assign(new Error("Kontoprofil saknas."),{status:403});return {client:c,user:data.user,profile:p};}
module.exports={admin,user};
