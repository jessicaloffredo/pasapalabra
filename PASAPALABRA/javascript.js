//total preguntas del juego
const TOTAL_PREGUNTAS = 26;
//tiempo del juego
const TIEMPO_DEL_JUEGO = 180;
//estructura para almacenar las preguntas
const bd_juego = [
  {
      id:'A',
      pregunta:" Instrumento que mide la velocidad o la fuerza del viento",
      respuesta:"anemometro"
  },
  {
    id:'B',
    pregunta:"Ciencia que trata de los seres vivos",
    respuesta:"biologia"
  },
  {
    id:'C',
    pregunta:" Reloj utilizado en competiciones deportivas",
    respuesta:"cronometro"
  },
  {
    id:'D',
    pregunta:" Inflamación de la piel",
    respuesta:"dermatitis"
  },
  {
    id:'E',
    pregunta:" Excesivo amor a sí mismo",
    respuesta:"egoismo"
  },
  {
    id:'F',
    pregunta:" Temor angustioso e incontrolable",
    respuesta:"fobia"
  },
  {
    id:'G',
    pregunta:" Lugar destinado al ejercicio físico",
    respuesta:"gimnasio"
  },
  {
    id:'H',
    pregunta:" Lugar destinado a carreras de caballos",
    respuesta:"hipodromo"
  },
  {
    id:'I',
    pregunta:" Símbolo gráfico que aparece en la pantalla de una computadora u otro dispositivo electrónico y que representa un programa, un sistema operativo, etc. ",
    respuesta:"icono"
  },
  {
    id:'J',
    pregunta:"Lenguaje de programación con el cual se diseño el sistema operativo Android",
    respuesta:"java"
  },
  {
    id:'K',
    pregunta:"Unidad de longitud equivalente a 1000 metros",
    respuesta:"kilometro"
  },
  {
    id:'L',
    pregunta:" Arte de dibujar o grabar en piedra",
    respuesta:"litografia"
  },
  {
    id:'M',
    pregunta:" Parte de la gramática que estudia la estructura de las palabras y de sus elementos constitutivos",
    respuesta:"morfologia"
  },
  {
    id:'N',
    pregunta:"Pieza de caucho que se monta sobre la llanta de una rueda",
    respuesta:"neumatico"
  },
  {
    id:'O',
    pregunta:"Conjunto de normas que regulan la escritura de una lengua",
    respuesta:"ortografia"
  },
  {
    id:'P',
    pregunta:" Persona o cosa que en un suceso cualquiera desempeña la parte principal",
    respuesta:"protagonista"
  },
  {
    id:'Q',
    pregunta:" Local convenientemente acondicionado para hacer operaciones quirúrgicas",
    respuesta:"quirofano"
  },
  {
    id:'R',
    pregunta:": Mamífero de gran tamaño que tiene uno o dos cuernos curvados en la zona de la nariz",
    respuesta:"rinoceronte"
  },
  {
    id:'S',
    pregunta:" Representación gráfica invariable de un concepto",
    respuesta:"simbolo"
  },
  {
    id:'T',
    pregunta:" Ciencia que trata de Dios",
    respuesta:"teologia"
  },
  {
    id:'U',
    pregunta:" Elemento químico metálico, radiactivo, uno de cuyos isótopos se utilizó en la primera bomba atómica",
    respuesta:"uranio"
  },
  {
    id:'V',
    pregunta:"Casa de recreo aislada en el campo",
    respuesta:"villa"
  },
  {
    id:'W',
    pregunta:"En informática, la World Wide Web ",
    respuesta:"www"
  },
  {
    id:'X',
    pregunta:"Enunciado o conjunto coherente de enunciados orales o escritos",
    respuesta:"texto"
  },
  {
    id:'Y',
    pregunta:"Máquina o conjunto de máquinas que sirven para cambiar los decorados en el escenario de un teatro",
    respuesta:"tramoya"
  },
  {
    id:'Z',
    pregunta:" Lugar en que se conservan, cuidan y a veces se crían diversas especies animales para que sean contempladas por el público y para su estudio",
    respuesta:"zoologico"
  }

]

//preguntas que ya han sido contestadas. Si estan en 0 no han sido contestadas
var estadoPreguntas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
var cantidadAcertadas = 0;

//variable que mantiene el num de pregunta acual
var numPreguntaActual = -1;

// Obtener el elemento del cronómetro
const timer = document.getElementById("tiempo");
// Establecer el tiempo inicial en 180 segundos
let timeLeft = TIEMPO_DEL_JUEGO;
var countdown;

//boton comenzar
var comenzar = document.getElementById("comenzar");
comenzar.addEventListener("click", function(event) {
  document.getElementById("pantalla-inicial").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
});

//Creamos el circúlo con las letras de la A a la Z
const container = document.querySelector(".container");
for (let i = 1; i <= TOTAL_PREGUNTAS; i++) {
  const circle = document.createElement("div");
  circle.classList.add("circle");
  circle.textContent = String.fromCharCode(i + 96);
  circle.id = String.fromCharCode(i + 96).toUpperCase();
  container.appendChild(circle);

  const angle = ((i - 1) / TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI / 2);
  const x = Math.round(95 + 200 * Math.cos(angle));
  const y = Math.round(95 + 200 * Math.sin(angle));
  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;
}


//Función que carga la pregunta
function cargarPregunta(){
  numPreguntaActual++;
  //controlo si he llegado al final de las preguntas, para comenzar de nuevo
  if(numPreguntaActual>=TOTAL_PREGUNTAS){
    numPreguntaActual=0;
  }

  if(estadoPreguntas.indexOf(0)>=0){ //Controlo que todavía hallan preguntas por contestar
    while(estadoPreguntas[numPreguntaActual]==1){
      numPreguntaActual++;
      if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual=0;
      }
    }
 
    document.getElementById("letra-pregunta").textContent = bd_juego[numPreguntaActual].id
    document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.add("pregunta-actual");
  }
  else{
    clearInterval(countdown);
    mostrarPantallaFinal();
  }

}

//detecto cada vez que hay un cambio de tecla en el input
var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event) {
  //detecto si la tecla presionada es ENTER
  if (event.keyCode === 13) {
    if(respuesta.value==""){
      alert("Debe ingresar un valor!!");
      return;
    }
    //obtengo la respuesta ingresada
    var txtRespuesta = respuesta.value;
    controlarRespuesta(txtRespuesta.toLowerCase());
  }
});

//Función que controla la respuesta
function controlarRespuesta(txtRespuesta){
  //controlo si la respuesta es correcta
  if(txtRespuesta == bd_juego[numPreguntaActual].respuesta){
    //alert("Respuesta correcta")
    cantidadAcertadas++;

    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("pregunta-actual");
    document.getElementById(letra).classList.add("bien-respondida");

  }else{
    //alert("respuesta incorrecta")
    //actualizo el estado de las pregunta actual a 1, indicando que ya esta respondida
    estadoPreguntas[numPreguntaActual] = 1;
    var letra =  bd_juego[numPreguntaActual].id;
    //quito l clase del estilo de pregunta actual
    document.getElementById(letra).classList.remove("pregunta-actual");
    //agrego la clase del estilo de pregunta mal respondida
    document.getElementById(letra).classList.add("mal-respondida");

  }
  respuesta.value="";
  cargarPregunta();
}


//botón para pasar de pregunta sin contestar
var pasar = document.getElementById("pasar");
pasar.addEventListener("click", function(event) {
  var letra =  bd_juego[numPreguntaActual].id;
  document.getElementById(letra).classList.remove("pregunta-actual");

  cargarPregunta();
});


// Crear la función que se encargará de actualizar el cronómetro cada segundo
function largarTiempo(){
  countdown = setInterval(() => {
    // Restar un segundo al tiempo restante
    timeLeft--;
 
    // Actualizar el texto del cronómetro con el tiempo restante
    timer.innerText = timeLeft;
 
    // Si el tiempo llega a 0, detener el cronómetro
    if (timeLeft < 0) {
      clearInterval(countdown);
      mostrarPantallaFinal();
    }
  }, 1000);
}

//muestro la pantlla final
function mostrarPantallaFinal(){
  var score=(cantidadAcertadas*100/26);
  document.getElementById("acertadas").textContent = cantidadAcertadas;
  document.getElementById("score").textContent = score.toFixed() + "% de acierto";
  document.getElementById("pantalla-juego").style.display =  "none";
  document.getElementById("pantalla-final").style.display =  "block";
}

//boton para recomenzar el juego
var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event) {
  numPreguntaActual = -1;
  timeLeft = TIEMPO_DEL_JUEGO;
  timer.innerText = timeLeft;
  cantidadAcertadas = 0;
  estadoPreguntas = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

  //quito las clases de los circulos
  var circulos = document.getElementsByClassName("circle");
  for(i=0;i<circulos.length;i++){
    circulos[i].classList.remove("bien-respondida");
    circulos[i].classList.remove("mal-respondida");
  }

  document.getElementById("pantalla-final").style.display = "none";
  document.getElementById("pantalla-juego").style.display = "block";
  largarTiempo();
  cargarPregunta();
})