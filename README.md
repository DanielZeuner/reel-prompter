# Reel-Prompter

Teleprompter fürs Handy: Frontkamera-Bild mit dem Sprechtext darüber, ein Gerät,
kein Zeichenlimit, kein Abo. Gebaut für Talking-Head-Reels (9:16).

**Läuft unter:** https://danielzeuner.github.io/reel-prompter/

## Was drin ist

- Frontkamera als Hintergrund, Text scrollt darüber (Helligkeit des Hintergrunds in 5 Stufen)
- Tempo in **Wörtern pro Minute** — die App rechnet daraus die **Dreh-Länge in Sekunden**
  und vergleicht sie mit der Ziel-Länge des jeweiligen Skripts
- 9:16-Hilfslinien: zeigt, was nach dem Zuschnitt übrig bleibt
- Blickhöhen-Marken, 3-2-1-Countdown, Bildschirm bleibt wach
- Antippen startet und stoppt; im Lauf blendet die Bedienung aus, damit die
  Bildschirmaufnahme sauber bleibt
- Als Web-App installierbar (Home-Bildschirm), funktioniert offline

## Aufnehmen

Über die **iOS-Bildschirmaufnahme**: Kontrollzentrum → lange auf den Aufnahme-Knopf →
**Mikrofon einschalten** → starten. Das Video landet in Fotos.

## Texte pflegen

Alle Sprechtexte stehen in [`scripts.json`](scripts.json). Wer die Datei ändert und
pusht, ändert damit den Inhalt der App — beim nächsten Öffnen ist der neue Text da,
ohne Kopieren, ohne Import.

```json
{
  "updated": "2026-08-13",
  "scripts": [
    { "id": "r21", "label": "R21 · Titel", "target": 62, "paragraphs": ["Absatz eins.", "Absatz zwei."] }
  ]
}
```

`target` ist die angepeilte Länge in Sekunden. Weglassen oder auf `0` setzen, wenn
es keine Vorgabe gibt.

## Aufbau

Reine statische Seite, keine Abhängigkeiten, kein Bauschritt.

| Datei | Zweck |
|---|---|
| `index.html` | die gesamte App |
| `scripts.json` | die Sprechtexte |
| `sw.js` | Offline-Betrieb |
| `manifest.webmanifest` | Web-App-Angaben (Symbol, Vollbild) |
