import { createServerFn } from "@tanstack/react-start";

export const getLatestDonations = createServerFn({ method: "GET" }).handler(async () => {
  const secretKey = process.env.TEBEX_SECRET_KEY;

  if (!secretKey) {
    // Return empty array if Tebex is not configured yet
    return [];
  }

  try {
    const response = await fetch("https://plugin.tebex.io/payments", {
      headers: {
        "X-Tebex-Secret": secretKey,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch from Tebex:", await response.text());
      return []; 
    }

    const data = await response.json();
    
    const latestDonations = data
      .filter((payment: any) => payment.status === "Complete")
      .map((payment: any) => ({
        n: payment.player?.name || "Anonim",
        rank: payment.amount >= 100 ? "Donator ★" : "Donator",
        amount: payment.amount || 0,
        currency: payment.currency?.iso_4217 || "EUR",
        purchased: payment.packages?.[0]?.name || "Pachet",
      }))
      .slice(0, 6);

    return latestDonations;
  } catch (error) {
    console.error("Error fetching Tebex data:", error);
    return [];
  }
});
