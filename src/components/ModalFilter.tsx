// Modal para el filtro

import { generosContenidoAudiovisual } from '@/src/data/generosContenidoAudiovisual';
import { tiposContenidoAudiovisual } from '@/src/data/tiposContenidoAudiovisual';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Checkbox } from 'react-native-paper';

interface ModalFiltroProps {
  visible: boolean;
  onCancel: () => void;
  onApply: (tipos: number[], generos: number[]) => void;
}

export default function ModalFilter({
  visible,
  onCancel,
  onApply,
}: ModalFiltroProps) {
  const [selectedTipos, setSelectedTipos] = useState<number[]>([]);
  const [selectedGeneros, setSelectedGeneros] = useState<number[]>([]);

  const toggleSeleccion = (arr: number[], setArr: (v: number[]) => void, id: number) => {
    setArr(arr.includes(id) ? arr.filter(i => i !== id) : [...arr, id]);
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.modalContainer} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.header}>Filter Content</Text>

          <ScrollView style={styles.scroll}>
            <Text style={styles.sectionTitle}>Content Types</Text>
            {tiposContenidoAudiovisual.map(tipo => (
              <View key={tipo.id} style={styles.option}>
                <Checkbox
                  status={selectedTipos.includes(tipo.id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleSeleccion(selectedTipos, setSelectedTipos, tipo.id)}
                  color="#9B87F5"
                  uncheckedColor="#FFFFFF"
                />
                <Text style={styles.label}>{tipo.singular}</Text>
              </View>
            ))}

            <Text style={styles.sectionTitle}>Genres</Text>
            {generosContenidoAudiovisual.map(genero => (
              <View key={genero.id} style={styles.option}>
                <Checkbox
                  status={selectedGeneros.includes(genero.id) ? 'checked' : 'unchecked'}
                  onPress={() => toggleSeleccion(selectedGeneros, setSelectedGeneros, genero.id)}
                  color="#9B87F5"
                  uncheckedColor="#FFFFFF"
                />
                <Text style={styles.label}>{genero.nombre}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.footer}>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </Pressable>
            <Pressable
              style={styles.applyButton}
              onPress={() => {
                onApply(selectedTipos, selectedGeneros);
              }}
            >
              <Text style={styles.applyText}>APPLY</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1e1e2e',
    width: '90%',
    maxHeight: '90%',
    borderRadius: 8,
    padding: 16,
    borderWidth: 2,
    borderColor: '#9B87F5',
  },
  header: {
    fontFamily: 'PressStart2P-Regular',
    fontSize: 14,
    color: 'white',
    marginBottom: 12,
  },
  scroll: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: 'PressStart2P-Regular',
    fontSize: 12,
    color: '#5FD068',
    marginTop: 12,
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 8,
    backgroundColor: '#2e2e2e',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
  },
  cancelText: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 10,
  },
  applyButton: {
    flex: 1,
    padding: 8,
    backgroundColor: '#9B87F5',
    alignItems: 'center',
  },
  applyText: {
    color: '#FFFFFF',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 10,
  },
});
