const routes = {
    "/": "view-home",
    "/blog": "view-blog",
    "/projects": "view-projects",
    "/about": "view-about",
    "/contact": "view-contact",
    "/projects/testprojectGO": "view-sandbox",
  };
  
  const app = document.getElementById("app");
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();
  
  // Render based on template
  function render(pathname) {
    if (pathname.length > 1 && pathname.endsWith("/")) {
      pathname = pathname.slice(0, -1);
    }
  
    const templateId = routes[pathname] || routes["/"];
    const tpl = document.getElementById(templateId);
    if (!tpl) return;
  
    app.innerHTML = "";
    const node = tpl.content.cloneNode(true);
    app.appendChild(node);
  
    // Sandbox interactivity
    const blob = app.querySelector("#sandbox-blob");
    if (blob) {
      blob.addEventListener("mousemove", (event) => {
        const rect = blob.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
        blob.style.transform = `translate(${x}px, ${y}px) scale(1.02)`;
      });
  
      blob.addEventListener("mouseleave", () => {
        blob.style.transform = "translate(0,0) scale(1)";
      });
    }
  
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  
  function navigateTo(path) {
    if (window.location.pathname === path) return;
    history.pushState(null, "", path);
    render(path);
  }
  
  // Hijack internal links
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-link]");
    if (!link) return;
  
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("/")) return;
  
    e.preventDefault();
    navigateTo(href);
  });
  
  // Back button
  window.addEventListener("popstate", () => {
    render(window.location.pathname);
  });
  
  // Load page
  render(window.location.pathname);
  