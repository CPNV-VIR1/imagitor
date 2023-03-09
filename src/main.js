import './scss/main.scss';
//import * from './helpers/function';

const URL_API = import.meta.env.Vite_API_URL;

console.log(URL_API)

document.querySelector('#app').innerHTML = `
  <header class="app__header">
    <h1>Imagitor ©</h1>
    <form>
      <select name="langage" id="langage">
        <option value="fr">Français</option>
        <option value="en">Anglais</option>
      </select>
    </form>
  </header>
  <main class="app__contain">
        <form action="" method="POST" class="app__contain__form">
          <label for="textToImage">Texte à transformer en image</label>
          <textarea name="textToImage" id="textToImage"></textarea>
          <input type="submit" value="Transformer en image">
        </form>


        <div class="app__contain__image">
          <img src="" alt="Image générée">
        </div>
  </main>
`
