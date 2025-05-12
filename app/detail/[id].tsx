// Cada tarjeta de contenido audiovisual
import { TextPressStart2P } from '@/src/components/TextPressStart2P';
import { contenidosAudiovisuales } from '@/src/data/contenidosAudiovisuales';
import { generosContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function getGeneroPorId(id: number) {
    return generosContenidoAudiovisual.find(g => g.id === id)?.nombre ?? '-';
}

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    
    const content = contenidosAudiovisuales.find(c => c.id === Number(id));


if (!content) {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.errorText}>Contenido no encontrado</Text>
        </SafeAreaView>
    );
}

return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.content}>
            <View style={styles.imageContainer}>
                <Image 
                    source={{ uri: content.imageUrl }} 
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.info}>
                <TextPressStart2P style={styles.title}>{content.nombre}</TextPressStart2P>
                <Text style={styles.description}>{content.descripcion}</Text>
                <TextPressStart2P style={styles.genre}>Genres</TextPressStart2P>
            <View style={styles.genresContainer}>
                {content.generos.map((genreId) => (
                    <View key={genreId} style={styles.genreTag}>
                        <Text style={styles.genreText}>{getGeneroPorId(genreId)}</Text>
                    </View>
                ))}
            </View>
            </View>
        </ScrollView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151521',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#1E1E2E',
    },
    content: {
        borderWidth: 4,
        borderColor: "#403E43",
        paddingTop: 16,
        paddingBottom: 8,
        position: "relative", 
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    imageContainer: {
        width: '100%',
        height: 500,
        backgroundColor: '#1A1A2E',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    info: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        color: '#6E59A5',
        marginBottom: 16,
    },
    description: {
        color: '#FFFFFF',
        marginBottom: 16,
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    genreTag: {
        backgroundColor: '#403E43',
        padding: 5,
    },
    genreText: {
        fontSize: 10,
        color: '#FFFFFF',
    },
    errorText: {
        fontFamily: 'VT323',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
    genre:{
        fontSize: 14,
        color: "#5FD068",
        marginBottom: 4,
    },
    icon: {
        marginRight: 4,
    },
});