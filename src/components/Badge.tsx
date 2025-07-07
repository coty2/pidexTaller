// Etiquetas 

import { generosContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface BadgeProps {
    genreId?: number;
    label?: string;
}

function getGeneroPorId(id: number) {
    return generosContenidoAudiovisual.find(g => g.id === id)?.nombre ?? '-';
}

const Badge: React.FC<BadgeProps> = ({ genreId, label }) => {
    const text = genreId !== undefined ? getGeneroPorId(genreId) : label ?? '-';

    return (
        <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{text}</Text>
        </View>
    );
};

export default Badge;

const styles = StyleSheet.create({
    badgeContainer: {
        backgroundColor: "#403E43",
        alignItems: 'center',
        marginBottom: 2,
    },
    badgeText: {
        fontSize: 10,
        color: '#FFFFFF',
        padding: 4,
    },

});