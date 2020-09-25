# Web Components

Custom HTML elements implemented with vanilla JavaScript.

### Custom HTML Element

- Register your own HTML tags
- Must be named [first_part_name]-[second_part_name]. Example:

      customElements.define('my-component', [class_definition]);

### Shadow DOM

- Manage a separate DOM node tree for your HTML elements (including scoped CSS styles)

### Templates & Slots

- Write HTML templates that you can add to your HTML elements

### Web Component Lifecycle

- constructor()
  - element created
  - basic initializations
- connectedCallback()
  - element attached to DOM
  - DOM initializations
- disconnectedCallback()
  - element detached from DOM
  - cleanup work
- attributeChangedCallback()
  - observed attribute updated
  - update data + DOM
