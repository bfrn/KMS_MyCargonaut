[![Build Status](https://travis-ci.org/Bfrn/KMS_MyCargonaut.svg?branch=node_docker_scratch)](https://travis-ci.org/Bfrn/KMS_MyCargonaut)

# Node-Express Server
Der Server bietet einfache CRUD Funktionalitäten.
Aktuell gibt es nur User die als Daten behandelt werden.

## User
User bestehen aus:
    - username
    - password
User werden mittels mongoose als schema definiert und können erstellt, geändert, gelöscht oder gelesen werden. Dies geschieht über die Kommunikation mit der MongoDB


# Entwicklungsnotizen:

Design Pattern des Server: [MVC](https://de.wikipedia.org/wiki/Model_View_Controller)
