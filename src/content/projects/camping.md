---
author: Johannes Häuser

title: Camping Buchungsplattform
projectSlug: camping
featured: false
ogImage: https://user-images.githubusercontent.com/53733092/215771435-25408246-2309-4f8b-a781-1f3d93bdf0ec.png
tags:
  - release
  - software
  - web
  - js
  - fullstack
  - angular
  - nodejs
  - uni
description: POC einer Buchungsplattform für Campingplätze
---

Ziel des Projektes war es grundlegende Funktionen einer Buchungsplattform für Campingplätze zu entwickeln. Das Frontend wird mit Angular und Material Design umgesetzt. Das Backend besteht aus einer Microservice-Architektur, welche auf Node.js und express basiert. Die Daten werden auf einer geteilten Postgresql-Datenbank mit Postgis gespeichert. Die einzelnen Services werden in Docker Containern ausgeführt und nutzen RESTful APIs.

Im Rahmen meiner Masterarbeit habe ich einen „Proof of concept for machine learning based dynamic pricing technologies“ konzipiert. Für diesen wurde ein zusätzlicher Microservice erstellt. Für den Zweck wurde der aktuelle Campingmarkt und vergleichbare Branchen analysiert um Einflussgrößen zu identifizieren. Aufgrund der abgeleiteten Anforderungen wurde eine Technologie ausgewählt. Aufgrund einer Datenquelle wurde ein Künstliche Neuronales Netz (KNN) in TensorFlow erstellt und mit den Daten trainiert. Das Modell kann für Vorhersagen von Preisen genutzt werden. Die Ergebnisse des KNN wurden gründlich evaluiert.
