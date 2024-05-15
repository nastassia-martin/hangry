# Hangry
This is a group assignment built by  [Linnea Saxvik](https://github.com/saxvik), [Marcus Birgersson](https://github.com/Mabi-xD), [Louise Keinström](https://github.com/louisekeinstrom) and [Nastassia Martin](https://github.com/nastassia-martin).

## About
Hangry is an web app designed to feed you! As a user you can search based on your location for delicious approved eats around you. All spots on the app has been approved by the super admins listed above. As a user you can request to become an admin.

## Features
users can:
- see their GPS position on the map (if permission is provided)
- view and search for restaurants based on their current location
- look up details for that restuarant and get directions from their location
- filter restaurants by type
- can search for a city with autocomplete
- can send in a tip about a restuarant

admins can:
- perform CRUD (create, read, update and delete) operations on a restaurant
- perform CRUD operations on tips
- view a list of all admins

## Tech Stack
- react
- axios
- firebase
- react hook forms
- react router
- google maps api
- tanstack table

## Setup
1. Clone the project and `cd` in to the project.
2. Run `npm install`.
3. You will need to configure [firebase](https://firebase.google.com) and get an API key from [googlemaps](https://developers.google.com/maps).
4. Run `npm run dev`
