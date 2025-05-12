import ContentGrid from '@/src/components/ContentGrid';
import GameCard from '@/src/components/GameCard';
import { contenidosAudiovisuales } from '@/src/data/contenidosAudiovisuales';
import {
  IGeneroContenidoAudiovisual,
  generosContenidoAudiovisual,
} from "@/src/data/generosContenidoAudiovisual";
import {
  ITipoContenidoAudiovisual,
  tiposContenidoAudiovisual,
} from "@/src/data/tiposContenidoAudiovisual";
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
const movies = contenidosAudiovisuales.map(content => ({
    id: content.id.toString(),
    title: content.nombre,
    genre: content.generos.join(', '),
    image: content.imageUrl
}));

return (
    <SafeAreaView style={styles.container}>
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
        >
        <View style={styles.gamesContainer}>
            <GameCard
                title="Desafío del ahorcado"
                description="Adivina los títulos letra por letra. Cuantos podés identificar?"
                onPress={() => console.log("Iniciar juego del ahorcado")}
            />
            <GameCard
                title="Pixel Reveal"
                description="Identificá títulos desde imágenes pixeladas ¡Poné a prueba tu memoria visual!"
                onPress={() => console.log("Iniciar Pixel Reveal")}
                backgroundColor="#5FD068"
            />
        </View>

        {tiposContenidoAudiovisual.map((tipo) => (
            <ContentGrid
                key={tipo.id}
                title={tipo.plural.toUpperCase()}
                items={buildContentByType(tipo.id)}
            />
        ))}
        
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
        paddingBottom: 20,
    },
    gamesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 24,
        gap: 16,
    },
});


/**
 * Busca un genero por su id y lo retorna. En caso de no encontrarlo, retorna un genero con el id consultado y nombre "-"
 * @param id number
 * @returns IGeneroContenidoAudiovisual
 */
function getGeneroPorId(id: number): IGeneroContenidoAudiovisual {
    const fallback = { id: id, nombre: "-" };
    return (
    generosContenidoAudiovisual.find((genero) => genero.id === id) ?? fallback
);
}

/**
 * Busca un tipo por su id y lo retorna. En caso de no encontrarlo, retorna un tipo con el id consultado y nombre "-"
 * @param id number
 * @returns ITipoContenidoAudiovisual
 */
function getTipoPorId(id: number): ITipoContenidoAudiovisual {
    const fallback = { id: id, singular: "-", plural: "-" };
    return (
        tiposContenidoAudiovisual.find((contenido) => contenido.id === id) ??
        fallback
    );
}
const buildContentByType = (tipoId: number) => {
    return contenidosAudiovisuales
        .filter(content => content.tipoId === tipoId)
        .map(content => ({
            id: content.id.toString(),
            title: content.nombre,
            genre: content.generos.map(id => getGeneroPorId(id).nombre).join(', '),
            image: content.imageUrl
        }));
};
