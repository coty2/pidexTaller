// Seccion de arriba con los juegos
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { TextPressStart2P } from "./TextPressStart2P";

interface GameCardProps {
    title: string;
    description: string;
    onPress?: () => void;
    backgroundColor?: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, description, onPress, backgroundColor = "#6E59A5", }) => {
    return (
        <View style={[styles.card, { backgroundColor }]}>
            <TextPressStart2P style={styles.title}>{title} </TextPressStart2P>
            <Text style={styles.description}>{description}</Text>
            <Pressable onPress={onPress}>
                <TextPressStart2P style={styles.playText}>Jugar</TextPressStart2P>
            </Pressable>
        </View>
    );
};

export default GameCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor:"#6E59A5",
        borderWidth: 4,
        borderColor: "#4A3D70",
        padding: 10,     
        flexBasis:"48%",
    },
    title:{
        fontSize: 14,
        color: "white",
        marginBottom: 5,
    },
    description:{
        fontSize: 12,
        color: "white",
        marginBottom: 5,
    },
    playText:{
        fontSize: 10,
        color: "white",
        textAlign:"right",
    },
})