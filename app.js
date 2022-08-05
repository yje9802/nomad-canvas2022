const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// draw settings
const lineWidth = document.querySelector("#line-width");
const color = document.querySelector("#color");
const colorPickerResult = document.querySelector(".current-color");
const colorOptions = Array.from(
	document.getElementsByClassName("color-option")
);
// mode and etc btns
const fillBtn = document.querySelector("#fill");
const lineBtn = document.querySelector("#line");
const straightBtn = document.querySelector("#straight");
const clearBtn = document.querySelector("#reset-canvas");
const eraseBtn = document.querySelector("#eraser");
const rectBtn = document.querySelector("#rectangle");
const circleBtn = document.querySelector("#circle");

// 하이퍼파라미터
const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineCap = "round";
ctx.lineWidth = lineWidth.value;

// 조건 변수들
let isPainting = false;
let isFilling = false;
let isStraight = false;
let isAutoFilling = false;
let currColor = "black";
let bgColor = "white";
let currMode = document.querySelector(".mode-selected");
let selectedColor = document.querySelector(".color-selected");

// 캔버스 위에서 마우스가 움직이면
function onMove(event) {
	if (isPainting) {
		ctx.lineTo(event.offsetX, event.offsetY);
		ctx.stroke();
		return;
	}
	ctx.beginPath();
	ctx.moveTo(event.offsetX, event.offsetY);
}
function startPainting() {
	isPainting = true;
}
function cancelPainting() {
	isPainting = false;
}
function onCanvasClick(event) {
	if (isFilling) {
		bgColor = currColor;
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}
}

// 선굵기 변경 관련 함수
function onLineWidthChanged(event) {
	const currWidth = document.querySelector("span#current-width");
	ctx.lineWidth = event.target.value;
	// 변경되는 width value를 옆에 표시해줌
	currWidth.innerText = event.target.value;
}
// color picker 관련
function onColorChange(event) {
	currColor = event.target.value;
	ctx.strokeStyle = currColor;
	ctx.fillStyle = currColor;
	// color picker에서 선택한 색상이 무엇인지 헥사코드 표시
	colorPickerResult.innerText = currColor;
}
// color preset 관련
function onColorClick(event) {
	currColor = event.target.dataset.color;
	ctx.strokeStyle = currColor;
	ctx.fillStyle = currColor;
	// 색상 선택기 value도 바꿔줌
	color.value = currColor;
	colorPickerResult.innerText = currColor;
	// 선택된 컬러가 무엇인지 표시하고, 이전 컬러는 표시 삭제
	event.target.classList.add("color-selected");
	selectedColor.classList.remove("color-selected");
	selectedColor = event.target;
}

// 채우기 모드 버튼 선택시
function onFillClick() {
	isFilling = true;
	fillBtn.classList.add("mode-selected");
	currMode.classList.remove("mode-selected");
	currMode = fillBtn;
}
function onLineClick() {
	isFilling = false;
	isStraight = false;
	isAutoFilling = false;
	lineBtn.classList.add("mode-selected");
	currMode.classList.remove("mode-selected");
	currMode = lineBtn;
}

function onClearClick() {
	isFilling = false;
	isStraight = false;
	isAutoFilling = false;

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 800, 800);
	ctx.lineWidth = 5;
	lineWidth.value = "5";

	clearBtn.classList.add("mode-selected");
	currMode.classList.remove("mode-selected");
	currMode = clearBtn;
}
function onEraseClick() {
	isFilling = false;
	isStraight = false;
	isAutoFilling = false;

	ctx.strokeStyle = bgColor;

	eraseBtn.classList.add("mode-selected");
	currMode.classList.remove("mode-selected");
	currMode = eraseBtn;
}

// 캔버스 위에 마우스의 이벤트에 따라
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change", onLineWidthChanged);
color.addEventListener("change", onColorChange);
colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

fillBtn.addEventListener("click", onFillClick);
lineBtn.addEventListener("click", onLineClick);
// 캔버스 초기화
clearBtn.addEventListener("click", onClearClick);
// 지우개 버튼 활성화
eraseBtn.addEventListener("click", onEraseClick);
