/* ==========================================================
   data.js · Contenido del cheat sheet
   Para agregar un comando: añade [comando, nota, os?] a una sección.
   os (opcional): 'win' | 'unix'
   Los marcadores <así> se resaltan como valores a reemplazar.
   ========================================================== */
window.CS = window.CS || {};

CS.data = {
  groups: [
    { id: 'web',    label: 'JavaScript',   emoji: '🟨' },
    { id: 'python', label: 'Python',       emoji: '🐍' },
    { id: 'php',    label: 'PHP',          emoji: '💜' },
    { id: 'otros',  label: 'Otros lenguajes', emoji: '⚙️' },
    { id: 'tools',  label: 'Herramientas', emoji: '🛠️' }
  ],

  techs: [
    /* ===================== JAVASCRIPT ===================== */
    {
      id: 'javascript', group: 'web', name: 'JavaScript / Node.js', badge: 'JS', color: '#f7df1e',
      desc: 'Node, npm y flujo diario de cualquier proyecto JS.',
      sections: [
        { title: 'Ejecutar', items: [
          ['node app.js', 'Ejecuta un archivo'],
          ['node --watch app.js', 'Reinicia al detectar cambios (Node 18.11+)'],
          ['node', 'Abre el REPL interactivo (Ctrl+D para salir)'],
          ['node -v && npm -v', 'Ver versiones instaladas']
        ]},
        { title: 'Proyecto e instalación', items: [
          ['npm init -y', 'Crea package.json con valores por defecto'],
          ['npm install', 'Instala todo lo declarado en package.json'],
          ['npm install <paquete>', 'Dependencia de producción'],
          ['npm install -D <paquete>', 'Dependencia de desarrollo'],
          ['npm install -g <paquete>', 'Instalación global'],
          ['npm uninstall <paquete>', 'Elimina un paquete'],
          ['npx <paquete>', 'Ejecuta un paquete sin instalarlo']
        ]},
        { title: 'Scripts y mantenimiento', items: [
          ['npm run <script>', 'Ejecuta un script de package.json'],
          ['npm ls --depth=0', 'Lista las dependencias directas'],
          ['npm outdated', 'Muestra paquetes desactualizados'],
          ['npm update', 'Actualiza dentro del rango semver'],
          ['npm audit fix', 'Corrige vulnerabilidades conocidas'],
          ['npm ci', 'Instalación exacta desde el lockfile (ideal para CI)'],
          ['rm -rf node_modules package-lock.json && npm install', 'Reinstalación limpia', 'unix']
        ]}
      ],
      tip: 'Con pnpm o yarn: `pnpm add <paquete>` · `yarn add <paquete>`.'
    },
    {
      id: 'typescript', group: 'web', name: 'TypeScript', badge: 'TS', color: '#3178c6',
      desc: 'Tipado estático sobre JavaScript.',
      sections: [
        { title: 'Configuración y compilación', items: [
          ['npm install -D typescript', 'Instala el compilador en el proyecto'],
          ['npx tsc --init', 'Genera tsconfig.json'],
          ['npx tsc', 'Compila el proyecto'],
          ['npx tsc --watch', 'Compila al guardar'],
          ['npx tsc --noEmit', 'Solo revisa tipos, sin generar archivos'],
          ['npx tsx archivo.ts', 'Ejecuta TypeScript directamente']
        ]}
      ]
    },
    {
      id: 'react', group: 'web', name: 'React', badge: 'Re', color: '#61dafb',
      desc: 'Proyectos con Vite y comandos habituales.',
      sections: [
        { title: 'Crear aplicación', items: [
          ['npm create vite@latest mi-app -- --template react', 'Recomendado: rápido y mantenido'],
          ['npm create vite@latest mi-app -- --template react-ts', 'Variante con TypeScript'],
          ['npx create-react-app mi-app', 'Obsoleto; solo para proyectos heredados']
        ]},
        { title: 'Desarrollo', items: [
          ['npm install', 'Instala dependencias'],
          ['npm run dev', 'Servidor de desarrollo con Vite'],
          ['npm start', 'Servidor de desarrollo con Create React App'],
          ['npm run build', 'Compila para producción'],
          ['npm run preview', 'Sirve localmente el build de Vite'],
          ['npm run lint', 'Revisa el código con ESLint']
        ]},
        { title: 'Librerías frecuentes', items: [
          ['npm install react-router-dom', 'Enrutamiento'],
          ['npm install axios', 'Cliente HTTP para consumir APIs'],
          ['npm install -D vitest', 'Pruebas unitarias (luego: npx vitest)']
        ]}
      ],
      tip: 'Create React App ya no se mantiene. Para proyectos nuevos usa Vite.'
    },
    {
      id: 'angular', group: 'web', name: 'Angular', badge: 'Ng', color: '#dd0031',
      desc: 'Angular CLI para crear, generar y compilar.',
      sections: [
        { title: 'Proyecto', items: [
          ['npm install -g @angular/cli', 'Instala la CLI'],
          ['ng new mi-app --routing --style=scss', 'Crea un proyecto'],
          ['ng serve --open', 'Sirve en local y abre el navegador'],
          ['ng version', 'Versión de CLI y framework']
        ]},
        { title: 'Generar código', items: [
          ['ng generate component <nombre>', 'Componente (atajo: ng g c)'],
          ['ng generate service <nombre>', 'Servicio (atajo: ng g s)'],
          ['ng generate module <nombre> --routing', 'Módulo con rutas'],
          ['ng generate pipe <nombre>', 'Pipe']
        ]},
        { title: 'Compilar y mantener', items: [
          ['ng build', 'Build de producción (por defecto en versiones recientes)'],
          ['ng test', 'Ejecuta pruebas unitarias'],
          ['ng add @angular/material', 'Agrega una librería con su configuración'],
          ['ng update @angular/cli @angular/core', 'Actualiza Angular']
        ]}
      ],
      tip: 'La opción `--prod` está obsoleta: `ng build` ya compila en modo producción.'
    },

    /* ======================= PYTHON ======================= */
    {
      id: 'python', group: 'python', name: 'Python', badge: 'Py', color: '#3776ab',
      desc: 'Entornos virtuales, pip y ejecución de scripts.',
      sections: [
        { title: 'Entorno virtual', items: [
          ['python -m venv venv', 'Crea el entorno'],
          ['source venv/bin/activate', 'Activar', 'unix'],
          ['venv\\Scripts\\activate', 'Activar', 'win'],
          ['deactivate', 'Salir del entorno']
        ]},
        { title: 'Paquetes', items: [
          ['pip install <paquete>', 'Instala un paquete'],
          ['pip install -r requirements.txt', 'Instala desde el archivo de dependencias'],
          ['pip freeze > requirements.txt', 'Guarda las dependencias actuales'],
          ['pip list', 'Lista lo instalado'],
          ['pip uninstall <paquete>', 'Desinstala'],
          ['python -m pip install --upgrade pip', 'Actualiza pip']
        ]},
        { title: 'Ejecutar', items: [
          ['python script.py', 'Ejecuta un script'],
          ['python', 'Abre el REPL'],
          ['python -m http.server 8000', 'Servidor web estático rápido'],
          ['pip install pytest && pytest', 'Instala y corre pruebas']
        ]}
      ],
      tip: 'En Linux/macOS puede que necesites `python3` y `pip3`.'
    },
    {
      id: 'django', group: 'python', name: 'Django', badge: 'Dj', color: '#44b78b',
      desc: 'Proyecto, apps, migraciones y utilidades de manage.py.',
      sections: [
        { title: 'Crear', items: [
          ['pip install django', 'Instala Django'],
          ['django-admin startproject <proyecto> .', 'Crea el proyecto en la carpeta actual'],
          ['python manage.py startapp <app>', 'Crea una app']
        ]},
        { title: 'Servidor y base de datos', items: [
          ['python manage.py runserver', 'Servidor local (puerto 8000)'],
          ['python manage.py runserver 0.0.0.0:8000', 'Accesible desde otros dispositivos de la red'],
          ['python manage.py makemigrations', 'Genera migraciones'],
          ['python manage.py migrate', 'Aplica migraciones'],
          ['python manage.py showmigrations', 'Estado de las migraciones'],
          ['python manage.py dbshell', 'Consola de la base de datos']
        ]},
        { title: 'Utilidades', items: [
          ['python manage.py createsuperuser', 'Crea un administrador'],
          ['python manage.py shell', 'Shell interactivo con el ORM'],
          ['python manage.py collectstatic', 'Reúne archivos estáticos para producción'],
          ['python manage.py test', 'Ejecuta pruebas'],
          ['python manage.py check', 'Valida la configuración']
        ]}
      ]
    },
    {
      id: 'drf', group: 'python', name: 'Django REST Framework', badge: 'DRF', color: '#a30000',
      desc: 'APIs REST sobre Django: instalación, JWT, CORS y documentación.',
      sections: [
        { title: 'Instalación', items: [
          ['pip install djangorestframework', 'Núcleo de DRF (agrega "rest_framework" a INSTALLED_APPS)'],
          ['pip install djangorestframework-simplejwt', 'Autenticación con tokens JWT'],
          ['pip install django-cors-headers', 'Permite peticiones desde el frontend (React, etc.)'],
          ['pip install drf-spectacular', 'Documentación OpenAPI / Swagger']
        ]},
        { title: 'Documentación', items: [
          ['python manage.py spectacular --file schema.yml', 'Genera el esquema OpenAPI']
        ]},
        { title: 'Probar la API con curl', items: [
          ['curl http://localhost:8000/api/', 'GET simple'],
          ['curl -X POST http://localhost:8000/api/token/ -H "Content-Type: application/json" -d \'{"username":"<usuario>","password":"<clave>"}\'', 'Obtiene el token JWT'],
          ['curl http://localhost:8000/api/<recurso>/ -H "Authorization: Bearer <token>"', 'Petición autenticada']
        ]}
      ],
      tip: 'Recuerda poner `corsheaders.middleware.CorsMiddleware` al inicio de MIDDLEWARE y definir `CORS_ALLOWED_ORIGINS`.'
    },

    /* ========================= PHP ======================== */
    {
      id: 'php', group: 'php', name: 'PHP', badge: 'PHP', color: '#777bb4',
      desc: 'Servidor integrado y Composer.',
      sections: [
        { title: 'Ejecutar', items: [
          ['php -v', 'Versión instalada'],
          ['php script.php', 'Ejecuta un script'],
          ['php -S localhost:8000', 'Servidor integrado'],
          ['php -m', 'Lista las extensiones cargadas']
        ]},
        { title: 'Composer', items: [
          ['composer install', 'Instala dependencias'],
          ['composer require <vendor/paquete>', 'Agrega un paquete'],
          ['composer update', 'Actualiza dependencias'],
          ['composer dump-autoload', 'Regenera el autoload'],
          ['composer create-project <vendor/paquete>', 'Crea un proyecto desde una plantilla']
        ]}
      ]
    },
    {
      id: 'laravel', group: 'php', name: 'Laravel', badge: 'La', color: '#ff2d20',
      desc: 'Artisan: el asistente de línea de comandos de Laravel.',
      sections: [
        { title: 'Proyecto', items: [
          ['composer create-project laravel/laravel mi-app', 'Crea el proyecto'],
          ['php artisan serve', 'Servidor local'],
          ['php artisan key:generate', 'Genera APP_KEY']
        ]},
        { title: 'Base de datos', items: [
          ['php artisan migrate', 'Ejecuta migraciones'],
          ['php artisan migrate:fresh --seed', 'Recrea las tablas y carga datos de prueba'],
          ['php artisan make:migration crear_tabla', 'Nueva migración'],
          ['php artisan db:seed', 'Ejecuta seeders']
        ]},
        { title: 'Generadores y utilidades', items: [
          ['php artisan make:model Post -m', 'Modelo con migración'],
          ['php artisan make:controller PostController --resource', 'Controlador CRUD'],
          ['php artisan route:list', 'Lista las rutas'],
          ['php artisan tinker', 'Consola interactiva'],
          ['php artisan optimize:clear', 'Limpia todas las cachés'],
          ['php artisan test', 'Ejecuta pruebas']
        ]}
      ]
    },

    /* ================== OTROS LENGUAJES =================== */
    {
      id: 'java', group: 'otros', name: 'Java & Spring Boot', badge: 'Jv', color: '#f89820',
      desc: 'Compilación manual y proyectos Spring con Maven o Gradle.',
      sections: [
        { title: 'Java básico', items: [
          ['java -version', 'Versión del JDK en uso'],
          ['javac MiPrograma.java', 'Compila'],
          ['java MiPrograma', 'Ejecuta la clase compilada'],
          ['jar cf mi-app.jar *.class', 'Empaqueta en JAR'],
          ['java -jar mi-app.jar', 'Ejecuta un JAR']
        ]},
        { title: 'Spring Boot · crear', items: [
          ['curl https://start.spring.io/starter.zip -d dependencies=web,data-jpa,security -d type=maven-project -d javaVersion=21 -o demo.zip', 'Genera un proyecto desde Spring Initializr']
        ]},
        { title: 'Spring Boot · Maven', items: [
          ['./mvnw spring-boot:run', 'Ejecuta la aplicación'],
          ['./mvnw clean package', 'Limpia y empaqueta'],
          ['./mvnw clean package -DskipTests', 'Empaqueta sin ejecutar pruebas'],
          ['./mvnw test', 'Ejecuta pruebas'],
          ['./mvnw dependency:tree', 'Árbol de dependencias'],
          ['./mvnw spring-boot:build-image', 'Genera una imagen Docker']
        ]},
        { title: 'Spring Boot · Gradle', items: [
          ['./gradlew bootRun', 'Ejecuta la aplicación'],
          ['./gradlew build', 'Compila y prueba'],
          ['./gradlew test', 'Ejecuta pruebas']
        ]}
      ],
      tip: 'En Windows usa `mvnw.cmd` / `gradlew.bat` en lugar de `./mvnw` / `./gradlew`.'
    },
    {
      id: 'csharp', group: 'otros', name: 'C# / .NET', badge: 'C#', color: '#9b4f96',
      desc: 'CLI de .NET, paquetes NuGet y Entity Framework.',
      sections: [
        { title: 'Proyecto', items: [
          ['dotnet --version', 'Versión del SDK'],
          ['dotnet new console -n MiApp', 'Aplicación de consola'],
          ['dotnet new webapi -n MiApi', 'API web'],
          ['dotnet new list', 'Plantillas disponibles']
        ]},
        { title: 'Compilar y ejecutar', items: [
          ['dotnet run', 'Compila y ejecuta'],
          ['dotnet watch run', 'Recarga automática al guardar'],
          ['dotnet build', 'Compila'],
          ['dotnet publish -c Release -o ./publish', 'Publica para producción'],
          ['dotnet test', 'Ejecuta pruebas']
        ]},
        { title: 'Paquetes y base de datos', items: [
          ['dotnet add package <NombrePaquete>', 'Agrega un paquete NuGet'],
          ['dotnet tool install --global dotnet-ef', 'Instala las herramientas de Entity Framework'],
          ['dotnet ef migrations add <Nombre>', 'Nueva migración'],
          ['dotnet ef database update', 'Aplica migraciones']
        ]}
      ]
    },
    {
      id: 'flutter', group: 'otros', name: 'Dart / Flutter', badge: 'Fl', color: '#02569b',
      desc: 'Apps multiplataforma con Flutter.',
      sections: [
        { title: 'Proyecto y diagnóstico', items: [
          ['flutter doctor', 'Revisa que el entorno esté listo'],
          ['flutter create mi_app', 'Crea un proyecto'],
          ['flutter devices', 'Lista dispositivos disponibles']
        ]},
        { title: 'Ejecutar y compilar', items: [
          ['flutter run', 'Ejecuta en el dispositivo por defecto'],
          ['flutter run -d <id>', 'Ejecuta en un dispositivo concreto'],
          ['flutter build apk --release', 'Genera APK de producción'],
          ['flutter build appbundle', 'Genera AAB para Google Play']
        ]},
        { title: 'Paquetes y calidad', items: [
          ['flutter pub get', 'Descarga dependencias'],
          ['flutter pub add <paquete>', 'Agrega un paquete'],
          ['flutter clean', 'Limpia la caché de compilación'],
          ['flutter analyze', 'Análisis estático'],
          ['flutter test', 'Ejecuta pruebas']
        ]},
        { title: 'Dentro de `flutter run`', items: [
          ['r', 'Hot reload'],
          ['R', 'Hot restart (reinicio completo)'],
          ['q', 'Salir']
        ]}
      ]
    },

    /* ==================== HERRAMIENTAS ==================== */
    {
      id: 'git', group: 'tools', name: 'Git', badge: 'Git', color: '#f05032',
      desc: 'Del commit diario a deshacer errores.',
      sections: [
        { title: 'Empezar', items: [
          ['git init', 'Inicia un repositorio'],
          ['git clone <url>', 'Clona un repositorio'],
          ['git status', 'Estado de los archivos'],
          ['git remote -v', 'Muestra los remotos'],
          ['git remote set-url origin <url>', 'Cambia la URL del remoto']
        ]},
        { title: 'Guardar cambios', items: [
          ['git add .', 'Agrega todos los cambios'],
          ['git commit -m "mensaje"', 'Crea un commit'],
          ['git commit --amend', 'Modifica el último commit'],
          ['git push -u origin <rama>', 'Sube la rama y la enlaza'],
          ['git pull --rebase', 'Trae cambios sin crear commits de merge']
        ]},
        { title: 'Ramas', items: [
          ['git switch -c <rama>', 'Crea y cambia a una rama'],
          ['git switch <rama>', 'Cambia de rama'],
          ['git branch', 'Ramas locales'],
          ['git branch -r', 'Ramas remotas'],
          ['git branch -a', 'Todas las ramas'],
          ['git merge <rama>', 'Fusiona una rama en la actual'],
          ['git rebase <rama>', 'Reaplica tus commits sobre otra rama'],
          ['git cherry-pick <hash>', 'Copia un commit concreto']
        ]},
        { title: 'Eliminar ramas y limpiar', items: [
          ['git branch -d <rama>', 'Borra una rama ya fusionada'],
          ['git branch -D <rama>', 'Fuerza el borrado'],
          ['git push origin --delete <rama>', 'Borra la rama remota'],
          ['git fetch --prune', 'Quita referencias a ramas remotas borradas']
        ]},
        { title: 'Historial e inspección', items: [
          ['git log --oneline --graph --all', 'Historial resumido en forma de árbol'],
          ['git diff', 'Cambios sin preparar'],
          ['git diff --staged', 'Cambios preparados'],
          ['git blame <archivo>', 'Quién cambió cada línea']
        ]},
        { title: 'Guardar a medias y deshacer', items: [
          ['git stash', 'Guarda cambios temporalmente'],
          ['git stash pop', 'Recupera el último stash'],
          ['git restore <archivo>', 'Descarta cambios de un archivo'],
          ['git restore --staged <archivo>', 'Saca un archivo del área de preparación'],
          ['git revert <hash>', 'Deshace un commit creando otro'],
          ['git reset --soft HEAD~1', 'Deshace el último commit conservando los cambios'],
          ['git reset --hard HEAD~1', '⚠ Descarta el último commit y sus cambios']
        ]}
      ],
      tip: '`reset --hard` y `branch -D` pueden borrar trabajo sin posibilidad de recuperarlo fácilmente. Úsalos con cuidado.'
    },
    {
      id: 'github', group: 'tools', name: 'GitHub CLI (gh)', badge: 'gh', color: '#8b949e',
      desc: 'Repositorios, pull requests e issues desde la terminal.',
      sections: [
        { title: 'Autenticación', items: [
          ['gh auth login', 'Inicia sesión'],
          ['gh auth status', 'Comprueba la sesión activa']
        ]},
        { title: 'Repositorios', items: [
          ['gh repo create mi-repo --public', 'Crea un repositorio'],
          ['gh repo clone <usuario/repo>', 'Clona un repositorio'],
          ['gh repo view --web', 'Abre el repo en el navegador']
        ]},
        { title: 'Pull requests', items: [
          ['gh pr list', 'Lista los PRs'],
          ['gh pr create --title "Título" --body "Descripción"', 'Crea un PR'],
          ['gh pr checkout <número>', 'Descarga un PR para probarlo'],
          ['gh pr merge <número>', 'Fusiona un PR']
        ]},
        { title: 'Issues y Actions', items: [
          ['gh issue list', 'Lista los issues'],
          ['gh issue create', 'Crea un issue'],
          ['gh run list', 'Ejecuciones recientes de Actions'],
          ['gh run watch', 'Sigue una ejecución en vivo']
        ]}
      ]
    },
    {
      id: 'docker', group: 'tools', name: 'Docker', badge: 'Dk', color: '#2496ed',
      desc: 'Imágenes, contenedores y Docker Compose.',
      sections: [
        { title: 'Imágenes', items: [
          ['docker build -t <nombre>:<tag> .', 'Construye una imagen'],
          ['docker images', 'Lista las imágenes'],
          ['docker pull <imagen>', 'Descarga una imagen'],
          ['docker rmi <imagen>', 'Elimina una imagen']
        ]},
        { title: 'Contenedores', items: [
          ['docker run -d -p 8080:80 --name <nombre> <imagen>', 'Ejecuta en segundo plano mapeando un puerto'],
          ['docker ps', 'Contenedores en ejecución'],
          ['docker ps -a', 'Todos los contenedores'],
          ['docker logs -f <nombre_o_id>', 'Sigue los logs'],
          ['docker exec -it <nombre_o_id> sh', 'Abre una terminal dentro'],
          ['docker stop <nombre_o_id>', 'Detiene de forma segura'],
          ['docker start <nombre_o_id>', 'Inicia uno detenido'],
          ['docker restart <nombre_o_id>', 'Reinicia'],
          ['docker rm <nombre_o_id>', 'Elimina un contenedor detenido'],
          ['docker rm -f <nombre_o_id>', 'Fuerza la eliminación']
        ]},
        { title: 'Docker Compose', items: [
          ['docker compose up -d', 'Crea o recrea y levanta en segundo plano'],
          ['docker compose up -d --build', 'Reconstruye las imágenes antes de levantar'],
          ['docker compose stop', 'Apaga servicios sin borrar datos'],
          ['docker compose start', 'Reanuda servicios existentes'],
          ['docker compose down', 'Detiene y elimina contenedores y redes'],
          ['docker compose down -v', '⚠ Además elimina volúmenes (se pierden los datos)'],
          ['docker compose logs -f', 'Sigue los logs en vivo'],
          ['docker compose ps', 'Estado de los servicios']
        ]},
        { title: 'Limpieza', items: [
          ['docker system df', 'Espacio usado por Docker'],
          ['docker system prune', 'Elimina recursos sin uso'],
          ['docker volume ls', 'Lista los volúmenes']
        ]}
      ],
      tip: '`stop` libera recursos sin perder datos · `start` reanuda · `up -d` tras modificar el compose · `down -v` solo si quieres borrar la base de datos.'
    },
    {
      id: 'ngrok', group: 'tools', name: 'Ngrok', badge: 'ng', color: '#6f6ff0',
      desc: 'Expón tu servidor local a internet con una URL pública.',
      sections: [
        { title: 'Configurar', items: [
          ['ngrok config add-authtoken <token>', 'Guarda tu token (una sola vez)'],
          ['ngrok config check', 'Valida la configuración']
        ]},
        { title: 'Exponer', items: [
          ['ngrok http 3000', 'Túnel HTTP al puerto 3000'],
          ['ngrok http --domain=<tu-dominio>.ngrok-free.app 3000', 'Usa tu dominio estático'],
          ['http://127.0.0.1:4040', 'Panel local para inspeccionar el tráfico']
        ]}
      ],
      tip: 'Copia la URL HTTPS que muestra la terminal. `Ctrl+C` detiene el túnel. La URL es pública: no expongas datos sensibles sin autenticación.'
    },
    {
      id: 'bash', group: 'tools', name: 'Linux / Terminal', badge: '$_', color: '#4af626',
      desc: 'Archivos, procesos, puertos y conexión remota.',
      sections: [
        { title: 'Archivos', items: [
          ['ls -la', 'Lista con detalles y archivos ocultos', 'unix'],
          ['cd <carpeta>', 'Cambia de directorio'],
          ['mkdir -p <ruta>', 'Crea carpetas anidadas', 'unix'],
          ['cp -r <origen> <destino>', 'Copia carpetas', 'unix'],
          ['find . -name "*.log"', 'Busca archivos por nombre', 'unix'],
          ['grep -rn "<texto>" .', 'Busca texto dentro de archivos', 'unix'],
          ['chmod +x script.sh', 'Da permiso de ejecución', 'unix'],
          ['tail -f archivo.log', 'Sigue un log en vivo', 'unix']
        ]},
        { title: 'Puertos y procesos', items: [
          ['lsof -i :8000', 'Quién usa el puerto 8000', 'unix'],
          ['kill -9 <PID>', 'Finaliza un proceso a la fuerza', 'unix'],
          ['netstat -ano | findstr :8000', 'Quién usa el puerto 8000', 'win'],
          ['taskkill /PID <PID> /F', 'Finaliza un proceso a la fuerza', 'win']
        ]},
        { title: 'Sistema y red', items: [
          ['df -h', 'Espacio en disco', 'unix'],
          ['du -sh *', 'Tamaño de cada elemento de la carpeta', 'unix'],
          ['ssh <usuario>@<host>', 'Conexión remota'],
          ['scp <archivo> <usuario>@<host>:<ruta>', 'Copia un archivo al servidor']
        ]}
      ]
    },
    {
      id: 'db', group: 'tools', name: 'Bases de datos', badge: 'DB', color: '#00758f',
      desc: 'PostgreSQL, MySQL y SQLite: conexión y respaldos.',
      sections: [
        { title: 'PostgreSQL', items: [
          ['psql -U <usuario> -d <base>', 'Conecta a una base'],
          ['\\l', 'Lista bases de datos (dentro de psql)'],
          ['\\dt', 'Lista tablas (dentro de psql)'],
          ['pg_dump -U <usuario> -d <base> > backup.sql', 'Respaldo'],
          ['psql -U <usuario> -d <base> -f backup.sql', 'Restaurar respaldo']
        ]},
        { title: 'MySQL / MariaDB', items: [
          ['mysql -u <usuario> -p', 'Conecta al servidor'],
          ['mysqldump -u <usuario> -p <base> > backup.sql', 'Respaldo'],
          ['mysql -u <usuario> -p <base> < backup.sql', 'Restaurar respaldo']
        ]},
        { title: 'SQLite', items: [
          ['sqlite3 <archivo>.db', 'Abre una base SQLite'],
          ['.tables', 'Lista tablas (dentro de sqlite3)']
        ]}
      ]
    }
  ]
};