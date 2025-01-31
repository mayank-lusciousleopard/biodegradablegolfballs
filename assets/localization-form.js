class LocalizationForm extends HTMLElement {
  constructor() {
    super();
    this.elements = {
      button: this.querySelector('[aria-controls="CountryList"]'),
      list: this.querySelector('#CountryList'),
      arrow: this.querySelector('[aria-controls="CountryList"] span:last-child')
    };

    // Add event listeners
    this.elements.button?.addEventListener('click', this.toggleList.bind(this));
    document.addEventListener('click', this.handleClickOutside.bind(this));
    this.addEventListener('keyup', this.handleKeyboard.bind(this));
  }

  toggleList() {
    const isHidden = this.elements.list.classList.contains('hidden');
    
    if (isHidden) {
      this.showList();
    } else {
      this.hideList();
    }
  }

  showList() {
    this.elements.list.classList.remove('hidden');
    this.elements.arrow.classList.add('rotate-180');
    this.elements.button.setAttribute('aria-expanded', 'true');
  }

  hideList() {
    this.elements.list.classList.add('hidden');
    this.elements.arrow.classList.remove('rotate-180');
    this.elements.button.setAttribute('aria-expanded', 'false');
  }

  handleClickOutside(event) {
    if (!this.contains(event.target)) {
      this.hideList();
    }
  }

  handleKeyboard(event) {
    if (event.code === 'Escape') {
      this.hideList();
      this.elements.button.focus();
    }
  }
}

customElements.define('localization-form', LocalizationForm);