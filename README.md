# 🍽 Sabores Popayán

Directorio gastronómico de **Popayán, La Ciudad Blanca del Cauca**. Descubre los mejores restaurantes, cafés y lugares únicos de la capital del Cauca.

🌐 **[sabores-popayan.vercel.app](https://sabores-popayan.vercel.app)**

---

## 📸 Vista previa

| Home | Restaurantes | Detalle |
|------|-------------|---------|
| Hero + buscador + destacados | Filtros + tarjetas | Info completa + mapa |

---

## ✨ Funcionalidades

- 🔍 **Buscador** — busca por nombre, categoría o plato
- 🗂 **Filtros** — por categoría, precio y ordenamiento
- ❤️ **Favoritos** — guarda tus lugares favoritos (localStorage)
- 📍 **Cerca de mí** — ordena por distancia usando geolocalización
- 🗺 **Mapa interactivo** — todos los restaurantes en el mapa de Popayán
- 📱 **Compartir por WhatsApp** — comparte cualquier restaurante
- ✍️ **Registra tu lugar** — formulario para dueños de restaurantes
- 💀 **Página 404** personalizada
- ⚡ **Skeleton loading** — placeholders mientras carga el contenido
- 🔎 **SEO básico** — meta tags, Open Graph y títulos dinámicos

---

## 🛠 Stack tecnológico

| Tecnología | Uso |
|-----------|-----|
| React 18 | UI y componentes |
| Vite | Bundler y dev server |
| Tailwind CSS | Estilos utilitarios |
| React Router v6 | Navegación |
| Leaflet + React Leaflet | Mapas interactivos |
| JSON local | Base de datos de restaurantes |
| Vercel | Deploy y hosting |

---

## 📁 Estructura del proyecto

```
sabores-popayan/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── TarjetaRestaurante.jsx
│   │   └── SkeletonTarjeta.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Listado.jsx
│   │   ├── Detalle.jsx
│   │   ├── Mapa.jsx
│   │   ├── Registro.jsx
│   │   └── NotFound.jsx
│   ├── hooks/
│   │   ├── useFavoritos.js
│   │   ├── useAnimateOnScroll.js
│   │   ├── useGeolocalizacion.js
│   │   └── useSEO.js
│   ├── utils/
│   │   └── distancia.js
│   ├── data/
│   │   └── restaurants.json
│   └── styles/
│       ├── home.css
│       ├── listado.css
│       ├── detalle.css
│       ├── mapa.css
│       ├── registro.css
│       ├── navbar.css
│       ├── footer.css
│       ├── skeleton.css
│       └── global.css
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Correr el proyecto localmente

```bash
# Clonar el repositorio
git clone https://github.com/Kevinchicaiza96/sabores-popayan.git

# Entrar a la carpeta
cd sabores-popayan

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

---

## 📦 Scripts disponibles

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
```

---

## 🗺 Roadmap

- [ ] Datos reales de restaurantes de Popayán
- [ ] Modo oscuro
- [ ] PWA — instalar como app en el celular
- [ ] Reseñas y calificaciones de usuarios
- [ ] Panel admin para gestionar restaurantes
- [ ] Dominio personalizado `saborespopayan.co`

---

## 👨‍💻 Autor

**Kevin Chicaiza**
- GitHub: [@Kevinchicaiza96](https://github.com/Kevinchicaiza96)
- Proyecto: [sabores-popayan.vercel.app](https://sabores-popayan.vercel.app)

---

## 📍 Sobre el proyecto

Sabores Popayán nació como un proyecto para aprender desarrollo web moderno construyendo algo real y útil para la comunidad de Popayán, Colombia.

---

*Hecho con ❤️ en Popayán, Cauca — Colombia 🇨🇴*