// //RESUELVE TUS EJERCICIOS AQUI
// Dog API - Quiero un perrito, pero no se qué raza escoger, ¿me ayudas?
// Utiliza la API (https://dog.ceo/dog-api/) para resolver estos ejercicios.

//  1.- Declara una funcion getAllBreeds que devuelva un array de strings con todas las razas de perro.
function getAllBreeds() {
    return fetch('https://dog.ceo/api/breeds/list/all') //atacamos la API 
        .then(response => response.json()) //pasamos la respuesta a formato JSON
        .then(data => {
            const allBreeds = []; //creamos un array vacio
            //recorremos data.message para obtener todas las razas de perro
            for (const breed in data.message) {
                allBreeds.push(breed); //añadimos cada raza al array vacío
            }
            return allBreeds;
        })
        .catch(error => console.error('Error:', error)); //si algo falla lanzamos un error    
}


//  2.- Declara una función getRandomDog que obtenga una imagen random de una raza.
function getRandomDog(){
    return fetch("https://dog.ceo/api/breeds/image/random")
    .then(response => response.json()) //pasamos la respuesta a formato JSON
    .then(data => {
        return data.message; //devolvemos la imagen random
    })
    .catch(error => console.error('Error:', error)); //si algo falla lanzamos un error
}

//  3.- Declara una función getAllImagesByBreed que obtenga todas las imágenes de la raza komondor.
function getAllImagesByBreed() {
    return fetch(`https://dog.ceo/api/breed/komondor/images`) //atacamos la API
    .then(response => response.json()) //pasamos la respuesta a formato JSON
    .then(data => {
        return data.message; //devolvemos todas las imágenes de la raza komondor
    })
    .catch(error => console.error('Error:', error)); //si algo falla lanzamos un error
}

//  4.- Declara una funcion getAllImagesByBreed2(breed) que devuelva las imágenes de la raza pasada por el argumento
function getAllImagesByBreed2(breed) {
    return fetch(`https://dog.ceo/api/breed/${breed}/images`) //atacamos la API indicando que la raza es el argumento
    .then(response => response.json()) //pasamos la respuesta a formato JSON
    .then(data => {
        return data.message; //devolvemos todas las imágenes de la raza pasada por el argumento
    })
    .catch(error => console.error('Error:', error)); //si algo falla lanzamos un error
}

// GitHub API (I) - ¿Quieres saber mi información? Aquí la tienes
//  5.- Declarara una función getGitHubUserProfile(username) que obtenga el perfil de usuario de github a partir de su nombre de usuario.
//  (https://api.github.com/users/{username}).
function getGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`) //atacamos la API
    .then(response => response.json()) //pasamos la respuesta a formato JSON
    .then(data => {
        return data;
        })
    .catch(error => console.error('Error:', error)); //si algo falla lanzamos un error
}

//  6.- Declara una función printGithubUserProfile(username) que reciba como argumento el nombre de un usuario (username), 
// retorne {img, name} y pinte la foto y el nombre en el DOM.
function printGithubUserProfile(username) {
    return axios.get(`https://api.github.com/users/${username}`)
    .then(response => {
        const img = response.data.avatar_url; //obtenemos la imagen del usuario
        const name = response.data.name; //obtenemos el nombre del usuario
        const userContainer = document.createElement('div'); //creamos un contenedor para el usuario
        const profileImg = document.createElement('img'); //creamos un elemento img para la imagen del usuario
        const profileName = document.createElement('h1'); //creamos un elemento h1 para el nombre del usuario
        profileImg.src = img; //asignamos la imagen al elemento img
        profileName.innerText = name; //asignamos el nombre al elemento h1
        userContainer.appendChild(profileImg); //añadimos la imagen al contenedor
        userContainer.appendChild(profileName); //añadimos el nombre al contenedor
        document.body.appendChild(userContainer); //añadimos el contenedor al body del documento
        return {img, name}; //devolvemos un objeto con la imagen y el nombre del usuario
    })
    .catch(error => console.error('Error:', error)); //si algo falla lanzamos un error
}

//  7. Crea una función getAndPrintGitHubUserProfile(username) que contenga una petición a la API para obtener
//  información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo, la estructura
//  debe ser exactamente la misma:

// <section>
//     <img src="url de imagen" alt="imagen de usuario">
//     <h1>Nombre de usuario</h1>
//     <p>Public repos: (número de repos)</p>
// </section>

function getAndPrintGitHubUserProfile(username) {
    return fetch(`https://api.github.com/users/${username}`) //atacamos la API
    .then(response => response.json()) //pasamos la respuesta a formato JSON
    .then(data => {
        const userImg = data.avatar_url; //obtenemos la imagen del usuario
        const userName = data.name || data.login; //obtenemos el nombre del usuario
        const publicRepos = data.public_repos; //obtenemos el número de repositorios públicos del usuario
        const userCard = document.createElement('div'); //creamos un contenedor para el usuario
        userCard.innerHTML = `
            <section>
                <img src="${userImg}" alt="${userName}">
                <h1>${userName}</h1>
                <p>Public repos: ${publicRepos}</p>
            </section>`; //creamos una tarjeta HTML con la información del usuario
        return userCard.innerHTML; //devolvemos la tarjeta HTML
    })
    .catch(error => console.error('Error:', error)); //si algo falla lanzamos un error
}

//  8.- Manipulación del DOM: Crea un input de tipo texto, y un botón buscar.
//  El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar.
//  Después llamaremos a la función getAndPrintGitHubUserProfile(username) que se ejecute cuando se pulse el botón buscar.
// (Esto no se testea).

// GitHub API (II)- Promesas, promesas y más promesas

//  9.- Dada una lista de usuarios de github guardada en una array,crea una funcion fetchGithubUsers(userNames)
//  que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.
// Objetivo: Usar Promise.all()
// Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
// Pregunta. ¿cuántas promesas tendremos?
// Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

// Pasos:

// Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
// Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
// Cuando Promise.all() haya terminado: Consigue que se imprima por consola la url del repositorio de cada usuario.
//  Consigue que se imprima por consola el nombre de cada usuario.