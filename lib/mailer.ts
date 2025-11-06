import nodemailer from "nodemailer";
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, FROM_EMAIL } = process.env as Record<string,string>;
export const transporter = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT||465), secure: (SMTP_SECURE||"true")==="true", auth:{user:SMTP_USER, pass:SMTP_PASS} });
export async function sendLicenseEmail(to:string, tier:'LITE'|'PRO'|'ENT', key:string, url:string){
  const from = FROM_EMAIL || "contact@municxsystems.com";
  await transporter.sendMail({
    from, to, subject:`Your Municx Suite ${tier} license`,
    text:`License: ${key}\nDownload: ${url}`,
    html:`<div style="background:#0a0f1a;padding:24px;color:#eaf2ff"><div style="max-width:620px;margin:0 auto;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:16px;padding:20px"><h2>Municx Suite ${tier} — License</h2><p>License Key: <b style="color:#00e0ff">${key}</b></p><p>Download: <a href="${url}" style="color:#00e0ff">${url}</a></p></div></div>`
  });
}
