class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipVisible;
    this._tooltipIcon;
    this._tooltipText = "Some dummy tooltip text";
    this.attachShadow({ mode: "open" }); // Shadow DOM
    this.shadowRoot.innerHTML = `
      <style>
        div {
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 1000;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.26);
        }

        // .highlight {
        //   background-color:red;
        // }

        // ::slotted(.highlight) {
        //   border-bottom: 1px dotted red;
        // }

        // :host {
        //   background-color: blue;
        // }

        // :host(.important) {
        //   background-color: var(--color-primary, #ccc); // #ccc is default
        // }

        // :host-context(p) {
        //   font-weight: bold;
        // }

        .icon {
          background: grey;
          color: white;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }
      </style>
      <slot>Some default</slot>
      <span>?</span>
    `;
  }

  connectedCallback() {
    if (this.hasAttribute("text")) {
      this._tooltipText = this.getAttribute("text");
    }
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    this._tooltipIcon.classList.add("icon");
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );
    this.shadowRoot.appendChild(this._tooltipIcon);
    this.style.position = "relative";
  }

  attributeChangedCallback(attribute, oldVal, newVal) {
    if (oldVal === newVal) return;
    if (name === "text") {
      this._tooltipText = newVal;
    }
  }

  // cleanup event listeners
  disconnectedCallback() {
    // just example -> won't actually cleanup event listeners b/c adding with bind
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  // watch attributes/listen for changes -> must specify
  // only add what you care about
  static get observedAttributes() {
    return ["text"];
  }

  _render() {
    if (this._tooltipVisible) {
      this._tooltipContainer = document.createElement("div");
      this._tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(this._tooltipContainer);
    } else {
      if (this._tooltipContainer) {
        this.shadowRoot.removeChild(this._tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define("uc-tooltip", Tooltip);
