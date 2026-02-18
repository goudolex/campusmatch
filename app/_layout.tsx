import type { Session } from "@supabase/supabase-js";
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import {
  clearProfileAccessStateCache,
  getProfileAccessState,
  ProfileAccessState,
} from "@/lib/profile-access";
import { supabase } from "@/lib/supabase";

type AccessState = "loading" | "unauthenticated" | ProfileAccessState;

function getRedirectPath(pathname: string, accessState: AccessState): string | null {
  if (accessState === "loading") {
    return null;
  }

  const isWelcome = pathname === "/welcome";
  const isOnboarding = pathname.startsWith("/onboarding");
  const isProfileSetup = pathname === "/photos";
  const isRoot = pathname === "/";

  if (accessState === "unauthenticated") {
    if (isWelcome || isOnboarding) {
      return null;
    }

    return "/welcome";
  }

  if (accessState === "verified_incomplete") {
    if (isProfileSetup) {
      return null;
    }

    return "/photos";
  }

  if (isRoot || isWelcome || isOnboarding || isProfileSetup) {
    return "/discover";
  }

  return null;
}

function RouteLoading() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator />
    </View>
  );
}

export default function RootLayout() {
  const pathname = usePathname();
  const router = useRouter();
  const [accessState, setAccessState] = useState<AccessState>("loading");

  useEffect(() => {
    let isMounted = true;

    const resolveAccessState = async (session: Session | null | undefined) => {
      if (!session?.user?.id) {
        clearProfileAccessStateCache();
        if (isMounted) {
          setAccessState("unauthenticated");
        }
        return;
      }

      const state = await getProfileAccessState(session.user.id);

      if (isMounted) {
        setAccessState(state);
      }
    };

    const bootstrap = async () => {
      setAccessState("loading");
      const { data } = await supabase.auth.getSession();
      await resolveAccessState(data.session);
    };

    void bootstrap();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccessState("loading");

      if (session?.user?.id) {
        clearProfileAccessStateCache(session.user.id);
      }

      void resolveAccessState(session);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const redirectPath = useMemo(
    () => getRedirectPath(pathname, accessState),
    [accessState, pathname]
  );

  useEffect(() => {
    if (redirectPath) {
      router.replace(redirectPath as never);
    }
  }, [redirectPath, router]);

  if (accessState === "loading" || redirectPath) {
    return <RouteLoading />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
