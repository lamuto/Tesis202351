console.clear();
var scene, camera, renderer, cube, thickLine;

function init() {
    // Configuración básica
    scene = new THREE.Scene();

    var aspect = window.innerWidth / window.innerHeight;
    camera = new THREE.OrthographicCamera(-10 * aspect, 10 * aspect, 10, -10, 0.1, 1000);


    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth-20, window.innerHeight-20);
    renderer.setClearColor(new THREE.Color().setRGB(0.5,0.5,0.7));
    document.body.appendChild(renderer.domElement);

    // Configuración de la cámara
    camera.position.set(0,0,20);
    crearCubo();
    let grid = new THREE.GridHelper(20, 10, 0x202020, 0x202020);
    grid.position.set(0, 0, 0);
    grid.rotation.x = Math.PI / 4;
    grid.rotation.y = Math.PI / 4;
    //grid.rotation.z = Math.PI / 4;
    //scene.add(grid);
    // Llamar a la animación
    animate();

    // Manejar eventos de redimensionamiento
    window.addEventListener('resize', onWindowResize, false);
}

function crearCubo(imagePath) {
    var geometry = new THREE.PlaneGeometry(10, 10);
    //var textureLoader = new THREE.TextureLoader();
   // var texture = textureLoader.load(imagePath);

    //var material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.3 });
    var plane1 = new THREE.Mesh(geometry, material);
    var plane2 = new THREE.Mesh(geometry, material);
    plane2.position.z = 10;
    // Crear una línea
    //-------- ----------
    // GEOMETRY
    //-------- ----------
    var boxGeo = new THREE.BoxGeometry(10, 10, 10),
     edgeGeo = new THREE.EdgesGeometry(boxGeo);
    //-------- ----------
    // LINE
    //-------- ----------
    const line = new THREE.LineSegments(
        edgeGeo,
        new THREE.LineBasicMaterial({
            color: new THREE.Color('white'),
            linewidth: 5
        })
    );
    line.position.z = 5;
    
    cube = new THREE.Group();
    cube.add(plane1);
    cube.add(plane2);
    cube.add(line);
    scene.add(cube);
    agregarLineas();
    agregarPuntos();
}

function agregarLineas() {
    // Crear la curva
    var curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(0, 7, 3),
        new THREE.Vector3(5, 0, 5)
    ]);

    // Crear la geometría de la línea
    var points = curve.getPoints(50);
    var geometry = new THREE.BufferGeometry().setFromPoints(points);

    // Crear el material de la línea
    var material = new THREE.LineBasicMaterial({ color: 0xff0000, linewidth: 5 }); // Establecer el ancho de la línea

    // Crear la línea usando THREE.LineSegments
    thickLine = new THREE.Line(geometry, material);
   
    // Añadir la línea a la escena
    cube.add(thickLine);
}
function agregarPuntos() {
    var pointsGeometry = new THREE.BufferGeometry();
    var pointsMaterial = new THREE.PointsMaterial({ color: 0x00ff00, size: 5 });
   // var a = new THREE.Vector3(0, 0, 0);
    var b = new THREE.Vector3(0, 5, 3);
  //  var c = new THREE.Vector3(5, 0, 5);
   // pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(a, 3));
    pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(b, 3));
   // pointsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(c, 3));
    // Crear el objeto de puntos
    var points = new THREE.Points(pointsGeometry, pointsMaterial);
    cube.add(points);
}

function onWindowResize() {
    // Ajustar el tamaño del lienzo cuando cambia el tamaño de la ventana
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.left = -10 * aspect;
    camera.right = 10 * aspect;
    camera.top = 10;
    camera.bottom = -10;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth-20, window.innerHeight-20);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotar el cubo
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// Inicializar Three.js
init();