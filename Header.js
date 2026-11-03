(function () {
  // Load the shared header component
  fetch("/header.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Header file not found");
      }
      return response.text();
    })
    .then((html) => {
      const doc = new DOMParser().parseFromString(html, "text/html");

      // Load CSS
      doc.querySelectorAll("style").forEach((style) => {
        document.head.appendChild(style.cloneNode(true));
      });

      // Load HTML
      const wrapper = document.createElement("div");
      wrapper.id = "global-header";

      Array.from(doc.body.childNodes).forEach((node) => {
        if (node.nodeName !== "SCRIPT") {
          wrapper.appendChild(document.importNode(node, true));
        }
      });

      document.body.prepend(wrapper);

      // Execute JavaScript
      doc.querySelectorAll("script").forEach((script) => {
        const newScript = document.createElement("script");
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
      });
    })
    .catch((error) => console.error(error));
})();
