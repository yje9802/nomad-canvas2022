const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
// draw settings
const lineWidth = document.querySelector("#line-width");
const currWidth = document.querySelector("span#current-width");
const color = document.querySelector("#color");
const colorPickerResult = document.querySelector(".current-color");
const colorOptions = Array.from(
	document.getElementsByClassName("color-option")
);
const customColors = Array.from(document.querySelectorAll(".custom_preset"));
// mode and etc btns
const fillBtn = document.querySelector("#fill");
const lineBtn = document.querySelector("#line");
const straightBtn = document.querySelector("#straight");
const autoFillBtn = document.querySelector("#auto-fill");
const clearBtn = document.querySelector("#reset-canvas");
const eraseBtn = document.querySelector("#eraser");
const rectBtn = document.querySelector("#rectangle");
const circleBtn = document.querySelector("#circle");

const straightBtnInstruction = document.querySelector(".mode-btns-instruction");
const clearModal = document.querySelector(".clear-modal");

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
// 직선 그리기 조건을 위한 변수
let firstX = null;
let firstY = null;

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
	// 면적 자동 채우기 모드 선택시
	if (isAutoFilling) {
		ctx.fill();
	}
	ctx.beginPath();
}
function onCanvasClick(event) {
	if (isFilling) {
		bgColor = currColor;
		ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	} else if (isStraight) {
		if (firstX === null && firstY === null) {
			firstX = event.offsetX;
			firstY = event.offsetY;
		} else if (firstX !== null && firstY !== null) {
			ctx.moveTo(firstX, firstY);
			ctx.lineTo(event.offsetX, event.offsetY);
			ctx.stroke();
			firstX = event.offsetX;
			firstY = event.offsetY;
		}
	}
}

// 선굵기 변경 관련 함수
function onLineWidthChanged(event) {
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
	// font preview update
	onTextInput();
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
	// font preview update
	onTextInput();
}
// custom preset 관련
function onCustomClick(event) {
	if (event.target.classList.contains("preset-selected")) {
		currColor = event.target.dataset.color;
		ctx.strokeStyle = currColor;
		ctx.fillStyle = currColor;
		// 색상 선택기 value도 바꿔줌
		color.value = currColor;
		colorPickerResult.innerText = currColor;
	} else {
		event.target.style.backgroundColor = currColor;
		event.target.dataset.color = currColor;
		event.target.classList.add("preset-selected");
	}
	// font preview update
	onTextInput();
}

// 직선 그리기 모드에 대한 설명을 가리는 함수
function hideInstruction() {
	straightBtnInstruction.classList.add("hidden");
}

// 채우기 모드 버튼 선택시
function onFillClick() {
	isFilling = true;
	isStraight = false;
	isAutoFilling = false;
	hideInstruction();
	fillBtn.classList.add("mode-selected");
	currMode.classList.remove("mode-selected");
	currMode = fillBtn;
}
function onLineClick() {
	isFilling = false;
	isStraight = false;
	isAutoFilling = false;
	hideInstruction();
	lineBtn.classList.add("mode-selected");
	currMode.classList.remove("mode-selected");
	currMode = lineBtn;
}
// 직선 그리기 모드 버튼 선택시
function onStraightClick() {
	// 직선 그리기 버튼을 이미 클릭한 상태에서 또 누르면 직선 그리는 starting point (firstX, firstY) 초기화
	if (straightBtn.classList.contains("mode-selected")) {
		firstX = null;
		firstY = null;
		console.log(firstX, firstY);
	} else {
		isStraight = true;
		isFilling = false;
		isAutoFilling = false;
		straightBtn.classList.add("mode-selected");
		currMode.classList.remove("mode-selected");
		currMode = straightBtn;
	}
	straightBtnInstruction.classList.remove("hidden");
}
// 면적 자동 채우기 모드 버튼 클릭시
function onAutoFillClick() {
	isAutoFilling = true;
	isFilling = false;
	isStraight = false;
	hideInstruction();
	autoFillBtn.classList.add("mode-selected");
	currMode.classList.remove("mode-selected");
	currMode = autoFillBtn;
}
function clearCanvas() {
	isFilling = false;
	isStraight = false;
	isAutoFilling = false;
	hideInstruction();

	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, 800, 800);
	ctx.lineWidth = 10;
	lineWidth.value = "10";
	currWidth.innerText = lineWidth.value;

	selectedColor.classList.remove("color-selected");
	document.querySelector(".color-default").classList.add("color-selected");
	color.value = "#000000";
	colorPickerResult.innerText = "#000000";
	ctx.strokeStyle = "black";
	ctx.fillStyle = "black";

	// custom preset 초기화
	const customs = Array.from(
		document.getElementsByClassName("preset-selected")
	);
	customs.forEach((customColor) => {
		customColor.style.backgroundColor = "white";
		customColor.dataset.color = "";
		customColor.classList.remove("preset-selected");
	});

	// 캔버스 초기화 후 기존 디폴트 세팅으로 돌아가야 하기에
	// 선 그리기 버튼이 선택되어 있어야 함
	if (lineBtn.classList.contains("mode-selected")) {
		currMode = lineBtn;
	} else {
		lineBtn.classList.add("mode-selected");
		currMode.classList.remove("mode-selected");
		currMode = lineBtn;
	}
	// 캔버스 초기화 작업 후 모달창 닫아줌
	clearModal.classList.add("hidden");
}
function onClearClick() {
	clearModal.classList.remove("hidden");
	const clearYes = clearModal.querySelector(".clear-yes");
	const clearNo = clearModal.querySelector(".clear-no");
	clearYes.addEventListener("click", clearCanvas);
	clearNo.addEventListener("click", () => {
		clearModal.classList.add("hidden");
	});
}
function onEraseClick() {
	isFilling = false;
	isStraight = false;
	isAutoFilling = false;
	hideInstruction();

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
customColors.forEach((custom) =>
	custom.addEventListener("click", onCustomClick)
);

fillBtn.addEventListener("click", onFillClick);
lineBtn.addEventListener("click", onLineClick);
straightBtn.addEventListener("click", onStraightClick);
autoFillBtn.addEventListener("click", onAutoFillClick);
// 캔버스 초기화
clearBtn.addEventListener("click", onClearClick);
// 지우개 버튼 활성화
eraseBtn.addEventListener("click", onEraseClick);
