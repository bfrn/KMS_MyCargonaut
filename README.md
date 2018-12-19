# Doku

## Aufgabenstellung
Die Aufgabenstellung beinhaltet das Entwickeln einer Applikation in Form einer Plattform, über die sich Nutzer austauschen können, die eine Transportmöglichkeit für ihre Fracht suchen oder Fahrer, welche solch eine Fahrt anbieten. „MyCargonaut“ ähnelt von der Funktionalität einem Car-sharing Dienst, nur dass der Nutzer nicht selber das Fahrzeug fährt, sondern die gewünschte Fracht an einen Fahrer übergibt. Den Transport übernimmt somit die andere Partei. Sofern gewünscht, und bei genügend Platz im Fahrzeug, kann der Fahrt-Suchende auch am Transport teilnehmen. Die Applikation soll grundlegend einige Funktionen besitzen, wie das Suchen und Filtern nach Fahrten, das Anbieten eigener Fahrten sowie gegenseitiger Bewertungen. Besondere Features bestehen unter anderem durch die Möglichkeit für den Fahrer, seinen Standort zu teilen. Dadurch können Mitfahrer diesen bei Treffpunkten leichter finden, oder die Fahrt verfolgen.

## Trello
Trello ist eine webbasierte Projektmanagementsoftware. Es wurde sich gegen Jira entschieden, da der Dienst außerhalb der Universität nur über einen VPN Client zu erreichen ist und weil Jira einen wirklich umfangreichen Katalog an Funktionalität bietet, welcher der Gruppe für die Art des Projektes zu weitläufig erschien. Trello bietet grundlegend alle wichtigen Funktionalitäten (in kompakterem Umfang) an. Um den Product Backlog sinnvoll zu strukturieren, wurden (sogenannte) Karten mit allen Aufgaben erstellt. Diese umfassen unter anderem das Aufsetzen von frontend und backend, die Verbindung mit MondoDB, das Erstellen der grundlegenden Routen und das Aufsetzen der restlichen Funktionalitäten. Die Karten enthalten Checklisten mit den Unteraufgaben, die zu erledigen sind und können zeitlich eingegrenzt werden. Außerdem können die Mitglieder einfach einer Karte bzw. Aufgabe zugewiesen werden.

## UML
Um eine abstrakte Übersicht der Funktionalität zu gewährleisten, wurde ein UML Diagramm erstellt. Da kein Gruppenmitglied viel Erfahrung beim Erstellen eines solchen Diagramms aufweisen kann, hat diese Aufgabe verhältnismäßig viel Zeit innerhalb der ursprünglichen Planung eingenommen. Es wurde weiterhin ein Klassendiagramm erstellt, dass die genaue Methodik verdeutlichen soll. Gleichfalls dient es den Entwicklern als Orientierungshilfe.

### Domänendiagramm
![screenshot_Issue_2](/images/MyCargonaut_Domänendiagramm.PNG)

## Auswahl der Entwicklungsumgebung
Benötigt wird ein Frontend sowie Backend, mit einer Datenbank, in welcher die Kunden- sowie Fahrtdaten gespeichert werden können. Daher wurden verschiedene Frameworks und Services (in Kombination miteinander) getestet. In der näheren Auswahl lag Googles Firebase als Lösung für eine Realtime Database. Auch vue.js schien ein vielversprechendes Framework zu sein. Schlussendlich wurde sich jedoch für Angular JS sowie MongoDB entschieden. Der Vorteil besteht darin, dass bereits Erfahrungen in der Arbeit mit diesen Technologien besteht und so die Zeitspanne bis zur Abgabe des Projektes, mehr für die praktische Entwicklung als für die theoretische Einarbeitung genutzt werden kann. Das Backend besteht aus einem Express Server. Für die continous Integration werden Travis CI sowie Hound CI verwendet. Docker dient dem CD.

## Mockup
Im Sinne der Orientierung wurde ein Mockup der Website erstellt. So wurden sich erste Gedanken darüber gemacht, wie die Website grundsätzlich aussehen und welche Funktionalität sie genau bieten soll. Das Mockup dient so allen Entwicklern als Orientierungshilfe, da ein fester Konsens in Bezug auf das finale Layout geschaffen wurde.
![screenshot_Mockup](/images/Profilansicht.png)

### Mockup für Appansicht
Zudem wurde ein Design für die App ausgearbeitet. 
![screenshot_MockupApp](/images/Mobilemockup.png)
Das Mockup lässt sich interaktiv mit der HTML-Seite erkunden.


## Sprint_1
Entwickelt wird im Sinne von Scrum. Das Ziel des 1. Sprints, welcher bis Donnerstag den 20.12 um 8 Uhr morgens läuft, ist die Umsetzung einer grundlegenden Projekt-Infrastruktur. Der Kunde soll die Möglichkeit haben, sich einen ersten Eindruck von der Applikation verschaffen zu können. Daher soll die Applikation zum einen visuell dem Mockup entsprechen und zum anderen folgende Funktionalität aufweisen:
- der User soll sich registrieren können und auf der Website einloggen können
- der User soll eine Fahrt einstellen können
- der User soll nach einer Fahrt filtern können

Die Aufgaben werden innerhalb der Entwickler in der Gruppe verteilt. Zwar ist diese Aufteilung nicht vollkommen strikt, jedoch erhält jedes Gruppenmitglied einen Bereich, auf den es sich fokussieren kann.
