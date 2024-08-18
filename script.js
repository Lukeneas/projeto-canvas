//passo a passo para desenhar no canvas
// - quando afundar o CLICK do MOUSE, ATIVE o MODO DESENHO
// - quando o MOUSE se MOVER, se o MODO DESENHO estiver ACIONADO, DESENHE
// - quando o CLICK do mouse LEVANTAR, DESATIVE MODO DESENHO

//initial data
let currentColor = "black";
let screen = document.querySelector("#tela"); //canvas
//contexto do Canvas
let ctx = screen.getContext("2d"); //contexto 2d do canvas
//condicao para desenhar no mouseMove ativada no mouseDown
let canDraw = false;
//pos mouse
let mouseX = 0;
let mouseY = 0;

//functions
const colorClickEvent = (e) => {
  let color = e.target.getAttribute("data-color");
  currentColor = color;
  document.querySelector(".color.active").classList.remove("active");
  e.target.classList.add("active");
};
const mouseDownEvent = (e) => {
  console.log("clicou mouse");
  canDraw = true;
  //e.pageX e e.pageY sao relacionados à pagina completa
  mouseX = e.pageX - screen.offsetLeft;
  //ponto extremo da pagina - ponto extremo de screen, para que comece do 0
  mouseY = e.pageY - screen.offsetTop;
};
const mouseMoveEvent = (e) => {
  if (canDraw) {
    draw(e.pageX, e.pageY);
  }
};
const mouseUpEvent = () => {
  console.log("soltou mouse");
  canDraw = false;
};
const draw = (x, y) => {
  let pointX = x - screen.offsetLeft;
  let pointY = y - screen.offsetTop;

  ctx.beginPath(); //começa o caminho para desenhar

  ctx.lineWidth = 5; //espessura da linha
  ctx.lineJoin = "round"; //formato da linha
  ctx.moveTo(mouseX, mouseY); //mova para pos ini
  ctx.lineTo(pointX, pointY); //faça uma linha ate pos final

  ctx.closePath(); //fecha o caminho

  ctx.strokeStyle = currentColor; //cor de linha
  ctx.stroke(); //preencha com a cor

  //ponto inicial = ponto final anterior (ocorre centena de vezes)
  mouseX = pointX;
  mouseY = pointY;
};
const clearScreen = () => {
    ctx.setTransform(1, 0, 0, 1, 0, 0); //zera o cursor e processo de desenho
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height); //limpa por completo
}
//events
document.querySelectorAll(".colorArea .color").forEach((i) => {
  i.addEventListener("click", colorClickEvent);
});
screen.addEventListener("mousedown", mouseDownEvent);
screen.addEventListener("mousemove", mouseMoveEvent);
screen.addEventListener("mouseup", mouseUpEvent); //mouseup >preciso> click
document.querySelector('.clear').addEventListener("click",clearScreen);

