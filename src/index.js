import './styles.scss';
import * as images from './images';

import { Encrypter } from './modules/encrypter';

const encrypter = new Encrypter();
const text = document.querySelector('#text');
const encrypBtn = document.querySelector('.encrypt');
const decrypBtn = document.querySelector('.decrypt');
const notFoundContainer = document.querySelector('#notFound');
const resultContainer = document.querySelector('#result');
const strRegex = /^[a-z!¡¿?\s]+$/;

const showResult = (value) => {
  const children = `
    <p class="result-text">${value}</p>
    <button class="btn btn__secondary white" id="copyBtn">Copiar</button>
  `;
  resultContainer.innerHTML = children;
  notFoundContainer.classList.add('inactive');
  resultContainer.classList.remove('inactive');
}

encrypBtn.addEventListener('click', () => {
  if (!text.value || !strRegex.test(text.value)) {
    text.focus();
    return;
  }
  const encryptedText = encrypter.encryptText(text.value)
  showResult(encryptedText);
});

decrypBtn.addEventListener('click', () => {
  if (!text.value || !strRegex.test(text.value)) {
    text.focus();
    return;
  }
  const decryptedText = encrypter.decryptText(text.value);
  showResult(decryptedText);
});

resultContainer.addEventListener('click', async ({ target }) => {
  if (target.id === 'copyBtn') {
    const targetText = resultContainer.querySelector('.result-text');

    try {
      await navigator.clipboard.writeText(targetText.innerHTML);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  }
});