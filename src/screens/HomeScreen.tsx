// Pantalla principal
import ContentGrid from '@/src/components/ContentGrid';
import GameCard from '@/src/components/GameCard';
import PixdexHeader from '@/src/components/Header';
import ModalFilter from '@/src/components/ModalFilter';
import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


interface ContenidoAudiovisual {
    id: number;
    nombre: string;
    tipoId: number;
    generos: number[];
    imageUrl: string;
}

interface TipoContenidoAudiovisual {
    id: number;
    nombre: string;
    plural: string;
}

export default function HomeScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState<number[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
    const [contenidosAudiovisuales, setContenidosAudiovisuales] = useState<ContenidoAudiovisual[]>([]);
    const [tiposContenidoAudiovisual, setTiposContenidoAudiovisual] = useState<TipoContenidoAudiovisual[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                const contenidosResponse = await fetch('/contenidos');
                const contenidosData = await contenidosResponse.json();
                setContenidosAudiovisuales(contenidosData);

                const tiposResponse = await fetch('/tipos');
                const tiposData = await tiposResponse.json();
                setTiposContenidoAudiovisual(tiposData);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const buildContentByType = (tipoId: number) => {
        return contenidosAudiovisuales
            .filter(content => content.tipoId === tipoId)
            .map(content => ({
                id: content.id.toString(),
                title: content.nombre,
                genres: content.generos,
                image: String(content.imageUrl)
            }));
    };

    const contenidosFiltrados = contenidosAudiovisuales.filter((c) => {
        const okTipo = selectedTypes.length === 0 || selectedTypes.includes(c.tipoId);
        const okGenero = selectedGenres.length === 0 || c.generos.some((g) => selectedGenres.includes(g));
        return okTipo && okGenero;
    });

    const tiposAMostrar = selectedTypes.length === 0
        ? tiposContenidoAudiovisual
        : tiposContenidoAudiovisual.filter((t) => selectedTypes.includes(t.id));

    const handleApplyFilters = (types: number[], genres: number[]) => {
        setSelectedTypes(types);
        setSelectedGenres(genres);
        setModalVisible(false);
    };

    

    return (
        <SafeAreaView style={styles.container}>
            <PixdexHeader onFilterPress={() => setModalVisible(true)} />
            
            <ModalFilter
                visible={modalVisible}
                onCancel={() => setModalVisible(false)}
                onApply={handleApplyFilters}
            />
            
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.gamesContainer}>
                    <GameCard
                        title="Desafío del ahorcado"
                        description="Adivina los títulos letra por letra. Cuantos podés identificar?"
                        onPress={() => router.push("/games/hangman")}
                    />
                    <GameCard
                        title="Pixel Reveal"
                        description="Identificá títulos desde imágenes pixeladas ¡Poné a prueba tu memoria visual!"
                        onPress={() => console.log("Iniciar Pixel Reveal")}
                        backgroundColor="#5FD068"
                    />
                </View>

                {tiposAMostrar.map((tipo) => {
                    const items = contenidosFiltrados
                        .filter((c) => c.tipoId === tipo.id)
                        .map((c) => ({
                            id: c.id.toString(),
                            title: c.nombre,
                            genres: c.generos,
                            image: String(c.imageUrl),
                        }));

                    
                    if (items.length === 0) return null;

                    return (
                        <ContentGrid
                            key={tipo.id}
                            title={tipo.plural.toUpperCase()}
                            items={items}
                        />
                    );
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#151521',
    },
    scrollContent: {
        paddingBottom: 5,
    },
    gamesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24,
        gap: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
