import { tiposContenidoAudiovisual } from "@/src/data/tiposContenidoAudiovisual";

export function GET() {
    return new Response(JSON.stringify(tiposContenidoAudiovisual));
}