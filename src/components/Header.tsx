// Header Pidex
import { TextPressStart2P } from '@/src/components/TextPressStart2P';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

export default function PixdexHeader({ onFiltrar }: { onFiltrar: () => void }) {
    return (
        <View style={styles.header}>
            <TextPressStart2P style={styles.title}>Pixdex</TextPressStart2P>
            <Pressable style={styles.filterButton} onPress={onFiltrar}>
                <Ionicons name="settings-outline" size={20} color="white" style={{ marginRight: 6 }} />
                <TextPressStart2P style={styles.filterText}>FILTRAR</TextPressStart2P>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#1E1E2E',
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        color: '#A694F9',
    },
    filterButton: {
        flexDirection: 'row',
        backgroundColor: '#6E59A5',
        borderWidth:1,
        borderTopColor:"#9B87F5",
        borderLeftColor:"#9B87F5",
        borderBottomColor:"#4A3D70",
        borderRightColor:"#4A3D70",
        padding: 5,
        alignItems: 'center',
    },
    icon: {
        marginRight: 4,
    },
    filterText: {
        fontSize: 10,
        color: 'white',
        marginTop:  4,
    },
});
