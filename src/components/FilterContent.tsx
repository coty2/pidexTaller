// Contenido filtrado
import { API_URL } from "@/src/common/constants";
import { IContenidoAudiovisual } from "@/src/data/contenidosAudiovisuales";
import { ITipoContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import ContentGrid from './ContentGrid';

type FilterContentProps = {
  selectedTypes: number[];
  selectedGenres: number[];
}

export function FilterContent({ selectedTypes, selectedGenres }: FilterContentProps) {
  const [tipos, setTipos] = useState<ITipoContenidoAudiovisual[]>([]);
  const [contenidos, setContenidos] = useState<IContenidoAudiovisual[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      try {
        const [r1, r2] = await Promise.all([
          fetch(`${API_URL}/tipos+api`),
          fetch(`${API_URL}/contenidos+api`)
        ]);
        const tiposData: ITipoContenidoAudiovisual[] = await r1.json();
        const contenidosData: IContenidoAudiovisual[] = await r2.json();
        setTipos(tiposData);
        setContenidos(contenidosData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };
    loadAll();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#A694F9" />;
  }

  const contenidosFiltrados = contenidos.filter((c) => {
    const okTipo = selectedTypes.length === 0 || selectedTypes.includes(c.tipoId);
    const okGenero = selectedGenres.length === 0 || c.generos.some((g) => selectedGenres.includes(g));
    return okTipo && okGenero;
  });

  const tiposAMostrar = selectedTypes.length === 0
    ? tipos
    : tipos.filter((t) => selectedTypes.includes(t.id));

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {tiposAMostrar.map((tipo) => {
        const items = contenidosFiltrados
          .filter((c) => c.tipoId === tipo.id)
          .map((c) => ({
            id: c.id.toString(),
            title: c.nombre,
            genres: c.generos,
            image: String(c.imageUrl),
          }));

        if (items.length === 0) return null;

        return (
          <ContentGrid
            key={tipo.id}
            title={tipo.plural.toUpperCase()}
            items={items}
          />
        );
      })}
    </ScrollView>
  );
} 