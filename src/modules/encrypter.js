export class Encrypter {
  #keys = {
    a: "ai",
    e: "enter",
    i: "imes",
    o: "ober",
    u: "ufat"
  }
  #dKeys = {}
  
  constructor() {
    this.#init();
  }

  #init() {
    const keys = Array.from(Object.values(this.#keys));
    const values = Array.from(Object.keys(this.#keys));
    keys.forEach((key, i) => this.#dKeys[key] = values[i]);
  }

  encryptText(value) {
    const destructure = [];
    for (let i = 0; i < value.length; i++) {
      if (value[i] in this.#keys) {
        destructure.push(this.#keys[value[i]]);
        continue;
      }
      destructure.push(value[i]);
    }
    const result = destructure.join("");
    
    return result;
  }

  decryptText(value) {
    const destructure = value.split(" ");
    const keys = Array.from(Object.keys(this.#dKeys));
    destructure.forEach((word, i) => {
      keys.forEach(key => {
        let re = new RegExp(key, "g");
        word = word.replace(re, this.#dKeys[key]);
      });
      destructure[i] = word;
    });
    const result = destructure.join(" ");
    return result;
  }
}