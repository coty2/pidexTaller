// Etiquetas 

import { generosContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BadgeProps {
    genreId: number;
}

function getGeneroPorId(id: number) {
    return generosContenidoAudiovisual.find(g => g.id === id)?.nombre ?? '-';
}

const Badge: React.FC<BadgeProps> = ({ genreId }) => {
    return (
        <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{getGeneroPorId(genreId)}</Text>
        </View>
    );
};

export default Badge;

const styles = StyleSheet.create({
    badgeContainer: {
        backgroundColor: "#403E43",
    },
    badgeText: {
        fontSize: 10,
        color: '#FFFFFF',
        padding: 4,
    },

});