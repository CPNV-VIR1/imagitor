import './scss/main.scss';

window.onload = () => {

  const langage = navigator.language || 'fr-FR';

  document.querySelector('#form_textToImage').addEventListener('submit', async (event) => {
    event.preventDefault();
    const textToImage = document.querySelector('#textToImage').value;
    const data = { text: textToImage };

    const image = document.querySelector('#outputImage');

    await fetch('http://localhost:5000/images', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data),
    })
      .then((res) => res.text())
      .then((imagePath) => {
        const imageURL = `http://127.0.0.1:5000/images${imagePath}`;
        image.src = imageURL;
      })
      .catch((err) => console.log(err));
  });
}

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
          <img src="" alt="Image générée" id="outputImage" className="outputImage">
        </div>
  </main>
`;
