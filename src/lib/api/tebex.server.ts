import { createServerFn } from "@tanstack/react-start";

export const getTopDonators = createServerFn({ method: "GET" }).handler(async () => {
  const secretKey = process.env.TEBEX_SECRET_KEY;

  const mockData = [
    { n: "alexandru.r", rank: "Donator ★", amount: 150, currency: "EUR", purchased: "VIP Diamond" },
    { n: "mirela.s", rank: "Donator", amount: 120, currency: "EUR", purchased: "Pachet 10.000 Flow Coins" },
    { n: "cristian.b", rank: "Donator", amount: 80, currency: "EUR", purchased: "VIP Gold" },
    { n: "andreea.v", rank: "Sustinător", amount: 50, currency: "EUR", purchased: "Unban (O singură dată)" },
    { n: "vlad.n", rank: "Sustinător", amount: 30, currency: "EUR", purchased: "Pachet Arme Personalizate" },
  ];

  if (!secretKey) {
    // Return mock data if Tebex is not configured yet
    return mockData;
  }

  try {
    const response = await fetch("https://plugin.tebex.io/payments", {
      headers: {
        "X-Tebex-Secret": secretKey,
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch from Tebex:", await response.text());
      return mockData; // Fallback la date mock daca cheia e incorecta
    }

    const data = await response.json();
    
    // Aggregate amounts by player
    const donations: Record<string, number> = {};
    const currencies: Record<string, string> = {};
    const latestPackage: Record<string, string> = {};

    for (const payment of data) {
      if (payment.status === "Complete") {
        const username = payment.player?.name || "Anonim";
        const amount = payment.amount || 0;
        const currency = payment.currency?.iso_4217 || "EUR";
        const pkg = payment.packages?.[0]?.name || "Pachet VIP";
        
        donations[username] = (donations[username] || 0) + amount;
        currencies[username] = currency; // keep the last currency used
        // Keep the package from their largest or most recent payment. We'll just keep the first one we see (usually most recent if sorted desc)
        if (!latestPackage[username]) {
          latestPackage[username] = pkg;
        }
      }
    }

    // Sort and get top 5
    const topDonators = Object.entries(donations)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([username, amount]) => ({
        n: username,
        rank: amount >= 100 ? "Donator ★" : "Donator",
        amount,
        currency: currencies[username],
        purchased: latestPackage[username],
      }));

    return topDonators.length > 0 ? topDonators : mockData;
  } catch (error) {
    console.error("Error fetching Tebex data:", error);
    return mockData;
  }
});
