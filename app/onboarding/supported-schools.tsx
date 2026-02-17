import { router } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

const LIVE_SCHOOLS = [
  "Rutgers New Brunswick",
  "Penn State",
  "Temple",
  "University of Pittsburgh",
  "UMass Amherst",
  "UConn",
  "Stony Brook",
  "University at Buffalo",
  "Syracuse",
  "Northeastern",
  "Boston University",
  "NYU",
];

const COMING_SOON = [
  "Drexel",
  "University of Delaware",
  "Binghamton",
  "University at Albany",
  "University of New Hampshire",
];

export default function SupportedSchools() {
  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      <Text style={{ fontSize: 28, fontWeight: "700" }}>Supported Schools</Text>
      <Text style={{ marginTop: 8, opacity: 0.7, fontSize: 16 }}>
        Pick your school to continue. You will verify with your .edu email.
      </Text>

      <Text style={{ marginTop: 22, fontSize: 18, fontWeight: "700" }}>Live</Text>

      <FlatList
        style={{ marginTop: 8 }}
        data={LIVE_SCHOOLS}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/onboarding/verify-email",
                params: { school: item },
              })
            }
            style={{
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderColor: "#e5e5e5",
            }}
          >
            <Text style={{ fontSize: 16 }}>{item}</Text>
          </Pressable>
        )}
      />

      <Text style={{ marginTop: 22, fontSize: 18, fontWeight: "700" }}>
        Coming Soon
      </Text>

      {COMING_SOON.map((s) => (
        <View
          key={s}
          style={{
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderColor: "#e5e5e5",
            opacity: 0.6,
          }}
        >
          <Text style={{ fontSize: 16 }}>{s}</Text>
        </View>
      ))}
    </View>
  );
}
