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
        `<div style="font-family: 'Inter', sans-serif; padding: 40px 20px; color: #e2e8f0; background: #0f172a; text-align: center; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
          <h2 style="color: #ffffff; margin-bottom: 24px; font-size: 24px; letter-spacing: 0.05em;">Salutare ${user.name},</h2>
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 1.5; color: #94a3b8;">Am primit o cerere pentru resetarea parolei contului tău de pe FLOW ROMANIA. Dacă ai solicitat acest lucru, apasă pe butonul de mai jos:</p>
          <p style="margin: 32px 0;">
            <a href="${url}" style="display: inline-block; padding: 14px 28px; background: #ffffff; color: #0f172a; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; transition: all 0.2s;">Schimbă Parola Acum</a>
          </p>
          <p style="font-size: 14px; color: #64748b; margin-top: 32px;">Dacă nu ai cerut tu acest lucru, poți ignora în siguranță acest mesaj. Parola ta va rămâne neschimbată.</p>
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
        `<div style="font-family: 'Inter', sans-serif; padding: 40px 20px; color: #e2e8f0; background: #0f172a; text-align: center; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
          <h2 style="color: #ffffff; margin-bottom: 24px; font-size: 24px; letter-spacing: 0.05em;">Salutare ${user.name},</h2>
          <p style="margin-bottom: 24px; font-size: 16px; line-height: 1.5; color: #94a3b8;">Îți mulțumim că te-ai alăturat comunității <strong>FLOW ROMANIA</strong>. Pentru a putea accesa platforma și toate funcționalitățile ei, trebuie să îți confirmi adresa de email apăsând pe butonul de mai jos:</p>
          <p style="margin: 32px 0;">
            <a href="${url}" style="display: inline-block; padding: 14px 28px; background: #ffffff; color: #0f172a; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; transition: all 0.2s;">Verifică Adresa de Email</a>
          </p>
          <p style="font-size: 14px; color: #64748b; margin-top: 32px;">Dacă nu ai creat tu acest cont, te rugăm să ignori acest mesaj.</p>
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
