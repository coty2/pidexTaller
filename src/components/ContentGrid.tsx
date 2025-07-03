// Contenedor de las peliculas, series y anime
import ContentCard from '@/src/components/ContentCard';
import { FlatList, StyleSheet, View } from 'react-native';
import { TextPressStart2P } from './TextPressStart2P';

interface ContentItem {
    id: string;
    title: string;
    genres: number[];
    image: string;
}

interface ContentGridProps {
    title: string;
    items: ContentItem[];
}

const CARD_GAP = 12;
const HORIZONTAL_PADDING = 16;

export default function ContentGrid({ title, items }: ContentGridProps) {
    const renderItem = ({ item }: { item: ContentItem }) => (
        <ContentCard
            id={item.id}
            title={item.title}
            genres={item.genres}
            image={item.image}
        />
);

return (
    <View style={styles.container}>
        <View style={styles.sectionHeader}>
            <TextPressStart2P style={styles.title}>{title}</TextPressStart2P>
        </View>
        <FlatList
            data={items}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
        />
    </View>
);
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: "#403E43",
        paddingTop: 16,
        paddingBottom: 8,
        position: "relative", 
        marginBottom: 24,
    },
    sectionHeader: {
        position: "absolute",
        top: -10,
        left:16,
        backgroundColor:"#6E59A5",
        borderColor: "#9B87F5", 
        borderWidth: 2,
        marginBottom: 8,
        paddingHorizontal: 4,
    },
    title: {
        fontSize: 10,
        fontWeight: "bold",
        color: "white",
    },
    listContent: {
        paddingHorizontal: HORIZONTAL_PADDING,
        gap: CARD_GAP,
    },
});