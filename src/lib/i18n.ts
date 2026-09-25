export type Locale = "no" | "en";

const routePairs = [
  ["/", "/en"],
  ["/lopet", "/en/race"],
  ["/pamelding", "/en/registration"],
  ["/resultater", "/en/results"],
  ["/forberedelser", "/en/preparation"],
  ["/historie", "/en/history"],
  ["/bilder", "/en/photos"],
  ["/praktisk-info", "/en/practical-info"],
] as const;

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "no";
}

export function getLocalePath(pathname: string, target: Locale): string {
  const profile = pathname.match(/^\/profil\/(\d+)$/);
  if (profile) {
    return target === "en"
      ? `/en/profile/${profile[1]}`
      : `/profil/${profile[1]}`;
  }

  const englishProfile = pathname.match(/^\/en\/profile\/(\d+)$/);
  if (englishProfile) {
    return target === "en"
      ? `/en/profile/${englishProfile[1]}`
      : `/profil/${englishProfile[1]}`;
  }

  const resultYear = pathname.match(/^\/resultater\/(\d{4})$/);
  if (resultYear) {
    return target === "en"
      ? `/en/results/${resultYear[1]}`
      : `/resultater/${resultYear[1]}`;
  }

  const englishResultYear = pathname.match(/^\/en\/results\/(\d{4})$/);
  if (englishResultYear) {
    return target === "en"
      ? `/en/results/${englishResultYear[1]}`
      : `/resultater/${englishResultYear[1]}`;
  }

  for (const [noPath, enPath] of routePairs) {
    if (pathname === noPath || pathname === enPath) {
      return target === "en" ? enPath : noPath;
    }
  }

  return target === "en" ? "/en" : "/";
}
