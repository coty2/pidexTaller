// Juego del ahorcado
import { API_URL, GAME_CONFIG, pixdexColors } from "@/src/common/constants";
import Button from "@/src/components/Button";
import GuessTitleModal from "@/src/components/GuessTitleModal";
import { TextPressStart2P } from "@/src/components/TextPressStart2P";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AhorcadoScreen() {
  const router = useRouter();

  const [contenidos, setContenidos] = useState<any[]>([]);
  const [indice, setIndice] = useState(0);
  const [vidas, setVidas] = useState(GAME_CONFIG.VIDAS_INICIALES);
  const [puntos, setPuntos] = useState(0);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [guess, setGuess] = useState("");

  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [ultimoResultado, setUltimoResultado] = useState<"correcto" | "incorrecto" | null>(null);
  const [imagenRevelada, setImagenRevelada] = useState(false);

  useEffect(() => {
    fetchContenidos();
  }, []);

  async function fetchContenidos() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/contenidos`);
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      const data = await res.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No se recibieron datos válidos de la API");
      }

      const mezclados = [...data].sort(() => Math.random() - 0.5);
      setContenidos(mezclados);
      setIndice(0);
      setVidas(GAME_CONFIG.VIDAS_INICIALES);
      setPuntos(0);
      setJuegoTerminado(false);
      setUltimoResultado(null);
      setImagenRevelada(false);
      setLoading(false);
    } catch (err) {
      console.error("Error al cargar contenidos desde la API:", err);
      Alert.alert(
        "Error de conexión",
        "No se pudo conectar con la API. Verifica que el servidor esté funcionando.",
        [
          { text: "Reintentar", onPress: fetchContenidos },
          { text: "Cancelar", onPress: () => router.push("/") }
        ]
      );
      setLoading(false);
    }
  }

  const handleGuessSubmit = () => {
    const tituloCorrecto = contenidos[indice].nombre.toLowerCase().trim();
    const intento = guess.toLowerCase().trim();

    if (intento === tituloCorrecto) {
      setPuntos(prev => prev + GAME_CONFIG.PUNTOS_POR_ADIVINANZA);
      setUltimoResultado("correcto");
      setImagenRevelada(true);
      setTimeout(() => {
        avanzarContenido();
        setUltimoResultado(null);
      }, 1500);
    } else {
      const nuevasVidas = vidas - 1;
      setVidas(nuevasVidas);
      setUltimoResultado("incorrecto");
      if (nuevasVidas <= 0) {
        setTimeout(() => {
          setJuegoTerminado(true);
          setUltimoResultado(null);
        }, 1500);
      }
    }
    setGuess("");
    setModalVisible(false);
  };

  const avanzarContenido = () => {
    if (indice + 1 < contenidos.length) {
      setIndice(prev => prev + 1);
      setImagenRevelada(false);
    } else {
      setJuegoTerminado(true);
    }
  };

  const mostrarPista = () => {
    Alert.alert(
      "Pista",
      contenidos[indice]?.descripcion || "No hay pista disponible",
      [{ text: "OK" }]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator color="#A694F9" size="large" />
          <Text style={styles.text}>Conectando con la API...</Text>
          <Text style={styles.subText}>{API_URL}/contenidos</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (juegoTerminado) {
    const porcentaje = contenidos.length > 0 ? Math.round((puntos / contenidos.length) * 100) : 0;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <TextPressStart2P style={styles.title}>GAME OVER</TextPressStart2P>
          <Text style={styles.text}>Puntaje final: {puntos}</Text>
          <Text style={styles.text}>Contenidos adivinados: {puntos} de {contenidos.length}</Text>
          <Text style={styles.text}>Porcentaje de éxito: {porcentaje}%</Text>
          <View style={styles.buttonContainer}>
            <Button title="Jugar de nuevo" onPress={fetchContenidos} />
            <Button title="Volver al inicio" onPress={() => router.push("/")} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (!contenidos[indice]) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.text}>No se encontraron contenidos para jugar.</Text>
          <Text style={styles.subText}>Verifica que la API esté funcionando</Text>
          <Button title="Reintentar" onPress={fetchContenidos} />
          <Button title="Volver al inicio" onPress={() => router.push("/")} />
        </View>
      </SafeAreaView>
    );
  }

  const contenidoActual = contenidos[indice];

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.header}>
        <Button title="EXIT" onPress={() => router.push("/")} />
        <View style={styles.vidas}>
          {Array.from({ length: vidas }).map((_, i) => (
            <Text key={i} style={styles.corazon}>💜</Text>
          ))}
        </View>
        <TextPressStart2P style={styles.score}>Score: {puntos}</TextPressStart2P>
      </View>

      {ultimoResultado && (
        <View style={[
          styles.resultadoBanner,
          ultimoResultado === "correcto" ? {backgroundColor: pixdexColors.verde} : {backgroundColor: pixdexColors.rojo}
        ]}>
          <TextPressStart2P>
            {ultimoResultado === "correcto" ? "¡Correcto!" : "¡Incorrecto!"}
          </TextPressStart2P>
        </View>
      )}

      <View style={styles.gameContainer}>
        <View style={styles.botones}>
          <Button title="GUESS TITLE" onPress={() => setModalVisible(true)} />
          <Button title="PISTA" onPress={mostrarPista} />
        </View>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: contenidoActual.imageUrl }} 
            style={styles.image} 
            resizeMode="cover"
            onError={() => console.log("Error cargando imagen")}
          />
          {!imagenRevelada && (
            <View style={styles.fogOverlay}>
              <Text style={styles.blurText}>Adivina el título para revelar la imagen</Text>
            </View>
          )}
        </View>
        <View style={styles.guiones}>
          {contenidoActual.nombre.split("").map((char: string, i: number) => (
            <Text key={i} style={styles.letra}>
              {char === " " ? " " : "_"}
            </Text>
          ))}
        </View>
        <Text style={styles.progress}>Contenido {indice + 1} de {contenidos.length}</Text>
      </View>

      <GuessTitleModal
        visible={modalVisible}
        value={guess}
        onChangeText={setGuess}
        onSubmit={handleGuessSubmit}
        onCancel={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1A1F2C',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },
  corazon: {
    fontSize: 20,
    marginHorizontal: 2,
  },
  vidas: {
    flexDirection: 'row',
  },
  score: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultadoBanner: {
    padding: 12,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  resultadoText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameContainer: {
    borderWidth: 4,
    borderColor: "#403E43",
    paddingVertical: 24,
    marginHorizontal: 16,
    marginBottom: 20,
    minHeight: 600,
  },
  botones: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    paddingBottom: 20,
  },
  imageContainer: {
    backgroundColor: '#2A2A3A',
    height: 450,
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: "100%",
    height: "100%",
  },
  guiones: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  letra: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  progress: {
    color: "#9B87F5",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  subText: {
    fontSize: 12,
    color: "#9B87F5",
    textAlign: "center",
  },
  buttonContainer: {
    gap: 12,
    alignItems: "center",
  },
  fogOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.95)',
  },
  blurText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
