// Cada tarjeta de contenido audiovisual
import Badge from '@/src/components/Badge';
import { TextPressStart2P } from '@/src/components/TextPressStart2P';
import { contenidosAudiovisuales } from '@/src/data/contenidosAudiovisuales';
import { tiposContenidoAudiovisual } from '@/src/data/tiposContenidoAudiovisual';
import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    
    const content = contenidosAudiovisuales.find(c => c.id === Number(id));

    if (!content) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>Contenido no encontrado</Text>
            </SafeAreaView>
        );
    }

    const typeContent = tiposContenidoAudiovisual.find(t => t.id === content.tipoId);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.content}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: String(content.imageUrl) }} 
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
                <View style={styles.info}>
                    <TextPressStart2P style={styles.title}>{content.nombre}</TextPressStart2P>
                    {typeContent && (
                        <View style={styles.typeContainer}>
                            <Badge label={typeContent.singular} />
                        </View>
                    )}
                    <Text style={styles.description}>{content.descripcion}</Text>
                    <TextPressStart2P style={styles.genre}>Genres</TextPressStart2P>
                    <View style={styles.genresContainer}>
                        {content.generos.map((genreId) => (
                            <Badge key={genreId} genreId={genreId}/>
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
    content: {
        borderWidth: 4,
        borderColor: "#403E43",
        paddingTop: 8,
        paddingBottom: 24,
        paddingHorizontal: 16,
        marginBottom: 20,
        minHeight: 700,
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

    },
    title: {
        fontSize: 20,
        color: '#6E59A5',
        marginTop: 15,
        marginBottom: 5,
    },
    description: {
        color: '#FFFFFF',
        marginBottom: 10,
    },
    typeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 5,
    },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    errorText: {
        fontFamily: 'VT323',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
    genre: {
        fontSize: 14,
        color: "#5FD068",
        marginBottom: 5,
    },
});