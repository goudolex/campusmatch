import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function ChatScreen() {
  const { matchId } = useLocalSearchParams<{ matchId: string }>();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>Chat</Text>
      <Text style={{ marginTop: 8, opacity: 0.7 }}>Match ID: {matchId}</Text>
    </View>
  );
}
