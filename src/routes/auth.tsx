import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import logo from "@/assets/flow-logo.png";
import { Eye, EyeOff, ArrowLeft, Mail } from "lucide-react";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Conectare · FLOW ROMANIA" },
      { name: "description", content: "Alătură-te comunității FLOW ROMANIA. Creează-ți un cont de jucător sau conectează-te." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [view, setView] = useState<"signin" | "signup" | "recovery">("signin");

  useEffect(() => {
    if (!loading && user) {
      if (window.location.hash.includes("type=recovery") || window.location.search.includes("type=recovery")) {
        navigate({ to: "/profile" });
        toast.info("Te-ai conectat prin link-ul de recuperare a parolei. Te rugăm să îți setezi o nouă parolă mai jos.");
      } else {
        navigate({ to: "/" });
      }
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" />
      <div className="w-full max-w-md relative">
        <Link to="/" className="flex flex-col items-center gap-3 mb-10">
          <img src={logo} alt="FLOW" className="h-14 w-14 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" />
          <div className="text-center">
            <div className="text-sm tracking-[0.4em] text-silver-gradient font-medium">FLOW</div>
            <div className="text-[10px] tracking-[0.5em] text-muted-foreground mt-1">ROMANIA</div>
          </div>
        </Link>

        <div className="glass rounded-2xl p-8">
          {view === "recovery" ? (
            <RecoveryForm onBack={() => setView("signin")} />
          ) : (
            <Tabs value={view} onValueChange={(val) => setView(val as any)} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6 bg-white/5">
                <TabsTrigger value="signin">Conectare</TabsTrigger>
                <TabsTrigger value="signup">Creare Cont</TabsTrigger>
              </TabsList>
              <TabsContent value="signin">
                <SignInForm onForgotPassword={() => setView("recovery")} />
              </TabsContent>
              <TabsContent value="signup">
                <SignUpForm />
              </TabsContent>
            </Tabs>
          )}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6 tracking-wider">
          Prin continuarea navigării, ești de acord cu regulamentul comunității FLOW ROMANIA.
        </p>
      </div>
    </div>
  );
}

function SignInForm({ onForgotPassword }: { onForgotPassword: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Bine ai revenit pe FLOW.");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="si-email">Adresă de Email</Label>
        <Input id="si-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="si-pw">Parolă</Label>
          <button 
            type="button" 
            onClick={onForgotPassword}
            className="text-[10px] text-muted-foreground hover:text-foreground transition tracking-widest uppercase font-semibold"
          >
            Ai uitat parola?
          </button>
        </div>
        <div className="relative">
          <Input 
            id="si-pw" 
            type={showPassword ? "text" : "password"} 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
            title={showPassword ? "Ascunde parola" : "Afișează parola"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-white/90 tracking-widest mt-2">
        {loading ? "SE CONECTEAZĂ…" : "CONECTEAZĂ-TE"}
      </Button>
    </form>
  );
}

function SignUpForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3) return toast.error("Numele de utilizator trebuie să aibă cel puțin 3 caractere.");
    if (password.length < 8) return toast.error("Parola trebuie să aibă cel puțin 8 caractere.");
    setLoading(true);
    const { error } = await authClient.signUp.email({
      email,
      password,
      name: username,
      callbackURL: `${window.location.origin}/`
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Cont creat! Te rugăm să îți verifici emailul pentru activare.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="su-user">Nume Utilizator</Label>
        <Input id="su-user" required minLength={3} maxLength={32} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="numele tău din joc" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="su-email">Adresă de Email</Label>
        <Input id="su-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="su-pw">Parolă</Label>
        <div className="relative">
          <Input 
            id="su-pw" 
            type={showPassword ? "text" : "password"} 
            required 
            minLength={8} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center"
            title={showPassword ? "Ascunde parola" : "Afișează parola"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-white/90 tracking-widest mt-2">
        {loading ? "SE CREEAZĂ…" : "ALĂTURĂ-TE FLOW"}
      </Button>
    </form>
  );
}

function RecoveryForm({ onBack }: { onBack: () => void }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await authClient.forgetPassword({
      email,
      redirectTo: `${window.location.origin}/auth`,
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Emailul de recuperare a parolei a fost trimis. Verifică-ți căsuța poștală!");
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition tracking-wider uppercase font-semibold"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Înapoi la Conectare
        </button>
        <h3 className="text-xl font-light tracking-wide text-silver-gradient pt-2">
          RECUPERARE PAROLĂ
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Introdu adresa de email înregistrată. Îți vom trimite un link securizat pentru a-ți reseta parola contului.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="rc-email">Adresă de Email</Label>
          <div className="relative">
            <Input 
              id="rc-email" 
              type="email" 
              required 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="name@example.com"
              className="pl-10"
            />
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" />
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading} 
          className="w-full bg-white text-black hover:bg-white/90 tracking-widest mt-2"
        >
          {loading ? "SE TRIMITE EMAILUL…" : "RECUPEREAZĂ PAROLA"}
        </Button>
      </form>
    </div>
  );
}
