// Tarjetas del contenido audiovisual
import { useRouter } from 'expo-router';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { TextPressStart2P } from './TextPressStart2P';

interface ContentCardProps {
    id: string;
    title: string;
    genre: string;
    image: string;
}

const { width } = Dimensions.get('window');
const CARD_GAP = 12;
const HORIZONTAL_PADDING = 16;
const cardWidth = (width - (2 * HORIZONTAL_PADDING) - (2 * CARD_GAP)) / 3;

export default function ContentCard({ 
    id, 
    title, 
    genre, 
    image 
}: ContentCardProps) {
const router = useRouter();

const handlePress = () => {
    router.push(`/detail/${id}` as const);
};

return (
    <View style={styles.container}>
        <Pressable
            style={styles.pressable}
            onPress={handlePress}
        >
        <View style={styles.imageContainer}>
            <Image 
                source={{ uri: image }} 
                style={styles.image}
                resizeMode="cover"
            />
        </View>
        <View style={styles.infoContainer}>
            <TextPressStart2P style={styles.title} numberOfLines={1}>{title}</TextPressStart2P>
            <View style={styles.genreTag}>
                <Text style={styles.genre} numberOfLines={1}>{genre}</Text>
            </View>
        </View>
        </Pressable>
    </View>
);
}

const styles = StyleSheet.create({
container: {
    width: cardWidth,
    borderWidth: 2,
    borderRightColor:"9B87F5",
    borderBottomColor: "#9B87F5",
    borderLeftColor: "#4A3D70",
    borderTopColor: "#4A3D70",
    overflow: 'hidden',
    backgroundColor: '#1A1F2C',
},
pressable: {
    flex: 1,
},
// Imagen
imageContainer: {
    width: '100%',
    aspectRatio: 2/3,
    backgroundColor: '#1A1A2E',
},
image: {
    width: '100%',
    height: '100%',
},
    infoContainer: {
    padding: 8,
},
title: {
    fontSize: 10,
    color: '#FFFFFF',
    marginBottom: 4,
},
// Etiqueta de genero
genre: {
    fontSize: 10,
    color: '#FFFFFF',
    padding: 4,
},
genreTag: {
    backgroundColor: "#403E43",
},
});