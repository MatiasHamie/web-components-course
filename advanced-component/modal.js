class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpened = false;
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        #backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(0,0,0,0.75);
          opacity: 0;
          pointer-events: none;
        }

        :host([opened]) #backdrop, 
        :host([opened]) #modal{
          opacity: 1;
          pointer-events: all;
        }

        #modal{
          position: fixed;
          top: 15vh;
          left: 25%;
          width: 50%;
          z-index: 100;
          background: white;
          border-radius: 3px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.26);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          pointer-events: none;
        }

        header{
          padding: 1rem;
        }
  
        ::slotted(h1){
          font-size: 1.25rem
        }

        #main{
          padding: 1rem;
        }

        #actions{
          border-top: 1px solid gray;
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
        }

        #actions button{
          margin: 0 0.25rem;
        }
      </style>
      <div id="backdrop"></div>
      <div id="modal">
        <header>
         <slot name="title">Default slot text</slot>
        </header>
        <section id="main">
          <slot></slot>
        </section>
        <section id="actions">
          <button>Cancel</button>
          <button>Ok</button>
        </section>
      </div>
    `;
    // Cosa q se puede hacer: escuchamos cuando cambia el contenido del slot
    const slots = this.shadowRoot.querySelectorAll("slot");
    slots[1].addEventListener("slotchange", (event) => {
      // con slots[x].assignedNodes(); podemos acceder al array de los elementos html
      // que fueron pasados por el slot
      console.dir(slots[1].assignedNodes());
    });
  }
  // con esto en el style edito el host cuando tenga el attr opened truthy
  // :host([opened]) #backdrop,
  // :host([opened]) #modal{
  //   opacity: 1;
  //   pointer-events: all;
  // }
  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute("opened")) {
      this.isOpened = true;
    } else {
      this.isOpened = false;
    }
  }

  static get observedAttributes() {
    return ["opened"];
  }

  open() {
    this.setAttribute("opened", "");
    this.isOpened = true;
  }
}

customElements.define("uc-modal", Modal);
