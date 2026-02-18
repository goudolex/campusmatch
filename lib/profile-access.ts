import { supabase } from "@/lib/supabase";

export type ProfileAccessState = "verified_incomplete" | "active";

type CacheEntry = {
  expiresAt: number;
  state: ProfileAccessState;
};

const ACCESS_STATE_TTL_MS = 15_000;
const profileAccessCache = new Map<string, CacheEntry>();

export function clearProfileAccessStateCache(userId?: string) {
  if (userId) {
    profileAccessCache.delete(userId);
    return;
  }

  profileAccessCache.clear();
}

export async function getProfileAccessState(
  userId: string
): Promise<ProfileAccessState> {
  const now = Date.now();
  const cached = profileAccessCache.get(userId);

  if (cached && cached.expiresAt > now) {
    return cached.state;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("status")
    .eq("user_id", userId)
    .maybeSingle<{ status?: string | null }>();

  let state: ProfileAccessState = "verified_incomplete";

  if (!error) {
    const status = data?.status?.toLowerCase();
    if (status === "active") {
      state = "active";
    }
  }

  profileAccessCache.set(userId, {
    expiresAt: now + ACCESS_STATE_TTL_MS,
    state,
  });

  return state;
}
