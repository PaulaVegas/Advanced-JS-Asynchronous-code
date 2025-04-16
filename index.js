
// PAIR PROGRAMMING
// Ainhoa, Paula & Egoitz



// // Dog API - Quiero un perrito, pero no se qué raza escoger, ¿me ayudas?
// // Utiliza la API (https://dog.ceo/dog-api/) para resolver estos ejercicios.


// //  1.- Declara una funcion getAllBreeds que devuelva un array de strings con todas las razas de perro.
let  breeds = [];
function getAllBreeds() {
    return fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            breeds = Object.keys(data.message);
            return breeds;
        });
    }


// //  2.- Declara una función getRandomDog que obtenga una imagen random de una raza.
function getRandomDog() {
    return fetch('https://dog.ceo/api/breeds/image/random')
        .then(response => response.json())
        .then(data => {
            return data.message;
        });
}

// //  3.- Declara una función getAllImagesByBreed que obtenga todas las imágenes de la raza komondor
function getAllImagesByBreed() {
    return fetch('https://dog.ceo/api/breed/komondor/images')
        .then(response => response.json())
        .then(data => {
            return data.message;
        });
}

// //  4.- Declara una funcion getAllImagesByBreed2(breed) que devuelva las imágenes de la raza pasada por el argumento
function getAllImagesByBreed2(breed) {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`)
        .then(response => {
            return response.data.message;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
// // GitHub API (I) - ¿Quieres saber mi información? Aquí la tienes
// //  5.- Declarara una función getGitHubUserProfile(username) que obtenga el perfil de usuario de github a 
// partir de su nombre de usuario.
// //  (https://api.github.com/users/{username}).
function getGitHubUserProfile(username) {
    return axios.get(`https://api.github.com/users/${username}`) 
        .then(response => {
            return response.data; 
        })    
        .catch(error => console.error('Error:', error)); 
}

// //  6.- Declara una función printGithubUserProfile(username) que reciba como argumento el nombre de un usuario (username), 
// // retorne {img, name} y pinte la foto y el nombre en el DOM.
function printGithubUserProfile(username) {
    return axios.get(`https://api.github.com/users/${username}`)
    .then(response => {
        const img = response.data.avatar_url; 
        const name = response.data.name; 
        const userContainer = document.createElement('div');
        const profileImg = document.createElement('img'); 
        const profileName = document.createElement('h1'); 
        profileImg.src = img; 
        profileName.innerText = name; 
        userContainer.appendChild(profileImg); 
        userContainer.appendChild(profileName); 
        document.body.appendChild(userContainer);
        return {img, name}; 
    })
    .catch(error => console.error('Error:', error)); 
}

// //  7. Crea una función getAndPrintGitHubUserProfile(username) que contenga una petición a la API para obtener
// //  información de ese usuario y devuelva un string que represente una tarjeta HTML como en el ejemplo, la estructura
// //  debe ser exactamente la misma:

// // <section>
// //     <img src="url de imagen" alt="imagen de usuario">
// //     <h1>Nombre de usuario</h1>
// //     <p>Public repos: (número de repos)</p>
// // </section>
const getAndPrintGitHubUserProfile = (username) => {
    return axios.get(`https:/api.github.com/users/${username}`)
    .then((user) => {
        const { name, avatar_url: img, public_repos: publicRepos } = user.data; 

        const htmlCard = `  
                        <section>
                            <img src="${img}" alt="${name}">
                            <h1>${name}</h1>
                            <p>Public repos: ${publicRepos}</p>
                        </section>
                        `;

        return htmlCard;

    })
    .catch((err) => console.log(err))
}

// //  8.- Manipulación del DOM: Crea un input de tipo texto, y un botón buscar.
// //  El usuario escribirá en el input el nombre de usuario de GitHub que quiera buscar.
// //  Después llamaremos a la función getAndPrintGitHubUserProfile(username) que se ejecute cuando se pulse el botón buscar.
// // (Esto no se testea).
const body = document.body;

const inputText = document.createElement('input');
inputText.setAttribute('type', 'text');
inputText.setAttribute('placeholder', 'Find user...');

const btnSearch = document.createElement('button');
btnSearch.setAttribute('id', 'searchBtn');
btnSearch.textContent = 'Search'

body.appendChild(inputText);
body.appendChild(btnSearch);

btnSearch.addEventListener('click', () => {
    const inputTextValue = inputText.value
    console.log(inputTextValue)
    
    getAndPrintGitHubUserProfile(inputTextValue)
        .then((html) => {
            body.innerHTML += html;
        })
})

// // GitHub API (II)- Promesas, promesas y más promesas

// //  9.- Dada una lista de usuarios de github guardada en una array,crea una funcion fetchGithubUsers(userNames)
// //  que utilice 'https://api.github.com/users/${name}' para obtener el nombre de cada usuario.
// // Objetivo: Usar Promise.all()
// // Recordatorio: Una llamada a fetch() devuelve un objeto promesa.
// // Pregunta. ¿cuántas promesas tendremos?
// // Hasta que no se resuelvan todas las promesas desencadenadas por cada fetch(), no se cargarán los datos.

// // Pasos:

// // Mapear el array y hacer un fetch() para cada usuario. Esto nos de vuelve un array lleno de promesas.
// // Con Promise.all() harás que se tenga que resolver todo el proceso de peticiones a GitHub a la vez.
// // Cuando Promise.all() haya terminado: Consigue que se imprima por consola la url del repositorio de cada usuario.
// //  Consigue que se imprima por consola el nombre de cada usuario.
const fetchGithubUsers = (userNames) => {
    return Promise.all(userNames.map(username => {
        return axios.get(`https://api.github.com/users/${username}`)
            .then(user => user.data); 
        }))
        .then(users => {
            // Map-eamos cada usuario con el formato indicado
            return users.map(user => ({
                name: user.name,
                html_url: user.html_url
            }));
        })
        .catch(err => {
            console.error("Error fetching users with Axios:", err);
            throw err;
        });
};
