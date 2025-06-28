//Button component

import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { TextPressStart2P } from "./TextPressStart2P";

interface ButtonProps {
    title: string;
    onPress: () => void;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, icon}) => {
    return (
        <Pressable onPress={onPress} style={styles.BaseButton}>
            {icon && <View style={styles.icon}>{icon}</View>}
            <TextPressStart2P style={styles.title}>{title}</TextPressStart2P>
        </Pressable>
    
    );

};

export default Button;

const styles = StyleSheet.create({
    BaseButton: {
        flexDirection: 'row',
        backgroundColor: '#6E59A5',
        borderWidth:1,
        borderTopColor:"#9B87F5",
        borderLeftColor:"#9B87F5",
        borderBottomColor:"#4A3D70",
        borderRightColor:"#4A3D70",
        padding: 5,
        alignItems: 'center',
    },
    title:{
        fontSize: 10,
        color: "white",
        marginTop:  5,
    },
    icon: {
    marginRight: 6,
    },
    

});