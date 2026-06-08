import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useAuth, s as supabase } from "./router-C5OKu4OK.mjs";
import { B as Button } from "./button-DY0TMOSU.mjs";
import { L as Label, I as Input } from "./label-BIUJpyM6.mjs";
import { R as Root2, L as List, T as Trigger, C as Content } from "../_libs/radix-ui__react-tabs.mjs";
import { l as logo, c as cn } from "./utils-zpgQuvnJ.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { A as ArrowLeft, M as Mail, m as EyeOff, E as Eye } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/tailwind-merge.mjs";
const Tabs = Root2;
const TabsList = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  List,
  {
    ref,
    className: cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      className
    ),
    ...props
  }
));
TabsList.displayName = List.displayName;
const TabsTrigger = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Trigger,
  {
    ref,
    className: cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      className
    ),
    ...props
  }
));
TabsTrigger.displayName = Trigger.displayName;
const TabsContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content,
  {
    ref,
    className: cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    ),
    ...props
  }
));
TabsContent.displayName = Content.displayName;
function AuthPage() {
  const navigate = useNavigate();
  const {
    user,
    loading
  } = useAuth();
  const [view, setView] = reactExports.useState("signin");
  reactExports.useEffect(() => {
    if (!loading && user) {
      if (window.location.hash.includes("type=recovery") || window.location.search.includes("type=recovery")) {
        navigate({
          to: "/profile"
        });
        toast.info("Te-ai conectat prin link-ul de recuperare a parolei. Te rugăm să îți setezi o nouă parolă mai jos.");
      } else {
        navigate({
          to: "/"
        });
      }
    }
  }, [user, loading, navigate]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex flex-col items-center gap-3 mb-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "FLOW", className: "h-14 w-14 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm tracking-[0.4em] text-silver-gradient font-medium", children: "FLOW" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.5em] text-muted-foreground mt-1", children: "ROMANIA" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass rounded-2xl p-8", children: view === "recovery" ? /* @__PURE__ */ jsxRuntimeExports.jsx(RecoveryForm, { onBack: () => setView("signin") }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { value: view, onValueChange: (val) => setView(val), className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { className: "grid grid-cols-2 w-full mb-6 bg-white/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signin", children: "Conectare" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTrigger, { value: "signup", children: "Creare Cont" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signin", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignInForm, { onForgotPassword: () => setView("recovery") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TabsContent, { value: "signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SignUpForm, {}) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-6 tracking-wider", children: "Prin continuarea navigării, ești de acord cu regulamentul comunității FLOW ROMANIA." })
    ] })
  ] });
}
function SignInForm({
  onForgotPassword
}) {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {
      error
    } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    setLoading(false);
    if (error) toast.error(error.message);
    else toast.success("Bine ai revenit pe FLOW.");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "si-email", children: "Adresă de Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "si-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "si-pw", children: "Parolă" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onForgotPassword, className: "text-[10px] text-muted-foreground hover:text-foreground transition tracking-widest uppercase font-semibold", children: "Ai uitat parola?" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "si-pw", type: showPassword ? "text" : "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "pr-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center", title: showPassword ? "Ascunde parola" : "Afișează parola", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-white text-black hover:bg-white/90 tracking-widest mt-2", children: loading ? "SE CONECTEAZĂ…" : "CONECTEAZĂ-TE" })
  ] });
}
function SignUpForm() {
  const [username, setUsername] = reactExports.useState("");
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3) return toast.error("Numele de utilizator trebuie să aibă cel puțin 3 caractere.");
    if (password.length < 8) return toast.error("Parola trebuie să aibă cel puțin 8 caractere.");
    setLoading(true);
    const redirectUrl = `${window.location.origin}/`;
    const {
      error
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          username,
          display_name: username
        }
      }
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Contul a fost creat. Verifică-ți căsuța poștală pentru a valida adresa de email.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-user", children: "Nume Utilizator" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-user", required: true, minLength: 3, maxLength: 32, value: username, onChange: (e) => setUsername(e.target.value), placeholder: "numele tău din joc" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-email", children: "Adresă de Email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "su-pw", children: "Parolă" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "su-pw", type: showPassword ? "text" : "password", required: true, minLength: 8, value: password, onChange: (e) => setPassword(e.target.value), className: "pr-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center", title: showPassword ? "Ascunde parola" : "Afișează parola", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-white text-black hover:bg-white/90 tracking-widest mt-2", children: loading ? "SE CREEAZĂ…" : "ALĂTURĂ-TE FLOW" })
  ] });
}
function RecoveryForm({
  onBack
}) {
  const [email, setEmail] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const redirectUrl = `${window.location.origin}/auth`;
    const {
      error
    } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrl
    });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Emailul de recuperare a parolei a fost trimis. Verifică-ți căsuța poștală!");
      onBack();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: onBack, className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition tracking-wider uppercase font-semibold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-3.5 w-3.5" }),
        "Înapoi la Conectare"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-light tracking-wide text-silver-gradient pt-2", children: "RECUPERARE PAROLĂ" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: "Introdu adresa de email înregistrată. Îți vom trimite un link securizat pentru a-ți reseta parola contului." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "rc-email", children: "Adresă de Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "rc-email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "name@example.com", className: "pl-10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/60" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, className: "w-full bg-white text-black hover:bg-white/90 tracking-widest mt-2", children: loading ? "SE TRIMITE EMAILUL…" : "RECUPEREAZĂ PAROLA" })
    ] })
  ] });
}
export {
  AuthPage as component
};
