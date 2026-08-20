# Guion y checklist — Video de entrega (máx. 15 min)

Documento de apoyo para grabar el video explicativo del entregable **Backend de
Productos** (NestJS + TypeScript + MongoDB + Mongoose). Cubre los 4 requisitos
exigidos por la rúbrica y da un guion minuto a minuto para no exceder los 15 min.

## Requisitos que debe cumplir el video

- [ ] Mostrar y narrar el paso a paso la construcción de la aplicación.
- [ ] Mostrar el funcionamiento de los servicios REST (CRUD) a través de pruebas
      con herramientas como Swagger, Postman o Insomnia.
- [ ] Mostrar las operaciones para subir el código a un repositorio de GitHub.
- [ ] Mostrar la URL del repositorio y el código fuente alojado.

## Análisis rápido del proyecto

| Aspecto | Detalle |
|---|---|
| Stack | Node.js, NestJS 11, TypeScript, MongoDB, Mongoose, `class-validator` / `class-transformer` |
| Entidad | `Producto` (`id`, `nombre`, `descripcion`, `precio`, `createdAt`, `updatedAt`) |
| Módulos/capas | `ProductosModule`, `ProductosController`, `ProductosService`, `CreateProductoDto` / `UpdateProductoDto`, `ProductoSchema` |
| Endpoints | `GET /`, `POST /productos`, `GET /productos`, `GET /productos/:id`, `PATCH /productos/:id`, `DELETE /productos/:id` |
| Validación | `ValidationPipe` global (`whitelist`, `forbidNonWhitelisted`, `transform`) definido en `main.ts` |
| Persistencia | Mongoose sobre MongoDB; ID numérico autoincremental gestionado por `ProductosService` |
| Errores | `NotFoundException` en `findOne`, `update` y `remove` cuando el ID no existe → `404` |
| Swagger/OpenAPI | **No está configurado en el `package.json` actual** (no hay `@nestjs/swagger`). Ver nota más abajo si se prefiere Swagger en vez de Postman/Insomnia. |
| Pruebas | `npm run test` (unitarias), `npm run test:e2e` (end-to-end, requiere MongoDB accesible) |
| Repositorio git | https://github.com/Brandoncaro9/backend-productos (rama principal: `main`) |

> Nota sobre Swagger: como el proyecto no trae `@nestjs/swagger`, la vía más
> rápida para el video es usar **Postman** o **Insomnia** contra los endpoints
> documentados en el `README.md`. Si se prefiere mostrar Swagger UI, agregar
> antes de grabar:
> ```bash
> npm install @nestjs/swagger swagger-ui-express
> ```
> y en `main.ts`:
> ```ts
> import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
>
> const config = new DocumentBuilder()
>   .setTitle('Backend de Productos')
>   .setDescription('API REST CRUD de productos')
>   .setVersion('1.0')
>   .build();
> const document = SwaggerModule.createDocument(app, config);
> SwaggerModule.setup('docs', app, document);
> ```
> La UI quedará disponible en `http://localhost:3000/docs`.

## Guion minuto a minuto (15 min)

### 1. Introducción (0:00 – 1:00)

- Preséntate, di el nombre del proyecto (**Backend de Productos**) y el
  objetivo: API REST CRUD de productos para la actividad del módulo.
- Menciona el stack: NestJS + TypeScript + MongoDB + Mongoose.

### 2. Construcción de la aplicación — paso a paso narrado (1:00 – 6:00)

Recorre el código explicando el rol de cada capa (usa el árbol de `src/`):

1. **`main.ts`** — arranca la aplicación y registra el `ValidationPipe`
   global (`whitelist`, `forbidNonWhitelisted`, `transform`).
2. **`app.module.ts`** — módulo raíz: carga `ConfigModule` (variables de
   entorno), conecta MongoDB con `MongooseModule.forRoot(MONGODB_URI)` e
   importa `ProductosModule`.
3. **`productos/schemas/producto.schema.ts`** — esquema Mongoose con los
   campos `id`, `nombre`, `descripcion`, `precio` y timestamps automáticos.
4. **`productos/dto/create-producto.dto.ts`** y **`update-producto.dto.ts`**
   — validan la entrada (`@IsString`, `@IsNotEmpty`, `@IsNumber`, `@Min(0)`) y
   permiten actualizaciones parciales con `PartialType`.
5. **`productos/productos.service.ts`** — lógica CRUD: `create`, `findAll`,
   `findOne`, `update`, `remove`, usando el modelo de Mongoose.
6. **`productos/productos.controller.ts`** — expone los endpoints REST bajo
   `/productos` con `@Post`, `@Get`, `@Patch`, `@Delete` y `ParseIntPipe`
   para validar el ID recibido en la URL.
7. **`productos/productos.module.ts`** — registra el esquema con
   `MongooseModule.forFeature()` e inyecta el modelo en el servicio.

Luego, en terminal:

```bash
npm install
npm run start:dev
```

- Muestra la consola arrancando y confirma que Nest queda escuchando en
  `http://localhost:3000`.
- Muestra el archivo `.env` (sin exponer credenciales reales) con
  `MONGODB_URI` y `PORT`.

### 3. Pruebas de los servicios REST (CRUD) — Postman/Insomnia o Swagger (6:00 – 12:00)

Ejecuta cada operación, narrando qué esperas ver en cada respuesta:

1. **POST** `/productos` — crear un producto → `201 Created`.
   ```json
   {
     "nombre": "Teclado mecánico",
     "descripcion": "Teclado con interruptores azules",
     "precio": 180000
   }
   ```
2. **GET** `/productos` — listar todos → `200 OK` con el array (incluye el creado).
3. **GET** `/productos/{id}` — obtener por id → `200 OK` con el producto puntual.
4. **PATCH** `/productos/{id}` — actualizar parcialmente → `200 OK` con los
   datos modificados (por ejemplo, solo el `precio`).
5. **DELETE** `/productos/{id}` — eliminar → `200 OK` con mensaje de
   confirmación.
6. **Casos de error** (demuestran las validaciones y el manejo de errores):
   - `GET /productos/9999` (id inexistente) → `404 Not Found`.
   - `POST /productos` con body inválido (por ejemplo `nombre` vacío,
     `precio` negativo o un campo no declarado) → `400 Bad Request`.

### 4. Subir el código a GitHub (12:00 – 14:00)

Muestra en terminal, en vivo, la secuencia completa:

```bash
git init
git add .
git commit -m "Backend RESTful CRUD de Productos - NestJS + Mongoose + MongoDB"
git branch -M main
git remote add origin https://github.com/Brandoncaro9/backend-productos.git
git push -u origin main
```

Si el repositorio ya existe (como en este caso), muestra en su lugar el flujo
normal de trabajo:

```bash
git status
git add .
git commit -m "mensaje descriptivo del cambio"
git push
```

### 5. Cierre — URL del repositorio y código fuente (14:00 – 15:00)

- Abre en el navegador `https://github.com/Brandoncaro9/backend-productos` y
  recórrelo brevemente: estructura de carpetas, `README.md` y el historial de
  commits.
- Confirma que el código fuente completo queda alojado y accesible en esa URL.
- Cierra agradeciendo y resumiendo en una frase lo implementado.
