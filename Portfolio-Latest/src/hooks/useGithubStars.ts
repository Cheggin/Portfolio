import { useEffect, useState } from "react";

// One unauthenticated request per repo; GitHub allows 60 per hour per IP.
export function useGithubStars(repos: string[]): Record<string, number> {
  const [stars, setStars] = useState<Record<string, number>>({});
  // Joined so the effect keys off the repo names, not the array identity.
  const key = repos.join(",");

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      const entries = await Promise.all(
        key.split(",").map(async (repo) => {
          try {
            const response = await fetch(`https://api.github.com/repos/${repo}`, {
              signal: controller.signal,
            });
            if (!response.ok) return null;

            const data: unknown = await response.json();
            if (typeof data !== "object" || data === null || !("stargazers_count" in data)) {
              return null;
            }
            const count = data.stargazers_count;
            return typeof count === "number" ? { repo, count } : null;
          } catch {
            return null;
          }
        })
      );

      if (controller.signal.aborted) return;
      setStars(Object.fromEntries(entries.flatMap((e) => (e ? [[e.repo, e.count]] : []))));
    };

    void load();
    return () => controller.abort();
  }, [key]);

  return stars;
}
