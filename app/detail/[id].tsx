// Cada tarjeta de contenido audiovisual
import Badge from '@/src/components/Badge';
import { TextPressStart2P } from '@/src/components/TextPressStart2P';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContenidoAudiovisual {
    id: number;
    nombre: string;
    tipoId: number;
    generos: number[];
    imageUrl: string;
    descripcion: string;
}

interface TipoContenidoAudiovisual {
    id: number;
    nombre: string;
    singular: string;
}

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const [content, setContent] = useState<ContenidoAudiovisual | null>(null);
    const [typeContent, setTypeContent] = useState<TipoContenidoAudiovisual | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const contenidosResponse = await fetch('/contenidos');
                const contenidosData: ContenidoAudiovisual[] = await contenidosResponse.json();
                
            
                const foundContent = contenidosData.find(c => c.id === Number(id));
                if (!foundContent) {
                    setError('Contenido no encontrado');
                    setLoading(false);
                    return;
                }
                
                setContent(foundContent);
                

                const tiposResponse = await fetch('/tipos');
                const tiposData: TipoContenidoAudiovisual[] = await tiposResponse.json();
                
                const foundType = tiposData.find(t => t.id === foundContent.tipoId);
                setTypeContent(foundType || null);
                
            } catch (error) {
                console.error('Error al cargar los datos:', error);
                setError('Error al cargar el contenido');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchData();
        }
    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>Cargando...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error || !content) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>{error || 'Contenido no encontrado'}</Text>
            </SafeAreaView>
        );
    }

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
    loadingText: {
        fontFamily: 'VT323',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genre: {
        fontSize: 14,
        color: "#5FD068",
        marginBottom: 5,
    },
});