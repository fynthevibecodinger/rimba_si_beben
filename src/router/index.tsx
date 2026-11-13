import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  params: Record<string, string>;
}

const RouterContext = createContext<RouterContextType>({
  path: "/",
  navigate: () => {},
  params: {},
});

function getCleanPath(): string {
  // Support hash router fallback (e.g. #/isu/banjir) as well as standard pathname
  if (typeof window === "undefined") return "/";
  const hash = window.location.hash;
  if (hash.startsWith("#/")) {
    return hash.slice(1).split("?")[0] || "/";
  }
  return window.location.pathname || "/";
}

function extractParams(pattern: string, actualPath: string): Record<string, string> | null {
  const patternSegments = pattern.split("/").filter(Boolean);
  const actualSegments = actualPath.split("/").filter(Boolean);

  if (patternSegments.length !== actualSegments.length) {
    return null;
  }

  const params: Record<string, string> = {};
  for (let i = 0; i < patternSegments.length; i++) {
    const pSeg = patternSegments[i];
    const aSeg = actualSegments[i];
    if (pSeg.startsWith(":")) {
      const paramName = pSeg.slice(1);
      params[paramName] = aSeg;
    } else if (pSeg !== aSeg) {
      return null;
    }
  }
  return params;
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPath, setCurrentPath] = useState<string>(getCleanPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getCleanPath());
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  const navigate = (to: string) => {
    if (to === currentPath) return;

    if (window.location.hash.startsWith("#/")) {
      window.location.hash = to;
    } else {
      window.history.pushState({}, "", to);
    }
    setCurrentPath(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Derive parameters for matching routes
  let params: Record<string, string> = {};
  const issueMatch = extractParams("/isu/:slug", currentPath);
  if (issueMatch) {
    params = issueMatch;
  }

  return (
    <RouterContext.Provider value={{ path: currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  return useContext(RouterContext);
}

export function useNavigate() {
  const { navigate } = useContext(RouterContext);
  return navigate;
}

export function useParams<T extends Record<string, string | undefined>>(): T {
  const { params } = useContext(RouterContext);
  return params as unknown as T;
}

export function useLocation() {
  const { path } = useContext(RouterContext);
  return { pathname: path };
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: ReactNode;
  className?: string;
}

export function Link({ to, children, className, onClick, ...rest }: LinkProps) {
  const { navigate } = useContext(RouterContext);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (!e.defaultPrevented && e.button === 0 && !e.metaKey && !e.ctrlKey && !e.altKey && !e.shiftKey) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <a href={to} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
