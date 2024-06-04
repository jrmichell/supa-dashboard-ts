import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "../utils/SupabaseClient";

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, sessionState) => {
        if (sessionState?.user) {
          router.push("/dashboard");
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [router]);

  return null;
}
