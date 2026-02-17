import { router, useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function VerifyEmail() {
  const { school } = useLocalSearchParams<{ school?: string }>();

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>Verify Email</Text>
      <Text style={{ marginTop: 8, opacity: 0.7, fontSize: 16 }}>
        Continue with your school email to verify your student status.
      </Text>

      <View
        style={{
          marginTop: 20,
          padding: 14,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#e5e5e5",
        }}
      >
        <Text style={{ fontSize: 14, opacity: 0.6 }}>Selected school</Text>
        <Text style={{ marginTop: 4, fontSize: 16, fontWeight: "600" }}>
          {school ?? "Unknown school"}
        </Text>
      </View>

      <Pressable
        onPress={() => router.back()}
        style={{
          marginTop: 20,
          paddingVertical: 12,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#111",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>Back</Text>
      </Pressable>
    </View>
  );
}
