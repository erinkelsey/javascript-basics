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
