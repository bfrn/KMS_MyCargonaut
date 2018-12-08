# Test App
* erstellt mit Angular & Typescript
* Projektstruktur ist hauptsächlich in client & server aufgeteilt
* SSL Zertifikat benötigt, da localhost sonst keine sichere Verbindung aufbauen kann
* Erzeugung unter Windows:
1. Download and install Win32 OpenSSL v1.1.0h Light
   (http://slproweb.com/download/Win32OpenSSL_Light-1_1_0h.exe)
2. Type in einer BASH: (z.B. GIT-BASH)
   openssl req -x509 -out localhost.crt -keyout localhost.key -newkey rsa:2048 -nodes -sha256 -subj "//CN=localhost"
* Erzeugung unter MacOS:
1. Type in terminal
2. openssl req -x509 -out localhost.crt -keyout localhost.key -newkey rsa:2048 -nodes -sha256 -subj "/CN=localhost"
* Certificate und key in den Ordner "sslcert" kopieren (im server des Projekts), vorhandene löschen

## Projekt starten
* server starten (server.js)
* cd client
* ng build --op ../server/client --watch
* Befehlt lauscht Veränderungen, Webansicht aktualisiert sich, sobald gespeichert wird
