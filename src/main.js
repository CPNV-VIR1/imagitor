import './scss/main.scss';
//import * from './helpers/function';

const URL_API = import.meta.env.VITE_API_URL;

window.onload = () => {
  document.querySelector('#form_textToImage').addEventListener('submit', (event) => {
    event.preventDefault();
    const textToImage = document.querySelector('#textToImage').value;

    const data = {
      textToImage,
    };

    console.log(URL_API)
    
    fetch(`${URL_API}/image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {image: JSON.stringify(data)},
    })
      .then((res) => res.json())
      .then((data) => {
        image.src = data.image;
      })
      .catch((err) => console.log(err));

  });
};

document.querySelector('#app').innerHTML = `
  <header class="app__header">
    <h1>Imagitor ©</h1>
    <form id="form_langage">
      <select name="langage" id="langage">
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>
    </form>
  </header>
  <main class="app__contain">
        <form method="POST" class="app__contain__form" id="form_textToImage">
          <label for="textToImage">Texte à transformer en image</label>
          <textarea name="textToImage" id="textToImage"></textarea>
          <input type="submit" value="Transformer en image">
        </form>

        <div class="app__contain__image">
          <img src="" alt="Image générée">
        </div>
  </main>
`
