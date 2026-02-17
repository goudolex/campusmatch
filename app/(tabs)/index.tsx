import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 30, fontWeight: "700" }}>CampusMatch</Text>
      <Text style={{ marginTop: 10, opacity: 0.7, fontSize: 16 }}>
        Verified college dating built for student life.
      </Text>

      <Pressable
        onPress={() => router.push("/onboarding/supported-schools")}
        style={{
          marginTop: 20,
          paddingVertical: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#111",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Get started</Text>
      </Pressable>
    </View>
  );
}
