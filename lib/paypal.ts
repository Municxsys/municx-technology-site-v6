const ENV=(process.env.PAYPAL_ENV||'sandbox').toLowerCase();
const BASE=ENV==='live'?'https://api-m.paypal.com':'https://api-m.sandbox.paypal.com';
const CLIENT=process.env.PAYPAL_CLIENT_ID as string; const SECRET=process.env.PAYPAL_SECRET as string;

async function token(){
  const a=Buffer.from(`${CLIENT}:${SECRET}`).toString('base64');
  const r=await fetch(`${BASE}/v1/oauth2/token`,{method:'POST',headers:{Authorization:`Basic ${a}`,'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials'});
  if(!r.ok) throw new Error(`token ${r.status}`);
  return (await r.json()).access_token as string;
}

export async function createOrder(t:'LITE'|'PRO'|'ENT',ret:string,cancel:string){
  const access=await token();
  const value=t==='LITE'?'29.00':t==='PRO'?'199.00':'0.00';
  const res=await fetch(`${BASE}/v2/checkout/orders`,{
    method:'POST',
    headers:{'Content-Type':'application/json',Authorization:`Bearer ${access}`},
    body:JSON.stringify({
      intent:'CAPTURE',
      purchase_units:[{amount:{currency_code:'EUR',value,breakdown:{item_total:{currency_code:'EUR',value}}},custom_id:t,items:[{name:`Municx Suite ${t}`,unit_amount:{currency_code:'EUR',value},quantity:'1'}]}],
      application_context:{return_url:ret,cancel_url:cancel,brand_name:'Municx Technology',shipping_preference:'NO_SHIPPING',user_action:'PAY_NOW'}
    })
  });
  if(!res.ok) throw new Error(`create ${res.status}`);
  return await res.json();
}

export async function captureOrder(id:string){
  const access=await token();
  const r=await fetch(`${BASE}/v2/checkout/orders/${id}/capture`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${access}`}});
  if(!r.ok) throw new Error(`capture ${r.status}`);
  return await r.json();
}
