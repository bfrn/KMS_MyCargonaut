# Doku

## Aufgabenstellung
Die Aufgabenstellung beinhaltet das Entwickeln einer Applikation in Form einer Plattform, über die sich Nutzer austauschen können, die eine Transportmöglichkeit für ihre Fracht suchen oder Fahrer, welche solch eine Fahrt anbieten. „MyCargonaut“ ähnelt von der Funktionalität einem Car-sharing Dienst, nur dass der Nutzer nicht selber das Fahrzeug fährt, sondern die gewünschte Fracht an einen Fahrer übergibt. Den Transport übernimmt somit die andere Partei. Sofern gewünscht, und bei genügend Platz im Fahrzeug, kann der Fahrt-Suchende auch am Transport teilnehmen. Die Applikation soll grundlegend einige Funktionen besitzen, wie das Suchen und Filtern nach Fahrten, das Anbieten eigener Fahrten sowie gegenseitiger Bewertungen. Besondere Features bestehen unter anderem durch die Möglichkeit für den Fahrer, seinen Standort zu teilen. Dadurch können Mitfahrer diesen bei Treffpunkten leichter finden, oder die Fahrt verfolgen.

## Trello
Trello ist eine webbasierte Projektmanagementsoftware. Es wurde sich gegen Jira entschieden, da der Dienst außerhalb der Universität nur über einen VPN Client zu erreichen ist und weil Jira einen wirklich umfangreichen Katalog an Funktionalität bietet, welcher der Gruppe für die Art des Projektes zu weitläufig erschien. Trello bietet grundlegend alle wichtigen Funktionalitäten (in kompakterem Umfang) an. Um den Product Backlog sinnvoll zu strukturieren, wurden (sogenannte) Karten mit allen Aufgaben erstellt. Diese umfassen unter anderem das Aufsetzen von frontend und backend, die Verbindung mit MondoDB, das Erstellen der grundlegenden Routen und das Aufsetzen der restlichen Funktionalitäten. Die Karten enthalten Checklisten mit den Unteraufgaben, die zu erledigen sind und können zeitlich eingegrenzt werden. Außerdem können die Mitglieder einfach einer Karte bzw. Aufgabe zugewiesen werden.

## UML
Um eine abstrakte Übersicht der Funktionalität zu gewährleisten, wurde ein UML Diagramm erstellt. Da kein Gruppenmitglied viel Erfahrung beim Erstellen eines solchen Diagramms aufweisen kann, hat diese Aufgabe verhältnismäßig viel Zeit innerhalb der ursprünglichen Planung eingenommen. Es wurde weiterhin ein Klassendiagramm erstellt, dass die genaue Methodik verdeutlichen soll. Gleichfalls dient es den Entwicklern als Orientierungshilfe.

### Domänendiagramm
![Domänendiagramm](/images/Domaenendiagramm.PNG)

### Klassendiagramm
[![Klassendiagramm](/images/class-diagramm.PNG)](https://raw.githubusercontent.com/Bfrn/KMS_MyCargonaut/Doku/images/class-diagramm.PNG)

## Auswahl der Entwicklungsumgebung
Benötigt wird ein Frontend sowie Backend, mit einer Datenbank, in welcher die Kunden- sowie Fahrtdaten gespeichert werden können. Daher wurden verschiedene Frameworks und Services (in Kombination miteinander) getestet. In der näheren Auswahl lag Googles Firebase als Lösung für eine Realtime Database. Auch vue.js schien ein vielversprechendes Framework zu sein. Schlussendlich wurde sich jedoch für Angular JS sowie MongoDB entschieden. Der Vorteil besteht darin, dass bereits Erfahrungen in der Arbeit mit diesen Technologien besteht und so die Zeitspanne bis zur Abgabe des Projektes, mehr für die praktische Entwicklung als für die theoretische Einarbeitung genutzt werden kann. Das Backend besteht aus einem Express Server. Für die continous Integration werden Travis CI sowie Hound CI verwendet. Docker dient dem CD.

## Mockup
Im Sinne der Orientierung wurde ein Mockup der Website erstellt. So wurden sich erste Gedanken darüber gemacht, wie die Website grundsätzlich aussehen und welche Funktionalität sie genau bieten soll. Das Mockup dient so allen Entwicklern als Orientierungshilfe, da ein fester Konsens in Bezug auf das finale Layout geschaffen wurde.

![screenshot_Mockup](/images/Profilansicht.png)

### Mockup für Appansicht
Es wurde für die mobile Ansicht der App ein Mockup erarbeitet, was folgende Ansichten enthält: 
- Login-Screen
- Nutzerprofil (Eigenansicht)
- Die Formulare zum Erstellen eines Fahrangebots
- Die Formulare zum Buchen eines Fahrangebots
- Nutzerbewertungen

Bei der Erstellung des Mockups wurde sich an dem Mockup der Website orientiert, sodass sich ein einheitliches Bild in der Darstellung der Applikation ergibt.

Das Mockup lässt sich interaktiv mit der [HTML-Seite](https://github.com/Bfrn/KMS_MyCargonaut/tree/Doku/Mobile_Mockup) erkunden oder die [PDF-Datei](/Mobile_Mockup/Mobilemockup.pdf) gibt auch eine Übersicht zu den einzelnen Ansichten des Mockups.

![screenshot_MockupApp](/images/Mobilemockup.png)

## OWASP Top 10

### Injection
Da wir für die aktuell implementierten Routen ausschließlich Schemas von Mongoose verwenden, werden einfach Injection-Angriffe abgewehrt. Den die vom Angreifer gesendeten Queries, werden in die Datentyp des jeweiligen Feldes umgewandelt.

Um dies zu überprüfen haben wir eine Anfrage aufgesetzt die ein Query enthält, das auf die auf die Daten des ersten gespeicherten Users zugreifen soll.
![owasp_1_2](/images/OWASP_1_2.PNG)
Jedoch schlägt diese Anfrage fehl, da ;Mongoose keinen User mit dem Namen `{$gt:""}` finden kann. Denn das vom Angreifer gesendete Query wird zunächst escaped und dann in einen String umgewandelt, da im Schema des Users die Attribute username und password als Strings definiert sind.

![owasp_1_2](/images/OWASP_1_1.PNG)

### Broken Authentication
**TODO**
### Sensitive Data Exposure
Derzeitig verschlüsseln wir wichtige Daten, wie Passwörter mithilfe von Bcrypt innerhalb unserer Datenbank. Diese Methode ist relativ sicher, und sie beugt Brute-Force- und Dictionary-Attacken vor.

Bei der Übertragung von Daten besteht derzeit noch eine starke Sicherheitslücke, da wir alle Daten mithilfe von Http in Klartext übertragen.

### XML External Entities (XXE)
Dieses Risiko stellt für unsere Applikation keine Gefahr da, denn wir verwenden in keiner Form das XML Datenformat oder das SOAP-Protokoll.

### Broken Access Control
**TODO**
### Security Misconfiguration
Bei den von uns verwendeten Frameworks, haben wir keine eigene Konfiguration der Sicherheitseinstellungen vorgenommen und wir filtern auch nicht die Error-Nachrichten, die wir an den Client senden. Jedoch enthält die Applikation keine vor angelegten Accounts und es werden nur die Ports verwendet, die auch wirklich benötigt werden.

### Cross-Site Scripting (XSS)
In unserer Applikation findet  durch Angular eine Vorbeugung von XSS statt. Denn das Framework betrachtet alle Daten, die in den DOM eingefügt werden als potenziell gefährlich und säubert bzw. escaped diese Werte. Jedoch werden sonst keine Maßnahmen von uns ergriffen um XSS vorzubeugen.

### Insecure Deserialization
Wir überprüfen derzeit nicht die Integrität der von uns verarbeiteten Usereingaben. Der User hat bei seinen Eingaben lediglich die Regeln für den MongoDB-Datentyp einzuhalten, welchen wir zuvor für das jeweilige Attribut festgelegt haben.

### Using Components with Known Vulnerabilities
Zum Stand des sechsten Januars 2019 wird durch die Verwendung des `@angualar-devkit/build-anuglar` Pakets eine Sicherheitsverletzung in unserer Software hervorgerufen.

![owasp_9_1](/images/OWASP_9_1.PNG)

Dieses Problem wird auch im folgendem [Git-Hub Issue](https://github.com/angular/angular-cli/issues/13342) diskutiert und es wurde bereits ein [Pull-Request](https://github.com/angular/angular-cli/pull/13347) gestellt, welcher dieses Problem mit dem Erscheinen des nächsten Patches für die angular-cli beheben sollte.

Wir konnten ansonsten keine weiteren Sicherheitslücken bei den von uns verwendeten Softwarepaketen entdecken. Jedoch besteht immer noch die Möglichkeit, dass zukünftig entdeckte Sicherheitslücken, bei den von uns verwendeten Software-Dependencies, in unsere Applikation ausgenutzt werden. Denn wir verfügen aktuell über keine automatische Sicherheitsüberprüfungen unserer  Software-Dependencies.

### Insufficient Logging & Monitoring
Derzeit wird in unserer Applikation kein Logging statt, wie z.B. von Fehlern oder fehlgeschlagenen Logins. Daher besteht hier ein Risiko, wodurch sich Angreifer Zugang zu sensiblen Daten verschaffen könnte.

## Sprint_1
Entwickelt wird im Sinne von Scrum. Das Ziel des 1. Sprints, welcher bis Donnerstag den 20.12 um 8 Uhr morgens läuft, ist die Umsetzung einer grundlegenden Projekt-Infrastruktur. Der Kunde soll die Möglichkeit haben, sich einen ersten Eindruck von der Applikation verschaffen zu können. Daher soll die Applikation zum einen visuell dem Mockup entsprechen und zum anderen folgende Funktionalität aufweisen:
- der User soll sich registrieren können und auf der Website einloggen können
- der User soll eine Fahrt einstellen können
- der User soll nach einer Fahrt filtern können

Die Aufgaben werden innerhalb der Entwickler in der Gruppe verteilt. Zwar ist diese Aufteilung nicht vollkommen strikt, jedoch erhält jedes Gruppenmitglied einen Bereich, auf den es sich fokussieren kann.

### Sprint_1 Backend

Das Backend wurde in Typescript umgeschrieben. Ziel war es die interne Qualität des Backend zu steigern. Zudem wurden *DrivingOffers* und *User* nach Klassendiagramm umgesetzt und es wurden für sie die  Create,Delete und Get Routen implementiert.

Dazu wurden zunächst die Schemas für MongoDB angelegt, welche die Klassen aus dem Klassendiagramm abbilden. Die Implementierung dazu verlief sehr reibungslos, so war es unteranderem möglich mithilfe von [Discriminatorn](https://mongoosejs.com/docs/discriminators.html) die Vereerbungsstruktur zwischen Fahrt und Fahrtangebot darzustellen.
Jedoch hat sich im Laufe der Entwicklung das Problem ergeben, dass die Änderung im Code nicht mehr beim starten des Servers übernommen wurden, jedoch bei den Unit-Tests ist dieses Verhalten nicht aufgetreten. Dieses Problem konnte nach sehr vielen Stunden der Fehlersuche damit behoben werden, dass man die Datei zum starten des Servers (index.ts) in den Elternordner von `src` verschoben hat. Jedoch ließ sich nicht der genaue Grund für dieses Verhalten ermitteln. 

Außerdem wurden im Backend Unit-Tests implementiert, um die Funktionen während der Entwicklung im Backend testen zu können. Die Unit Tests wurden mit Hilfe von TypeScript Test Frameworks [Chai](https://www.chaijs.com/plugins/chai-http/) und Mocha umgesetzt und überprüfen, die implementierten Http-Requests die erwarteten Ergebnisse zurückliefern.

### Sprint_1 Frontend

In der Frontend-Entwicklung wurde die Design-Entwicklung hauptsächlich nach dem vorher entwickelten Mockup orientiert. Die folgende Darstellung gilt als Prototyp, um dem Kunde eine Überblick auf den Produkt zu verschaffen. Im Frontend-Prototyp wurden die Hauptfunktionalitäten der Seite für die Nutzersicht dargestellt, dazu gehören Registrierungsvorgang und Login.

### Review & Retrospective Sprint_1

Einige unserer definierten Ziele konnten nicht im ersten Sprint umgesetzt werden. Der organisatorische Aspekt wurde oft aufgeschoben. Die Kommunikation innerhalb der Gruppe war sehr gut. Es entstanden oft konstruktive Diskussionen.

## Sprint_2

Die grundlegenden Schemata der Datenverwaltung wurden nach Klassendiagramms implementiert. Das Backend verfügt über CRUD-Funktionalitäten im Bezug auf den Benutzer. Ausserdem diverse Möglichkeiten Buchungsdaten und Fahrgesuch bzw. Fahrangebot zu verwalten.

Das Routing fasst die Funktionalitäten des Backend zusammen:

```
//user-routing

    app.route('/api/users')
      .get(userController.get_users);

    app.route('/api/users/login')
      .post(userController.login);

    app.route('/api/users/register')
      .post(userController.create_user);
      
    app.route('/api/users/:userId')
      .get(userController.get_user_by_id)
      .put(userController.update_user_by_id)
      .delete(userController.delete_user_by_id);
        
//driving-offer routing
    app.route('/api/users/:userId/drivingOffers')
      .get(drivingOfferController.get_drivingOffers)
      .post(drivingOfferController.create_drivingOffer);    

//driving-request routing
    app.route('/api/users/:userId/drivingRequests')
      .get(drivingRequestController.get_drivingRequests)
      .post(drivingRequestController.create_drivingRequest);

//booking-request routing
    app.route('/api/bookings')
      .post(bookingController.create_booking);
    app.route('/api/bookings/:bookingId')
      .get(bookingController.get_booking_by_id) 

``` 

Das Frontend ist in der Lage den Login anzusprechen. Auch eine Registrierung ist möglich. Diese Registrierung erfragt alle nötigen Informationen und speichert diese in die Datenbank. Das Password wird dabei verschlüsselt. Der Login kann diese Verschlüsselung behandeln. 


### Review & Retrospective Sprint_2
