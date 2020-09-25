class Tooltip extends HTMLElement {
  constructor() {
    super();
    console.log("working");
  }
}

customElements.define("uc-tooltip", Tooltip);
