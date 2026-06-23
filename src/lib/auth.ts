import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import { profiles } from "../db/schema";
import nodemailer from "nodemailer";

async function sendAuthEmail(to: string, subject: string, html: string) {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.log(`[AUTH EMAIL SIMULATION] To: ${to} | Subject: ${subject}`);
    console.log(`[AUTH EMAIL URL] Extracted URL: ${html.match(/href="([^"]+)"/)?.[1]}`);
    return;
  }
  
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    await transporter.sendMail({
      from: `"Flowromania.RO" <${gmailUser}>`,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error("Failed to send auth email via Gmail:", err);
  }
}


export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "https://flow-romania.vercel.app",
  trustedOrigins: [
    "http://localhost:8080", 
    "http://localhost:8081", 
    "http://localhost:5173", 
    "https://flow-community.vercel.app",
    "https://flow-romania.vercel.app",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : [])
  ],
  secret: process.env.BETTER_AUTH_SECRET || "fallback_secret_for_development",
  database: drizzleAdapter(db, {
    provider: "mysql", // or "pg" or "sqlite"
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendAuthEmail(
        user.email,
        "Recuperare Parolă - FLOW ROMANIA",
        `<div style="background-color: #0c0c0c; color: #e5e5e5; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; min-height: 100%; box-sizing: border-box;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <div style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span style="font-size: 26px; font-weight: 300; letter-spacing: 6px; color: #ffffff; text-transform: uppercase;">
                FLOW <span style="color: #a3a3a3; font-weight: 400;">ROMANIA</span>
              </span>
              <div style="font-size: 10px; letter-spacing: 4px; color: #737373; margin-top: 8px; text-transform: uppercase; font-weight: 500;">
                SISTEM RECUPERARE CONT
              </div>
            </div>
            <div style="padding: 40px;">
              <h2 style="font-weight: 300; font-size: 20px; color: #ffffff; margin-top: 0; margin-bottom: 20px; letter-spacing: 0.5px;">
                Salutare, ${user.name}!
              </h2>
              <p style="font-size: 14px; line-height: 1.7; color: #a3a3a3; font-weight: 300; margin-bottom: 16px;">
                Am primit o solicitare oficială pentru resetarea parolei contului tău asociat comunității <strong>FLOW ROMÂNIA</strong>. Înțelegem că se mai întâmplă să pierzi sau să uiți parola, așa că suntem aici să te ajutăm să îți recapeți accesul la contul tău cât mai repede și în siguranță.
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #a3a3a3; font-weight: 300; margin-bottom: 24px;">
                Pentru a alege o nouă parolă și a securiza contul, te rugăm să dai click pe butonul de mai jos. Link-ul este valabil pentru o perioadă scurtă de timp din motive de securitate.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${url}" style="display: inline-block; padding: 14px 32px; background-color: #ffffff; color: #000000; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; transition: all 0.2s;">Setează o Nouă Parolă</a>
              </div>
              <div style="background-color: rgba(255,255,255,0.01); border-left: 3px solid #f59e0b; padding: 20px; border-radius: 0 12px 12px 0; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.03);">
                <p style="font-size: 13px; line-height: 1.6; color: #e5e5e5; margin: 0; font-style: italic; font-weight: 300;">
                  Dacă nu tu ai solicitat această modificare, te rugăm să ignori complet acest mesaj. Parola ta actuală va rămâne neschimbată și contul tău este în siguranță. Recomandăm să nu divulgi niciodată datele de conectare altor persoane.
                </p>
              </div>
            </div>
            <div style="padding: 24px 40px; text-align: center; font-size: 9px; color: #525252; letter-spacing: 1.5px; border-top: 1px solid rgba(255,255,255,0.05); background-color: rgba(0,0,0,0.2);">
              © 2026 FLOW ROMÂNIA • TOATE DREPTURILE REZERVATE <br>
              <div style="margin-top: 8px; color: #404040;">Acesta este un email generat automat. Te rugăm să nu răspunzi direct la acest mesaj.</div>
            </div>
          </div>
        </div>`
      );
    }
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendAuthEmail(
        user.email,
        "Activează-ți Contul - FLOW ROMANIA",
        `<div style="background-color: #0c0c0c; color: #e5e5e5; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; min-height: 100%; box-sizing: border-box;">
          <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <div style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
              <span style="font-size: 26px; font-weight: 300; letter-spacing: 6px; color: #ffffff; text-transform: uppercase;">
                FLOW <span style="color: #a3a3a3; font-weight: 400;">ROMANIA</span>
              </span>
              <div style="font-size: 10px; letter-spacing: 4px; color: #737373; margin-top: 8px; text-transform: uppercase; font-weight: 500;">
                VERIFICARE ADRESĂ DE EMAIL
              </div>
            </div>
            <div style="padding: 40px;">
              <h2 style="font-weight: 300; font-size: 20px; color: #ffffff; margin-top: 0; margin-bottom: 20px; letter-spacing: 0.5px;">
                Bine ai venit, ${user.name}!
              </h2>
              <p style="font-size: 14px; line-height: 1.7; color: #a3a3a3; font-weight: 300; margin-bottom: 16px;">
                Îți mulțumim extrem de mult pentru că ai ales să te alături comunității noastre, <strong>FLOW ROMÂNIA</strong>. Ne bucurăm să te avem printre noi!
              </p>
              <p style="font-size: 14px; line-height: 1.7; color: #a3a3a3; font-weight: 300; margin-bottom: 24px;">
                Pentru a-ți proteja contul împotriva accesului neautorizat și a abuzurilor, precum și pentru a-ți oferi acces complet la toate facilitățile platformei și forumului, avem nevoie să confirmăm că această adresă de email îți aparține. Fără această verificare, nu te vei putea conecta.
              </p>
              <div style="text-align: center; margin: 30px 0;">
                <a href="${url}" style="display: inline-block; padding: 14px 32px; background-color: #ffffff; color: #000000; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; transition: all 0.2s;">Verifică Contul Acum</a>
              </div>
              <div style="background-color: rgba(255,255,255,0.01); border-left: 3px solid #3b82f6; padding: 20px; border-radius: 0 12px 12px 0; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.03);">
                <p style="font-size: 13px; line-height: 1.6; color: #e5e5e5; margin: 0; font-style: italic; font-weight: 300;">
                  Dacă întâmpini probleme cu butonul de mai sus, poți copia link-ul de verificare și introduce-l manual în browser. Dacă nu ai creat tu acest cont, poți ignora acest mesaj.
                </p>
              </div>
            </div>
            <div style="padding: 24px 40px; text-align: center; font-size: 9px; color: #525252; letter-spacing: 1.5px; border-top: 1px solid rgba(255,255,255,0.05); background-color: rgba(0,0,0,0.2);">
              © 2026 FLOW ROMÂNIA • TOATE DREPTURILE REZERVATE <br>
              <div style="margin-top: 8px; color: #404040;">Acesta este un email generat automat. Te rugăm să nu răspunzi direct la acest mesaj.</div>
            </div>
          </div>
        </div>`
      );
    }
  },

  session: {
    expiresIn: 60 * 60 * 24 * 2, // 2 zile
    updateAge: 60 * 60 * 12, // reînnoiește dacă e mai veche de 12 ore
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await db.insert(profiles).values({
            id: user.id,
            username: user.name,
            display_name: user.name,
          });
        }
      }
    }
  }
});
