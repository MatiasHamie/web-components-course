class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipIcon;
    this._tooltipVisible = false;
    this._tooltipText = "Some default text";

    // habilitamos el shadowDOM asi
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        div {
          font-weight: normal;
          background-color: black;
          color: white;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          padding: 0.15rem;
          border-radius: 3px;
          box-shadow: 1px 1px 6px rgba(0,0,0,0.26)
        }
        
        /* Para estilar slots, tenemos q usar:
            ::slotted(*){} TODOS LOS SLOTS
            ::slotted(.unaClase){}
            ::slotted(span){}
            ::slotted(span a){} NO FUNCIONA

            OJO que la especificidad del ::slotted puede ser reemplazada
            por estilos comunes dentro del DOM comun

            OJO SOLO SE PUEDE ESTILAR EL SLOTTED directo NO anidado
        */
        ::slotted(.highlight) {
          border-bottom: 1px dotted red;
        }

        .icon {
          background: black;
          color: white;
          padding: 0.15rem 0.5rem;
          text-align: center;
          border-radius: 50%;
        }
        /*
          OJO que la especificidad del ::slotted puede ser reemplazada
          por estilos comunes dentro del DOM comun

          OJO ::host.algunaClase{} no funciona
          ::host(.algunaClase){} si

          Las variables de css del light DOM pueden ser accedidas
          dentro del webcomponent

          var(--nombre-variable, #ccc (alguncolor por si no existe esa variable))
        */
        :host {
          position: relative;
        }

        :host(.important) {
          background: var(--color-primary, #ccc);
          padding: 0.15rem;
        }

        /*
          Esto sirve para estilar el wc cuando esta wrappeado por algo
          que especificamos con un selector comun (por ej: p .unaClase > h1)

          en este caso, en el html, un wc esta asi
          <p>
            <uc-tooltip></uc-tooltip>
          </p>
        */
        :host-context(p) {
          font-weight: bold;
        }
      </style>
      <slot>Slot default text</slot>
      <span class="icon">?</span>
    `;
  }

  // simil al mounted(), recien aca esta agregado al DOM
  connectedCallback() {
    // con el hasAttribute('nombre del atributo'), chequeamos si desde el html
    // estamos pasando un valor por <uc-tooltip text="algun texto"></uc-tooltip>
    if (this.hasAttribute("text")) {
      // en ese caso, hacemos un get de ese valor q estan pasandonos desde el html
      // y se lo asignamos a una variable
      this._tooltipText = this.getAttribute("text");
    }
    this._tooltipIcon = this.shadowRoot.querySelector("span");
    // con el metodo .bind, le paso el contexto del 'this' a la funcion
    this._tooltipIcon.addEventListener(
      "mouseenter",
      this._showTooltip.bind(this)
    );
    this._tooltipIcon.addEventListener(
      "mouseleave",
      this._hideTooltip.bind(this)
    );

    // OJO: con el shadowDOM activo, este ejemplo no funciona mas, ya que ahora existe un shadowDOM
    // que fue habilitado con this.attachShadow({mode: 'open'})
    // this.appendChild(tooltipIcon) intentaria appendear al HTMLElement pero ese elemento es
    // parte del DOM original padre, ahora debemos hacer:
    // this.shadowRoot.appendChild(tooltipIcon);
    this._render();
  }

  // esta funcion automaticamente recibe los 3 valores de un attr
  // retornado por observedAttributes
  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
    if (oldValue === newValue) {
      return;
    }
    if (name === "text") {
      this._tooltipText = newValue;
    }
  }

  // aca retornamos los atributos que queremos q sean escuchados por el
  // WC y el attributeChangedCallback
  static get observedAttributes() {
    return ["text"];
  }

  // cleanup, es cuando se quita al elemento del dom
  disconnectedCallback() {
    console.log("disconnected");
    this._tooltipIcon.removeEventListener("mouseenter", this._showTooltip);
    this._tooltipIcon.removeEventListener("mouseleave", this._hideTooltip);
  }

  _render() {
    let tooltipContainer = this.shadowRoot.querySelector("div");
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement("div");
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer);
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

// customElements: objeto q permite registrar nuestros propios elementos html
// TODOS LOS CUSTOM ELEMENTS tienen q tener minimo 2 palabras separadas por 1 guion medio
// en este caso use 'uc' q significa udemy course (cualquier cosa es valida)
// Lo que hacemos aca es unir un nombre random con una clase para ser usada con ese string en el html
customElements.define("uc-tooltip", Tooltip);
