/* ===== CONFIGURACIÓN: se edita en config.json ===== */
/* whatsapp: solo números con código de país, ej: "5492614000000". Vacío = el botón lleva al mail */
/* email: ej: "visitas@tarbodega.com". Si ambos están vacíos, los botones quedan sin destino */
let CONFIG = {
  whatsapp: "",
  email: "",
  mensaje: "Hola, quisiera consultar por una visita a Bodega Tres Cumbres."
};

function aplicarConfig() {
  /* Destinos de los botones de reserva y contacto */
  const wa = CONFIG.whatsapp ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.mensaje)}` : "";
  const mail = CONFIG.email ? `mailto:${CONFIG.email}?subject=${encodeURIComponent("Consulta de visita")}&body=${encodeURIComponent(CONFIG.mensaje)}` : "";
  document.querySelectorAll(".js-reserva").forEach(a => { const d = wa || mail; if (d && !a.closest("nav")) a.href = d; else if (d) a.href = d; });
  document.querySelectorAll(".js-mail").forEach(a => { if (mail) a.href = mail; });
  document.querySelectorAll(".js-mail-text").forEach(a => { if (CONFIG.email) { a.textContent = CONFIG.email; a.href = mail; } });
  document.querySelectorAll(".js-wa-text").forEach(a => { if (CONFIG.whatsapp) { a.textContent = "+" + CONFIG.whatsapp; a.href = wa; } });
}

/* Carga config.json (si no se puede leer, se usan los valores por defecto de arriba) */
fetch("config.json")
  .then(r => r.json())
  .then(c => { CONFIG = Object.assign(CONFIG, c); })
  .catch(() => {})
  .finally(aplicarConfig);
document.getElementById("year").textContent = new Date().getFullYear();

/* Menú móvil */
const burger = document.querySelector(".burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
menu.addEventListener("click", e => { if (e.target.closest("a")) { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); } });

/* Encabezado: transparente sobre el hero, sólido al bajar */
const header = document.querySelector("header");
const onScroll = () => header.classList.toggle("solid", scrollY > 60);
addEventListener("scroll", onScroll, { passive: true }); onScroll();
