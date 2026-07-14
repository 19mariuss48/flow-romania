import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Pagina nu a fost găsită</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Mergi acasă
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          Pagina nu s-a putut încărca
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ceva nu a funcționat corect din partea noastră. Poți încerca să reîncarci pagina sau să te întorci la pagina principală.
        </p>
        <div className="mt-4 p-4 bg-black/50 border border-red-500 rounded text-left overflow-auto text-xs text-red-400">
          <strong>{error?.name}: {error?.message}</strong>
          <pre className="mt-2 text-[10px] whitespace-pre-wrap">{error?.stack}</pre>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Încearcă din nou
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Mergi acasă
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "FLOW ROMÂNIA — Portal Comunitate" },
      { name: "description", content: "Un portal web premium pentru comunitatea FiveM FLOW ROMÂNIA. Sincronizează-ți profilul de joc, aplică în facțiuni și susține serverul." },
      { name: "author", content: "FLOW ROMÂNIA" },
      { property: "og:title", content: "FLOW ROMÂNIA — Portal Comunitate" },
      { property: "og:description", content: "Un portal web premium pentru comunitatea FiveM FLOW ROMÂNIA. Sincronizează-ți profilul de joc, aplică în facțiuni și susține serverul." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@FLOWROMANIA" },
      { name: "twitter:title", content: "FLOW ROMÂNIA — Portal Comunitate" },
      { name: "twitter:description", content: "Un portal web premium pentru comunitatea FiveM FLOW ROMÂNIA. Sincronizează-ți profilul de joc, aplică în facțiuni și susține serverul." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f8fd0a4e-3762-4208-a16f-61f8b52aef5f/id-preview-775f219d--bf4d6680-c61c-44e0-b874-c22a76089c54.lovable.app-1780129241503.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f8fd0a4e-3762-4208-a16f-61f8b52aef5f/id-preview-775f219d--bf4d6680-c61c-44e0-b874-c22a76089c54.lovable.app-1780129241503.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="ro">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
          e.preventDefault();
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Outlet />
        <Toaster theme="dark" position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
