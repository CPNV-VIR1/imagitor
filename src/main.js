import './scss/main.scss';

const loadLanguageFile = async (lang) => {
  const response = await fetch(`./languages/${lang}.json`);
  const data = await response.json();
  return data;
};

const updateTexts = (translations) => {
  document.querySelector('h1').textContent = translations.header.title;
  document.querySelector('label[for="textToImage"]').textContent = translations.form.label;
  document.querySelector('input[type="submit"]').value = translations.form.submit;
};

window.onload = async () => {
  const lang = navigator.language || "fr-FR";
  const translations = await loadLanguageFile(lang);
  updateTexts(translations);

  document.querySelector('#form_langage').addEventListener('change', async (event) => {
    const selectedLang = event.target.value;
    const newTranslations = await loadLanguageFile(selectedLang);
    updateTexts(newTranslations);
  });

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
    <h1 id="TitleWebsite">Imagitor ©</h1>
    <form id="form_langage">
      <select name="langage" id="langage">
        <option value="fr-FR">Français</option>
        <option value="en-US">Anglais</option>
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
          <img src="" id="outputImage" className="outputImage">
        </div>
  </main>
`;
