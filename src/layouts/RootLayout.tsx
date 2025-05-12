import Header from "@/src/components/Header";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Pressable } from "react-native";

export function RootLayout() {

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header onFiltrar={() => console.log("Filtrar action triggered")} />,
        }}
      />
      
      <Stack.Screen
        name="detail/[id]"
        options={({ navigation }) => ({
          title: "",
          headerStyle: { backgroundColor: "#1E1E2E" },
          headerLeft: () => (
            <Pressable
              onPress={() => navigation.goBack()}
              style={{
                flexDirection: "row",
                backgroundColor: "#6E59A5",
                paddingHorizontal: 12,
                paddingVertical: 6,              
              }}
            >
              <Ionicons
                name="arrow-back"
                size={14}
                color="white"
                style={{ marginRight: 6 }}
              />
              <TextPressStart2P style={{ fontSize: 10, color: "white", marginTop:2 }}> BACK </TextPressStart2P>
            </Pressable>
          ),
        })}
      />
    </Stack>
  );
}
