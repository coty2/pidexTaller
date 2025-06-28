import Button from "@/src/components/Button";
import Header from "@/src/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

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
            <Button
                title="BACK"
                onPress={() => navigation.goBack()}
                icon={<Ionicons name="arrow-back" size={24} color="white" />}
            />
          ),
        })}
      />
    </Stack>
  );
}
