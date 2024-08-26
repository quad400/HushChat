import { Colors } from "@/src/constants/Colors";
import { useAuth } from "@/src/providers/AuthProvider";
import { Redirect, Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  const { token } = useAuth();

  if (token) {
    return <Redirect href="/(main)" />;
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.light.background,
        width: "100%",
        height: "100%",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Slot />
    </SafeAreaView>
  );
}
