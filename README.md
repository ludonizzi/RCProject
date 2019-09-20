# PlacesJS
L'applicazione da la possibilità, ai soli utenti registrati, di localizzarsi e cercare punti d'interesse in un range prestabilito.

## **Requisiti**
- [x] Il servizio REST implementato deve interfacciare almeno due servizi REST *esterni*, cioè non su localhost
- [x] Almeno uno dei servizi REST esterni deve essere *commerciale* (es: twitter, google, facebook, pubnub, parse, firbase etc)
- [x] Almeno uno dei servizi REST esterni deve essere acceduto con oauth
- [x] Si deve usare AMQP (RabbitMQ) (o simili es MQTT)
- [x] Si devono usare Websocket
- [x] Il progetto deve essere su GITHUB
- [x] Le API del servizio REST implementato devono essere documentate su GITHUB

## **Avvio**

- Per installare le dipendenze eseguire `npm install`, verranno lette dal file *package.json* e installate.

- Per avviare il server eseguire `node server`.

- RabbitMQ(porta 5672) e WebSocket(porta 8080) devono essere in esecuzione su _localhost_.

- La connessione a MongoDB avviene tramite mongoose.connect(mongodb+srv://Progetto_Reti:<password>@clusterproject-h6kaj.mongodb.net/test?retryWrites=true&w=majority).
  
- Per la parte asincrona eseguire `./reciever.js` nella directory rabbitMQ.

## **REST API**

- Google Api:
  - Geocode: tramite una get passando l'indirizzo del luogo richiesto ci ritorna le sue informazioni dalle quali verranno prese latitudine e longitudine.
  
  - NearbySearch: si effettua una richiesta passando latitudine, longitudine, il tipo di cosa si sta ricercando e il raggio d'interesse per trovare un insieme di luoghi di quel tipo. La ricerca può esser fatta su: 

airport   aquarium    atm   bank    bar     bus_station   cafe    cemetery    doctor    electrician   gym         hardware_store
hospital  library     liquor_store  museum  night_club    park    parking     police    post_office   restaurant  school
stadium   store       supermarket   train_station

## **OAUTH**

- Facebook Login: Implementato con Passport, richiede l'autenticazione e restituisce le informazioni base del proprio profilo(id,nome,email,photo), e queste informazioni vengono memorizzate come .json nella collection users del database.

## **Funzionalità**

- Web Socket: In `server.js` viene inizializzato il server sulla porta 8080, e si connette al proprio server. Prende il messaggio facendo il parsing JSON e lo inoltra, tramite la funzione `broadcast`, a tutti i client connessi. In `chat.ejs` viene gestito l'inivio del messaggio alla WebSocket tramite la funzione `send` e lo visualizza tramite la funzione `onmessage`. 

- RabbitMQ: In `routes.js` viene generato, per ogni get request, la connessione e creazione del canale di comunicazione con il reciever, che poi provvederà ad inviare il messaggio tramite la funzione `sendToQueue`. Il reciever, una volta avviato, riceverà sulla propria console, tutte le richieste fatte all'interno della nostra applicazione tramite la funzione `consume`. 
