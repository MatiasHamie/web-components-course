class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (event) => {
      // confirm() es un alert con 2 botones q pregunta confirmar o cancelar
      if (!confirm("Do you really want to leave")) {
        event.preventDefault();
      }
    });
  }
}

// Cuando extendemos una clase especifica
// por ej, aca estamos extendiendo HTMLAnchorElement y no HTMLElement
// tenemos q pasarle a la funcion define() un tercer parametro, diciendo
// que elemento especifico estamos extendiendo "a" (AnchorTag)
customElements.define("uc-confirm-link", ConfirmLink, { extends: "a" });
