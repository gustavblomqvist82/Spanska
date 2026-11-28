const {user}=require("./_lib/supabase");
const {send,fail}=require("./_lib/http");
const bank=require("../sentence-data");
const LEVELS=new Set(Object.keys(bank));
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const byId=new Map(Object.entries(bank).flatMap(([level,set])=>set.sentences.map(s=>[s.id,{...s,level}])));
const problem=(message,status=400)=>Object.assign(new Error(message),{status});
const denied=message=>{throw problem(message,403);};
async function selectedPlayer(ctx,id){
 if(ctx.profile.role==="child"){if(id&&id!==ctx.user.id)denied("Du kan bara se din egen övningshistorik.");return{id:ctx.user.id,nickname:ctx.profile.nickname,role:"child"};}
 if(ctx.profile.role!=="parent")denied("Kontotypen har inte åtkomst till övningshistorik.");
 if(!id||id===ctx.user.id)return{id:ctx.user.id,nickname:ctx.profile.nickname,role:"parent"};
 const {data,error}=await ctx.client.from("profiles").select("id,nickname,role").eq("id",id).eq("parent_id",ctx.user.id).eq("role","child").maybeSingle();
 if(error)throw error;if(!data)denied("Du kan bara se ditt eget konto och barnkonton i din familj.");return data;
}
async function playersFor(ctx){
 if(ctx.profile.role==="child")return[{id:ctx.user.id,nickname:ctx.profile.nickname,role:"child"}];
 if(ctx.profile.role!=="parent")denied("Kontotypen har inte åtkomst till övningshistorik.");
 const {data,error}=await ctx.client.from("profiles").select("id,nickname,role").eq("parent_id",ctx.user.id).eq("role","child").order("created_at",{ascending:true});
 if(error)throw error;return[{id:ctx.user.id,nickname:ctx.profile.nickname,role:"parent"},...(data||[])];
}
async function summary(ctx,userId){
 const [sr,ar]=await Promise.all([
  ctx.client.from("sentence_practice_sessions").select("id,level,completed_at").eq("user_id",userId).order("started_at",{ascending:false}).limit(10000),
  ctx.client.from("sentence_practice_attempts").select("session_id,level,sentence_id,is_correct").eq("user_id",userId).limit(20000)
 ]);
 if(sr.error)throw sr.error;if(ar.error)throw ar.error;
 const sessions=sr.data||[],attempts=ar.data||[],levels=Object.fromEntries([...LEVELS].map(l=>[l,{sessionsStarted:0,sessionsCompleted:0,questionsPracticed:0,correctAttempts:0,incorrectAttempts:0,hardestSentences:[],strongSentences:[]}]));
 const totals=new Map(),questions=new Set();
 for(const s of sessions){if(levels[s.level]){levels[s.level].sessionsStarted++;if(s.completed_at)levels[s.level].sessionsCompleted++;}}
 for(const a of attempts){const item=byId.get(a.sentence_id),stats=levels[a.level];if(!item||!stats||item.level!==a.level)continue;questions.add(a.level+":"+a.session_id+":"+a.sentence_id);const key=a.level+":"+a.sentence_id,entry=totals.get(key)||{...item,correctCount:0,incorrectCount:0};if(a.is_correct){stats.correctAttempts++;entry.correctCount++;}else{stats.incorrectAttempts++;entry.incorrectCount++;}totals.set(key,entry);}
 for(const key of questions){const l=key.split(":")[0];if(levels[l])levels[l].questionsPracticed++;}
 const byLevel=Object.fromEntries([...LEVELS].map(l=>{const st=levels[l],rows=[...totals.values()].filter(x=>x.level===l);st.hardestSentences=rows.filter(x=>x.incorrectCount).sort((a,b)=>b.incorrectCount-a.incorrectCount||a.correctCount-b.correctCount).slice(0,5).map(({id,es,sv,correctCount,incorrectCount})=>({id,es,sv,correctCount,incorrectCount}));st.strongSentences=rows.filter(x=>x.correctCount).sort((a,b)=>b.correctCount-a.correctCount||a.incorrectCount-b.incorrectCount).slice(0,5).map(({id,es,sv,correctCount,incorrectCount})=>({id,es,sv,correctCount,incorrectCount}));return[l,st];}));
 return{sessionsStarted:sessions.length,sessionsCompleted:sessions.filter(s=>!!s.completed_at).length,questionsPracticed:questions.size,correctAttempts:attempts.filter(a=>a.is_correct).length,incorrectAttempts:attempts.filter(a=>!a.is_correct).length,byLevel};
}
module.exports=async(req,res)=>{try{
 const ctx=await user(req);
 if(req.method==="GET"){const players=await playersFor(ctx),id=typeof req.query?.player==="string"?req.query.player:null,player=await selectedPlayer(ctx,id);return send(res,200,{players,selectedPlayerId:player.id,selectedPlayer:player,progress:await summary(ctx,player.id)});}
 if(req.method!=="POST"){res.setHeader("Allow","GET, POST");return send(res,405,{error:"Metoden stöds inte."});}
 if(!["parent","child"].includes(ctx.profile.role))denied("Kontotypen har inte åtkomst till övningshistorik.");
 const b=req.body||{};
 if(b.action==="start"){
  if(typeof b.sessionId!=="string"||!UUID.test(b.sessionId)||!LEVELS.has(b.level)||!Array.isArray(b.sentenceIds)||b.sentenceIds.length!==15||new Set(b.sentenceIds).size!==15||b.sentenceIds.some(id=>byId.get(id)?.level!==b.level))throw problem("Rundan innehåller ogiltiga uppgifter.");
  const {error}=await ctx.client.from("sentence_practice_sessions").insert({id:b.sessionId,user_id:ctx.user.id,level:b.level,sentence_ids:b.sentenceIds});if(error)throw error;return send(res,201,{ok:true});
 }
 if(b.action==="answer"){
  if(typeof b.attemptId!=="string"||!UUID.test(b.attemptId)||typeof b.sessionId!=="string"||!UUID.test(b.sessionId)||!LEVELS.has(b.level)||typeof b.correct!=="boolean"||byId.get(b.sentenceId)?.level!==b.level)throw problem("Svaret innehåller ogiltiga uppgifter.");
  const {data:session,error:se}=await ctx.client.from("sentence_practice_sessions").select("level,sentence_ids,completed_at").eq("id",b.sessionId).eq("user_id",ctx.user.id).maybeSingle();if(se)throw se;if(!session)denied("Övningsrundan hittades inte för ditt konto.");if(session.completed_at)throw problem("Rundan är redan avslutad.",409);if(session.level!==b.level||!session.sentence_ids.includes(b.sentenceId))throw problem("Meningen hör inte till den här rundan.");
  const row={id:b.attemptId,session_id:b.sessionId,user_id:ctx.user.id,level:b.level,sentence_id:b.sentenceId,is_correct:b.correct};const {error}=await ctx.client.from("sentence_practice_attempts").insert(row);
  if(error?.code==="23505"){const {data:old,error:e}=await ctx.client.from("sentence_practice_attempts").select("session_id,level,sentence_id,is_correct").eq("id",b.attemptId).eq("user_id",ctx.user.id).maybeSingle();if(e)throw e;if(old&&old.session_id===b.sessionId&&old.level===b.level&&old.sentence_id===b.sentenceId&&old.is_correct===b.correct)return send(res,200,{ok:true,duplicate:true});}
  if(error)throw error;return send(res,201,{ok:true});
 }
 if(b.action==="complete"){
  if(typeof b.sessionId!=="string"||!UUID.test(b.sessionId))throw problem("Rundans ID är ogiltigt.");
  const {data:session,error:se}=await ctx.client.from("sentence_practice_sessions").select("level,completed_at,score").eq("id",b.sessionId).eq("user_id",ctx.user.id).maybeSingle();if(se)throw se;if(!session)denied("Övningsrundan hittades inte för ditt konto.");if(session.completed_at)return send(res,200,{ok:true,score:session.score,total:15,alreadyCompleted:true});
  const {data:answers,error:ae}=await ctx.client.from("sentence_practice_attempts").select("sentence_id,is_correct").eq("session_id",b.sessionId).eq("user_id",ctx.user.id).eq("level",session.level);if(ae)throw ae;const rows=answers||[],answered=new Set(rows.map(a=>a.sentence_id));if(answered.size!==15)throw problem("Alla 15 olika meningar behöver besvaras innan rundan avslutas.",409);const correct=new Set(rows.filter(a=>a.is_correct).map(a=>a.sentence_id));
  const {error}=await ctx.client.from("sentence_practice_sessions").update({score:correct.size,total:15,completed_at:new Date().toISOString()}).eq("id",b.sessionId).eq("user_id",ctx.user.id).is("completed_at",null);if(error)throw error;return send(res,200,{ok:true,score:correct.size,total:15});
 }
 throw problem("Åtgärden stöds inte.");
}catch(e){return fail(res,e);}};
