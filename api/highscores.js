const {user}=require("./_lib/supabase");
const {send,fail,method}=require("./_lib/http");

const GAMES=new Set(["quiz","worm","sentence","spelling"]);
function validResult(game,score,total){
  if(!GAMES.has(game)||!Number.isInteger(score)||score<0||score>10000)return false;
  if(game==="worm")return total===null;
  if(!Number.isInteger(total)||score>total)return false;
  if(game==="sentence"||game==="spelling")return total===15;
  return false;
}
module.exports=async(req,res)=>{
  try{
    const ctx=await user(req);
    if(req.method==="GET"){
      if(!method(req,res,"GET"))return;
      const game=String(req.query?.game||"");
      if(!GAMES.has(game))throw Error("Ogiltigt spel.");
      const rootId=ctx.profile.role==="child"?ctx.profile.parent_id:ctx.user.id;
      const {data:family,error:fe}=await ctx.client.from("profiles").select("id,nickname").or(`id.eq.${rootId},parent_id.eq.${rootId}`);
      if(fe)throw fe;
      const profiles=family||[];
      const ids=profiles.map(p=>p.id);
      if(!ids.includes(ctx.user.id))ids.push(ctx.user.id);
      const nicknames=new Map(profiles.map(p=>[p.id,p.nickname]));
      const scoresTable=game==="quiz"?"quiz_results":"game_highscores";
      let query=ctx.client.from(scoresTable).select("user_id,score,total,created_at").in("user_id",ids);
      if(game!=="quiz")query=query.eq("game",game);
      const {data,error}=await query.order("score",{ascending:false}).order("total",{ascending:false,nullsFirst:false}).order("created_at",{ascending:true}).limit(200);
      if(error)throw error;
      const best=new Map();
      for(const row of data||[]){
        const existing=best.get(row.user_id);
        if(!existing||row.score>existing.score||(row.score===existing.score&&(row.total||0)>(existing.total||0)))best.set(row.user_id,row);
      }
      const scores=[...best.values()].sort((a,b)=>b.score-a.score||(b.total||0)-(a.total||0)||new Date(a.created_at)-new Date(b.created_at)).slice(0,5).map(row=>({nickname:nicknames.get(row.user_id)||"Spelare",score:row.score,total:row.total}));
      return send(res,200,{scores});
    }
    if(!method(req,res,"POST"))return;
    if(ctx.profile.role!=="child")throw Object.assign(new Error("Endast barnkonton kan spara spelresultat."),{status:403});
    const {game,score,total=null}=req.body||{};
    if(game==="quiz")throw Object.assign(new Error("Quizresultat verifieras och sparas av quizservern."),{status:403});
    if(!validResult(game,score,total))throw Error("Resultatet är ogiltigt.");
    const {error}=await ctx.client.from("game_highscores").insert({user_id:ctx.user.id,game,score,total});
    if(error)throw error;
    return send(res,201,{ok:true});
  }catch(e){return fail(res,e);}
};
