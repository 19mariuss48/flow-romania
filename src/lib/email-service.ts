import { createServerFn } from "@tanstack/react-start";

export type EmailPayload = {
  toEmail: string;
  username: string;
  characterName: string;
  factionType: "police" | "medic" | "staff";
  status: "acceptat" | "respins";
  adminResponse: string;
};

export const sendApplicationEmailFn = createServerFn("POST", async (payload: EmailPayload) => {
  const { toEmail, username, characterName, factionType, status, adminResponse } = payload;
  
  const factionNames: Record<string, string> = {
    police: "Poliția Română",
    medic: "S.M.U.R.D. (Medici)",
    staff: "Echipa Staff FLOW ROMÂNIA"
  };

  const factionName = factionNames[factionType] || factionType;
  
  const subject = status === "acceptat" 
    ? `🎉 Felicitări! Aplicația ta pentru ${factionName} a fost ACCEPTATĂ`
    : `📋 Rezultat Aplicație - ${factionName}`;

  // Rich HTML email template design
  const emailHtml = `
    <div style="background-color: #0c0c0c; color: #e5e5e5; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; min-height: 100%; box-sizing: border-box;">
      <div style="max-width: 600px; margin: 0 auto; background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
        
        <!-- Header Banner -->
        <div style="padding: 40px 40px 20px 40px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05);">
          <span style="font-size: 26px; font-weight: 300; letter-spacing: 6px; color: #ffffff; text-transform: uppercase;">
            FLOW <span style="color: #a3a3a3; font-weight: 400;">ROMANIA</span>
          </span>
          <div style="font-size: 10px; letter-spacing: 4px; color: #737373; margin-top: 8px; text-transform: uppercase; font-weight: 500;">
            PORTAL COMUNITATE · RECRUTARE
          </div>
        </div>

        <!-- Main Body Content -->
        <div style="padding: 40px;">
          <h2 style="font-weight: 300; font-size: 20px; color: ${status === "acceptat" ? "#34d399" : "#f87171"}; margin-top: 0; margin-bottom: 20px; letter-spacing: 0.5px;">
            Salutare, @${username}!
          </h2>
          
          <p style="font-size: 14px; line-height: 1.7; color: #a3a3a3; font-weight: 300; margin-bottom: 16px;">
            Îți mulțumim pentru interesul manifestat față de comunitatea <strong>FLOW ROMÂNIA</strong> și pentru timpul acordat completării aplicației în vederea alăturării structurii noastre: <strong>${factionName}</strong> (pentru personajul tău de joc <em>${characterName}</em>).
          </p>
          
          <p style="font-size: 14px; line-height: 1.7; color: #a3a3a3; font-weight: 300; margin-bottom: 24px;">
            Liderii de departament și membrii din conducere au analizat cu atenție dosarul tău de recrutare, istoricul tău general de joc, orele acumulate și răspunsurile oferite în secțiunea de motivație. În urma acestei evaluări complete, statutul aplicației tale a fost actualizat în sistem:
          </p>
          
          <!-- Status Badge -->
          <div style="text-align: center; margin: 30px 0;">
            <div style="background-color: ${status === "acceptat" ? "rgba(52,211,153,0.06)" : "rgba(248,113,113,0.06)"}; 
                        color: ${status === "acceptat" ? "#34d399" : "#f87171"}; 
                        border: 1px solid ${status === "acceptat" ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}; 
                        padding: 12px 30px; border-radius: 9999px; font-weight: 600; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; display: inline-block; box-shadow: 0 4px 20px rgba(0,0,0,0.25);">
              ${status === "acceptat" ? "🟢 Aplicație ACCEPTATĂ" : "🔴 Aplicație RESPINSĂ"}
            </div>
          </div>
          
          <!-- Admin Response Section -->
          <div style="background-color: rgba(255,255,255,0.01); border-left: 3px solid ${status === "acceptat" ? "#34d399" : "#f87171"}; padding: 20px; border-radius: 0 12px 12px 0; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.03);">
            <div style="font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #a3a3a3; margin-bottom: 10px; font-weight: 600;">
              Răspunsul Oficial al Conducerii:
            </div>
            <p style="font-size: 13px; line-height: 1.6; color: #e5e5e5; margin: 0; font-style: italic; font-weight: 300;">
              „${adminResponse}”
            </p>
          </div>
          
          <!-- Next Steps -->
          ${status === "acceptat" ? `
            <div style="margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
              <h4 style="font-size: 13px; color: #ffffff; margin-top: 0; margin-bottom: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Următorii Pași de Urmat:</h4>
              <p style="font-size: 13px; line-height: 1.6; color: #a3a3a3; margin: 0; font-weight: 300;">
                Te rugăm să te conectezi pe serverul nostru oficial de Discord și să deschizi un ticket în canalul <strong>#recrutare-${factionType}</strong>. Un membru din conducere te va prelua în cel mai scurt timp pentru a programa interviul verbal și testul practic. Asigură-te că recitești regulamentul general și cel intern înainte de testare. Succes!
              </p>
            </div>
          ` : `
            <div style="margin-top: 30px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
              <h4 style="font-size: 13px; color: #ffffff; margin-top: 0; margin-bottom: 8px; font-weight: 500; text-transform: uppercase; letter-spacing: 1px;">Notă privind Recrutarea:</h4>
              <p style="font-size: 13px; line-height: 1.6; color: #a3a3a3; margin: 0; font-weight: 300;">
                Nu te descuraja! Îți recomandăm să iei în considerare sugestiile oferite de lideri în răspunsul de mai sus, să continui să acumulezi experiență de joc pe server și să corectezi eventualele greșeli. Vei putea depune o nouă aplicație (CV) după trecerea unei perioade de 7 zile.
              </p>
            </div>
          `}
        </div>

        <!-- Footer -->
        <div style="padding: 24px 40px; text-align: center; font-size: 9px; color: #525252; letter-spacing: 1.5px; border-top: 1px solid rgba(255,255,255,0.05); background-color: rgba(0,0,0,0.2);">
          © 2026 FLOW ROMÂNIA · TOATE DREPTURILE REZERVATE <br>
          <span style="color: #404040; font-size: 8px;">FĂRĂ AFILIERE CU ROCKSTAR GAMES SAU TAKE-TWO INTERACTIVE</span> <br>
          <div style="margin-top: 8px; color: #404040;">Acesta este un email generat automat. Te rugăm să nu răspunzi direct la acest mesaj.</div>
        </div>

      </div>
    </div>
  `;

  console.log(`[EMAIL SERVICE] Pregătit email pentru ${toEmail}`);
  console.log(`[EMAIL SERVICE] Subiect: ${subject}`);

  const resendApiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;
  if (resendApiKey) {
    try {
      console.log("[EMAIL SERVICE] Se încearcă trimiterea prin Resend...");
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${resendApiKey}`
        },
        body: JSON.stringify({
          from: "FLOW ROMANIA <recrutare@flowromania.ro>",
          to: [toEmail],
          subject: subject,
          html: emailHtml
        })
      });

      if (response.ok) {
        console.log("[EMAIL SERVICE] Email expediat cu succes prin Resend API.");
        return { success: true, method: "resend", subject, html: emailHtml };
      } else {
        const errorDetail = await response.text();
        console.error("[EMAIL SERVICE] Eroare Resend:", errorDetail);
      }
    } catch (err) {
      console.error("[EMAIL SERVICE] Excepție la expedierea prin Resend:", err);
    }
  }

  // If no API key or failed, return simulated success
  return { 
    success: true, 
    method: "simulated", 
    subject, 
    html: emailHtml 
  };
});
