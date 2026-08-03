

# Mongofn

Una biblioteca práctica de programación funcional para usar [mongodb](https://www.npmjs.com/package/mongodb) 
de manera declarativa. 

El enfoque de la biblioteca definitivamente no es proporcionar todas las funciones que `mongodb` ofrece.
En cambio, Mongofn te proporcionará las funciones más comunes envueltas en funciones curried, 
para que puedas omitir la configuración inicial del `client` y la obtención de los objetos `db` y `collection`,
haciéndolos extremadamente reutilizables en todo tu proyecto.

Nota: Mongofn es completamente **dependiente** de la biblioteca [ramda](https://github.com/ramda/ramda) para
proporcionar un estilo de programación funcional para mongodb.

## ¿Por qué Mongofn?

Es simple y extensible gracias al poder del paradigma de programación funcional.
Dado que la mayoría de las funciones proporcionadas son funciones curried, 
puedes beneficiarte recomponiendo tus implementaciones con diferentes combinaciones de
argumentos de funciones según lo necesites.

Consulta [esto](https://fr.umio.us/favoring-curry/) para obtener más información sobre el currying.

## ¿Cuál es la diferencia?

Realizando una operación de lectura simple utilizando el conector original de `mongodb`:

```js
// simple usage from official MongoDb Docs

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});
```

Para poder reutilizar este fragmento de código, es posible que estés almacenando la instancia del cliente
en algún lugar y accediendo a él desde otro punto de tu proyecto, pero sigue siendo un enfoque imperativo. Además, es posible que tengas que implementar tus propias funciones reutilizables.

Mongofn proporciona esta reutilización de forma nativa. Aquí tienes un ejemplo de uso de colección en Mongofn:

```js
const { useCollection } = require('mongofn');

// Connection URL
const connectionString = 'mongodb://localhost:27017';

const useMainDb = useCollection(connectionString, 'mainDb');

const categoriesCol = useMainDb('collections')
    .then(collection => collection.find({}).toArray());
const articlesCol = useMainDb('articles')
    .then(collection => collection.find({}).toArray());

// or you can go little further
const connectionString = 'mongodb://localhost:27017';

const findInMaindDbBy = findBy(connectionString, 'mainDb');
const findInCategoriesBy = findInMaindDbBy('categories');
findInCategoriesBy({ name: 'some Categery' }).then(console.log);
findInCategoriesBy({ description: 'some Categery description' }).then(console.log);
```

Es más simple y reutilizable. Cuando pasas la url como primer argumento a `useCollection` o cualquier otra función,
y si no proporcionas todos los parámetros, mantiene las opciones de conexión dadas en su ámbito;
una vez que proporcionas todos los parámetros, finalmente envía tu solicitud conectándose primero a 
la instancia de MongoDB y finaliza tu operación real en esa instancia de MongoDB.

Este enfoque particular se aplica a todas las demás funciones curried dentro de Mongofn.

## TODO

- Implementar findAndModify
- Implementar insertOne
- Implementar updateOne
- Pruebas
- Eventualmente, eliminar la dependencia de `ramda` del paquete


## Instalación


```sh
# Using npm
npm install --save mongofn

# Using yarn
yarn add mongofn
```

## Uso

Mongofn esencialmente te proporciona algunas funciones útiles para conectar un cliente de MongoDB,
y realizar las operaciones más utilizadas en una instancia de MongoDB, incluidas las operaciones CRUD. 

Además, Mongofn proporciona las funciones `useDb` y `useCollection`
que simplemente te entregan los objetos `Db` y `Collection` originales de `mongodb`,
permitiéndote realizar libremente todas las operaciones de `mongodb`.

Todas las funciones son funciones curried. Por lo tanto, puedes aprovechar su beneficio y construir
tus propias funciones de operaciones CRUD implementando parcialmente las funciones de Mongofn y reutilizándolas
en toda la aplicación.

A continuación, se muestra un ejemplo de cómo escribir un conjunto de funciones baseRepository que puedes reutilizar
en otras partes de tu aplicación, por ejemplo, en un categoriesRepository, como se muestra a continuación:

```js
// baseRepository.js
import {
  useDb,
  useCollection,
  findBy,
  findAll,
  findById,
  findByObjectId,
  upsert,
} from 'mongofn';
import {
  pipe, reduce, split, tail, toUpper, toLower, head, replace,
} from 'ramda';

const connectionString = process.env.MONGO_URI;
const databaseName = process.env.MAIN_DB;

export const useDbInMainDb = () => useDb(connectionString, databaseName);
export const useCollectionInMainDb = useCollection(connectionString, databaseName);
export const findInMainDbBy = findBy(connectionString, databaseName);
export const findAllInMainDb = findAll(connectionString, databaseName);
export const findInMainDbById = findById(connectionString, databaseName);
export const findInMainDbByObjectId = findByObjectId(connectionString, databaseName);
export const upsertInMainDb = upsert(connectionString, databaseName);


// categoriesRepository.js
import { toDoc, toModel } from 'mongofn';

import processPredicate from './helpers/processPredicate';

const collectionName = 'categories';

export const allCategories = () => findAllInMainDb(collectionName).then(toModel);
export const categoriesBy = (predicate) => {
  const processedPredicate = processPredicate(predicate);
  return findInMainDbBy(collectionName, processedPredicate).then(toModel)
};
export const categoriesById = (id) => findInMainDbById(collectionName, id).then(toModel);
export const saveCategory = (contentType) => upsertInMainDb(collectionName, toDoc(contentType)).then(toModel);
``` 

Con este enfoque, ahora puedes requerir y usar solo las funciones/funcionalidades
que necesites en tus implementaciones de repositorio particulares.

## API

### createClient

Antes de poder realizar operaciones en una instancia de MongoDB, primero necesitamos conectarnos a ella.
Para conectar una instancia de MongoDB, puedes usar la función `createClient`.

```js
const { createClient } = require('mongofn');

const connectionString = 'mongodb://root:rootpassword@localhost:27017';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Connect to given MongoDB instance and return a Promise<MongoClient>
// which you can do any configuration mongodb provides
createClient(connectionString, options).then(client => {
  const db = client.db('dbName');
  const collection = db.collection('collectionName');

  return collection.find({}).toArray();
}).then(console.log);

```

#### Memorización
Existe otra función que puedes usar para conectarte a una instancia de MongoDB: `useMemoziedClient`.
Esta función está memorizada, por lo que devolverá la misma instancia si la llamas con 
los mismos argumentos.

Para más información, consulta [memoizeWith](https://ramdajs.com/docs/#memoizeWith) 
y [Memoización (1D, 2D y 3D)](https://www.geeksforgeeks.org/memoization-1d-2d-and-3d/)

### useDb y useCollection

En `mongodb`, comenzamos con el cliente de conexión y pasamos una función callback para realizar
operaciones sobre la instancia de `mongodb` conectada. Es una forma repetitiva y muy imperativa de
usar mongodb. En Mongofn, puedes usar las funciones `useDb` y `useCollection`, que
aceptan `client` como primer argumento, para realizar todo tipo de operaciones de `Db` y `Collection` 
de manera declarativa.

```js
// useMainDb.js
const { useDb } = require('mongofn');

const connectionString = 'mongodb://localhost:27017';

export const useMainDb = () => useDb(connectionString, 'mainDb');

// someOther.js
const { useMainDb } = require('./useMainDb');

useMainDb().then(console.log); // Original Db object of mongodb

```

A continuación, se muestra un ejemplo de cómo obtener todos los datos que contiene una colección.

```js
const { useCollection } = require('mongofn');

const connectionString = 'mongodb://localhost:27017';

useCollection(connectionString, 'mainDb', 'someCollection')
    .then(collection => {
            return collection.find({}).toArray(); // retrieve all
        }
    )
    .then(console.log);
```

Dado que utiliza el objeto `Collection` original de `mongodb`, simplemente
puedes hacer lo que quieras de todo lo que `mongodb` proporciona.

Si queremos que sea reutilizable en toda nuestra aplicación, podemos beneficiarnos
del currying.

Como mencionamos antes, la mayoría de las funciones están curried en Mongofn.

Hagamos un ejemplo y compoñamos una función que te ayudará a usar colecciones
en una db sin repetir código para la configuración.

```js
const { useCollection } = require('mongofn');

const connectionString = 'mongodb://localhost:27017';

// Here we do not pass the last argument so that it will return another
// function which accepts only collectionName argument
const useCollectionInMainDb = useCollection(connectionString, 'mainDb');

useCollectionInMainDb('categories').then(console.log);
useCollectionInMainDb('articles').then(console.log);
useCollectionInMainDb('users').then(console.log);
```

### Objeto __

Antes de darte más información sobre las operaciones CRUD en Mongofn, necesitamos entender
un objeto crucial: `__`. Es un marcador de posición especial que puedes usar en funciones curried
para poder recomponer tu función, permitiendo la aplicación parcial de cualquier combinación
de argumentos, independientemente de sus posiciones.
 
```js
const { useCollection } = require('mongofn');

const connectionString = 'mongodb://localhost:27017';

const useCategoriesIn = useCollection(connectionString, __, 'categories');

useCategoriesIn('mainDb').then(console.log);
useCategoriesIn('otherDb').then(console.log);
```

Como habrás notado, después de pasar el objeto `__` a useCollection como argumento `dbName`,
`useCollection` devuelve otra función a la que puedes pasar cualquier `dbName` que necesites, para así
reutilizar el resto de la configuración de la función. Esto es útil principalmente en operaciones CRUD, ya que
esperan más parámetros de tu parte para realizar ciertas operaciones.

### Uso de findBy, findAll, findById y findByObjectId

Las funciones `useDb` y `useCollection` proporcionan toda la capacidad de
usar los objetos `Db` y `Collection` originales de `mongodb` de manera funcional.
Sin embargo, tendemos a usar `mongodb` principalmente para operaciones CRUD.

Mongofn proporciona las siguientes funciones para operaciones de búsqueda:
- `findBy(client, dbName, collectionName, predicate) : Promise<Array>`
    - Acepta un objeto predicate tal como se documenta 
    [aquí](http://mongodb.github.io/node-mongodb-native/3.5/reference/ecmascriptnext/crud/#read-methods)
    y devuelve un `Promise<Array>`.
- `findAll(client, dbName, collectionName) : Promise<Array>`
    - No necesita ningún argumento específico adicional. 
    Simplemente devuelve todos los datos en la colección dada como: `Promise<Array>`
- `findById(client, dbName, collectionName, id) : Promise<object>`
    - Acepta el valor `id` para buscar el `Document` con el `id` dado en la 
    colección especificada, y devuelve `Promise<object>`.
- `findByObjectId(client, dbName, collectionName, id) : Promise<object>`
    - Es una función envoltura de `findById` para ahorrarte pasar repetidamente
    tu valor de id en una instancia de `ObjectId`.

Nota: las operaciones `find` también aceptan `Array` como último argumento, donde
el primer elemento es el `predicate` y el segundo elemento son las
`options` que se pasarán a la operación correspondiente de `mongodb`.
  
Todas las funciones de operaciones CRUD están curried, por lo que puedes usarlas libremente como
usamos las funciones `useDb` y `useCollection`.

A continuación, se muestran algunos ejemplos de uso.

```js
// findBy example
const { createClient, findBy, __ } = require('mongofn');

const connectionString = 'mongodb://localhost:27017';

const findInMaindDbBy = findBy(connectionString, 'mainDb');

findInMaindDbBy('categories', { name: 'some Categery' }).then(console.log);
// You can pass options as well if you prefer passing an array
findInMaindDbBy(
  'articles', [
    { name: 'some Article' },
    { projection: { _id: 0, name: 1 }}
  ]).then(console.log); // projected result

const findInCategoriesBy = findInMaindDbBy('categories');
findInCategoriesBy({ name: 'some Categery' }).then(console.log);
findInCategoriesBy({ description: 'some Categery description' }).then(console.log);

// Say we have multiple replica client
const client1 = createClient(connectionString, options);
const client2 = createClient(connectionString, options);

const findInMainDbUsing = findBy(__, 'mainDb');
const findInCategoriesUsing = (__, 'categories');

findInCategoriesUsing(client1, { name: 'some Categery' }).then(console.log);
findInCategoriesUsing(client2, { name: 'some Categery' }).then(console.log);

findInMainDbUsing(client1, 'users', { name: 'some User name' }).then(console.log);
findInMainDbUsing(client2, 'users', { name: 'some User name' }).then(console.log);

// You can think of all combinations you need. 
```
