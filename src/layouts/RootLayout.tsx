import Button from "@/src/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";

export function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
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

      <Stack.Screen
        name="games/hangman/index"
        options={{ 
          headerShown: false 
        }}
      />

    </Stack>
  );
}
