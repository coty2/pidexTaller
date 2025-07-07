// Header Pidex
import Button from '@/src/components/Button';
import { TextPressStart2P } from '@/src/components/TextPressStart2P';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from "react-native";

export default function PixdexHeader({ onFilterPress }: { onFilterPress: () => void }) {
  return (
    <View style={styles.header}>
      <TextPressStart2P style={styles.title}>Pixdex</TextPressStart2P>
      <Button
        title="FILTRAR"
        onPress={onFilterPress}
        icon={<Ionicons name="settings-outline" size={24} color="white" />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1A1F2C',
  },
  title: {
    fontSize: 16,
    color: '#A694F9',
  },
});
