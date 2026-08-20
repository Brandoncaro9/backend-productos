# Guion y checklist — Video de entrega (máx. 15 min)

Documento de apoyo para grabar el video explicativo del entregable **Producto API**
(Spring Boot 3 + Spring Data JPA/Hibernate + PostgreSQL). Cubre los 4 requisitos
exigidos por la rúbrica y da un guion minuto a minuto para no exceder los 15 min.

## Requisitos que debe cumplir el video

- [ ] Mostrar y **narrar el paso a paso** de la construcción de la aplicación.
- [ ] Mostrar el **funcionamiento de los servicios REST (CRUD)** probados con
      Swagger, Postman o Insomnia.
- [ ] Mostrar las **operaciones para subir el código a un repositorio de GitHub**.
- [ ] Mostrar la **URL del repositorio** y el **código fuente alojado** en GitHub.

## Análisis rápido del proyecto

| Aspecto | Detalle |
|---|---|
| Stack | Java 17, Spring Boot 3.3.4, Spring Web, Spring Data JPA (Hibernate), Bean Validation, driver PostgreSQL, Lombok |
| Entidad | `Producto` (`id`, `nombre`, `descripcion`, `precio`) |
| Paquetes | `controller`, `service` (+ `impl`), `repository`, `model`, `dto`, `exception` |
| Endpoints | `GET /api/productos`, `GET /api/productos/{id}`, `POST /api/productos`, `PUT /api/productos/{id}`, `DELETE /api/productos/{id}` |
| Manejo de errores | `GlobalExceptionHandler` → JSON consistente (404, 400, 500) |
| Persistencia | `spring.jpa.hibernate.ddl-auto=update` — Hibernate crea la tabla `productos` automáticamente, sin SQL manual |
| Herramienta de prueba lista | `postman_collection.json` incluido en la raíz del proyecto |
| Swagger/OpenAPI | **No está configurado en el `pom.xml` actual** (no hay `springdoc-openapi`). Ver la nota más abajo si quieres usar Swagger en vez de Postman/Insomnia. |
| Repositorio git | Aún no inicializado en este entorno (no hay carpeta `.git`) |

> Nota sobre Swagger: como el proyecto no trae `springdoc-openapi-starter-webmvc-ui`,
> la vía más rápida para el video es usar **Postman** (o Insomnia) con la colección
> ya incluida (`postman_collection.json`). Si prefieres mostrar Swagger UI, añade
> esta dependencia al `pom.xml` antes de grabar:
> ```xml
> <dependency>
>     <groupId>org.springdoc</groupId>
>     <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
>     <version>2.6.0</version>
> </dependency>
> ```
> y la UI quedará disponible en `http://localhost:8080/swagger-ui.html`.

## Guion minuto a minuto (15 min)

### 1. Introducción (0:00 – 1:00)
- Preséntate, di el nombre del proyecto (**Producto API**) y el objetivo:
  API REST CRUD de productos para la Actividad Sumativa Unidad 2.
- Menciona el stack: Spring Boot 3 + Spring Data JPA + PostgreSQL.

### 2. Construcción de la aplicación — paso a paso narrado (1:00 – 6:00)
Recorre el código explicando el rol de cada capa (usa el árbol de `src/main/java/com/eafit/productoapi/`):

1. **`model/Producto.java`** — entidad JPA mapeada a la tabla `productos`
   (`id`, `nombre`, `descripcion`, `precio`).
2. **`dto/ProductoRequestDTO.java` y `ProductoResponseDTO.java`** — objetos de
   entrada/salida para no exponer la entidad directamente al cliente.
3. **`repository/ProductoRepository.java`** — interfaz Spring Data JPA, acceso
   a datos sin escribir SQL (ORM/Hibernate).
4. **`service/ProductoService.java` + `service/impl/ProductoServiceImpl.java`**
   — lógica de negocio (crear, listar, buscar por id, actualizar, eliminar).
5. **`controller/ProductoController.java`** — expone los 5 endpoints REST bajo
   `/api/productos`.
6. **`exception/GlobalExceptionHandler.java`** — captura errores y responde
   siempre con un JSON consistente (`timestamp`, `status`, `error`, `message`, `path`).
7. **`application.properties`** — configuración de conexión a PostgreSQL vía
   variables de entorno (`DB_URL`, `DB_USERNAME`, `DB_PASSWORD`) y
   `ddl-auto=update`.

Luego, en terminal:
```bash
mvn spring-boot:run
```
- Muestra la consola arrancando y **Hibernate creando la tabla `productos`**
  automáticamente (log de `create table` / `Hibernate:`).
- Confirma que la app queda disponible en `http://localhost:8080/api/productos`.

### 3. Pruebas de los servicios REST (CRUD) — Postman/Insomnia o Swagger (6:00 – 12:00)
Importa `postman_collection.json` (o usa Swagger UI si lo agregaste) y ejecuta,
narrando qué esperas ver en cada respuesta:

1. **POST** `/api/productos` — crear un producto → `201 Created` con el producto creado.
   ```json
   { "nombre": "Teclado mecanico", "descripcion": "Teclado mecanico switches rojos", "precio": 189900 }
   ```
2. **GET** `/api/productos` — listar todos → `200 OK` con el array (incluye el creado).
3. **GET** `/api/productos/{id}` — obtener por id → `200 OK` con el producto puntual.
4. **PUT** `/api/productos/{id}` — actualizar → `200 OK` con los datos modificados.
5. **DELETE** `/api/productos/{id}` — eliminar → `204 No Content`.
6. **Casos de error** (demuestran el `GlobalExceptionHandler`):
   - `GET /api/productos/99999` (id inexistente) → `404 Not Found`.
   - `POST /api/productos` con body inválido (p. ej. `nombre` vacío o `precio`
     negativo) → `400 Bad Request` con el detalle de validación.

### 4. Subir el código a GitHub (12:00 – 14:00)
Muestra en terminal, en vivo, la secuencia completa:
```bash
cd producto-api
git init
git add .
git commit -m "Backend RESTful CRUD de Producto - Spring Boot + JPA + PostgreSQL"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/producto-api.git
git push -u origin main
```
- Aclara que `.gitignore` ya excluye `target/`, archivos de IDE y credenciales
  locales, así que solo sube el código fuente relevante.
- Si el repo ya existe y solo agregas cambios nuevos, usa en su lugar:
  ```bash
  git add .
  git commit -m "mensaje del cambio"
  git push
  ```

### 5. Mostrar el repositorio en GitHub (14:00 – 15:00)
- Abre el navegador en la URL del repositorio (`https://github.com/TU_USUARIO/producto-api`)
  y **dila en voz alta** para que quede grabada.
- Recorre brevemente la estructura de carpetas ya alojada (`controller`, `service`,
  `repository`, `model`, `dto`, `exception`) y el historial de commits.
- Cierra confirmando que el código fuente completo está disponible públicamente
  (o con los permisos correctos) en ese repositorio.

## Checklist final antes de exportar el video

- [ ] Duración ≤ 15 minutos.
- [ ] Audio narrado claro durante toda la construcción del proyecto (no solo texto en pantalla).
- [ ] Se ejecutaron y mostraron los 5 endpoints CRUD con resultados visibles (status code + body).
- [ ] Se mostró al menos un caso de error (404 o 400).
- [ ] Se grabaron los comandos `git init` → `git push` en vivo.
- [ ] Se mostró la URL del repositorio y su contenido en GitHub.
