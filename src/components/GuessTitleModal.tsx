// Modal para adivinar el titulo del contenido.

import React from "react";
import { KeyboardAvoidingView, Modal, Platform, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import Button from "./Button";

interface GuessTitleModalProps {
    visible: boolean;
    value: string;
    onChangeText: (text: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

const GuessTitleModal: React.FC<GuessTitleModalProps> = ({
    visible,
    value,
    onChangeText,
    onSubmit,
    onCancel,
}) => {
  const handleSubmit = () => {
    if (value.trim().length > 0) {
      onSubmit();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.overlay}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>¡Adivina el título!</Text>
          <Text style={styles.subtitle}>Escribe el título completo del contenido</Text>
          <TextInput
            placeholder="Ej: Breaking Bad"
            placeholderTextColor="#aaa"
            style={styles.input}
            value={value}
            onChangeText={onChangeText}
            autoFocus={true}
            autoCapitalize="words"
            autoCorrect={false}
            onSubmitEditing={handleSubmit}
            returnKeyType="done"
          />
          <View style={styles.buttonContainer}>
            <Button 
              title="ADIVINAR" 
              onPress={handleSubmit}
            />
            <Pressable onPress={onCancel} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default GuessTitleModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000aa",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#1E1E2E",
    padding: 24,
    borderRadius: 12,
    width: "85%",
    alignItems: "center",
    gap: 16,
    borderWidth: 2,
    borderColor: "#6E59A5",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 2,
    borderColor: "#6E59A5",
    borderRadius: 8,
    color: "white",
    fontSize: 16,
    backgroundColor: "#2A2A3A",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
    alignItems: "center",
  },
  cancelButton: {
    padding: 8,
  },
  cancelText: {
    color: "#ccc",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
