(() => {
  const config = window.SUPABASE_CONFIG || {};
  const ready = Boolean(window.supabase && config.url?.startsWith("https://") && config.publishableKey && config.publishableKey !== "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE");
  const client = ready ? window.supabase.createClient(config.url, config.publishableKey, { auth: { storage: window.sessionStorage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: false } }) : null;
  async function session(){ if(!client) throw new Error("Supabase är inte konfigurerat ännu."); const {data,error}=await client.auth.getSession(); if(error) throw error; return data.session; }
  async function publicApi(path,body){ const r=await fetch(path,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)}); const d=await r.json().catch(()=>({})); if(!r.ok) throw new Error(d.error||"Begäran misslyckades."); return d; }
  async function api(path,body,method){ const s=await session(); if(!s) throw new Error("Du behöver logga in först."); const r=await fetch(path,{method:method||"POST",headers:{"Authorization":"Bearer "+s.access_token,"Content-Type":"application/json"},body:body===undefined?undefined:JSON.stringify(body)}); const d=await r.json().catch(()=>({})); if(!r.ok) throw new Error(d.error||"Begäran misslyckades."); return d; }
  async function requireLogin(){ document.documentElement.classList.remove("auth-check"); try { if(!ready) { location.replace("login.html?setup=1"); return; } const s=await session(); if(!s) location.replace("login.html"); } catch { location.replace("login.html"); } }
  async function logout(){ if(client) await client.auth.signOut(); location.replace("index.html"); }
  window.SpanskaAuth={client,ready,session,api,publicApi,requireLogin,logout};
})();
