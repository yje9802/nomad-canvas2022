const fileInput = document.getElementById("file");
const saveBtn = document.getElementById("save");
const showFontStyle = document.getElementById("font_style-set");
const styleContainer = document.querySelector(".text-font_container");
const fontStyles = Array.from(document.getElementsByClassName("font-style"));
const fontLight = document.querySelector(".light");
const fontRegular = document.querySelector(".regular");
const fontBold = document.querySelector(".bold");
const fontSizeSlider = document.querySelector("input.font-size");
const inputText = document.getElementById("text");
const fontPreview = document.querySelector(".font-preview");

// 선택된 폰트 설정
let fontStyle = "Oxygen";
let fontWeight = 400;
let fontSize = "20";

// 현재 선택된 폰트 스타일을 표시하기 위한
let currFontStyle = document.querySelector(".font-style.font-selected");
let currFontWeight = document.querySelector(".font-weight.font-selected");

// 이미지 업로드 + 캔버스에 채워주기
function onFileChange(event) {
	const file = event.target.files[0];
	const url = URL.createObjectURL(file);
	// const image = document.createElement("img");
	const image = new Image();
	image.src = url;
	image.onload = function () {
		ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		fileInput.value = null;
	};
}
// 캔버스 결과물 png 파일로 저장하기
function onSaveClick() {
	const url = canvas.toDataURL();
	const a = document.createElement("a");
	a.href = url;
	a.download = "myDrawing.png";
	// 임의로 링크를 클릭해준 셈
	a.click();
}

// "Set a font style" 텍스트를 클릭하면 텍스트 스타일 설정 보여주기
function onShowFontStyle() {
	styleContainer.classList.remove("hidden");
}
// font style 설정
function onStyleSelected(event) {
	fontStyle = event.target.dataset.font;
	event.target.classList.add("font-selected");
	currFontStyle.classList.remove("font-selected");
	currFontStyle = event.target;

	if (fontStyle === "Mouse Memoirs" || fontStyle === "Square Peg") {
		if (fontLight.classList.contains("hidden") === false) {
			fontLight.classList.add("hidden");
		}
		if (fontBold.classList.contains("hidden") === false) {
			fontBold.classList.add("hidden");
		}
	} else if (
		fontStyle === "Playfair Display" ||
		fontStyle === "Dancing Script"
	) {
		if (fontLight.classList.contains("hidden") === false) {
			fontLight.classList.add("hidden");
		}
		if (fontBold.classList.contains("hidden")) {
			fontBold.classList.remove("hidden");
		}
	} else {
		if (fontLight.classList.contains("hidden")) {
			fontLight.classList.remove("hidden");
		}
		if (fontBold.classList.contains("hidden")) {
			fontBold.classList.remove("hidden");
		}
	}
	onTextInput();
}
function onFontLight() {
	fontWeight = 300;
	if (fontLight.classList.contains("font-selected") === false) {
		fontLight.classList.add("font-selected");
		currFontWeight.classList.remove("font-selected");
		currFontWeight = fontLight;
	}
	onTextInput();
}
function onFontRegular() {
	fontWeight = 400;
	if (fontRegular.classList.contains("font-selected") === false) {
		fontRegular.classList.add("font-selected");
		currFontWeight.classList.remove("font-selected");
		currFontWeight = fontRegular;
	}
	onTextInput();
}
function onFontBold() {
	fontWeight = 700;
	if (fontBold.classList.contains("font-selected") === false) {
		fontBold.classList.add("font-selected");
		currFontWeight.classList.remove("font-selected");
		currFontWeight = fontBold;
	}
	onTextInput();
}
function onFontSliderChange(event) {
	fontSize = String(event.target.value);
	onTextInput();
}
function onTextInput(event) {
	fontPreview.style.fontFamily = fontStyle;
	fontPreview.style.fontSize = String(fontSize) + "px";
	fontPreview.style.fontWeight = fontWeight;
	fontPreview.style.color = currColor;
	fontPreview.innerText = event.target.value;
}

function onDoubleClick(event) {
	const text = inputText.value;
	if (text !== "") {
		// save current styles of ctx
		ctx.save();
		// 텍스트 삽입
		ctx.lineWidth = 1;
		ctx.font = `${fontWeight} ${fontSize}px ${fontStyle}`;
		ctx.fillText(text, event.offsetX, event.offsetY);
		// 텍스트 삽입 후
		ctx.restore();
		inputText.value = null;
		styleContainer.classList.add("hidden");
	}
}

fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);

showFontStyle.addEventListener("click", onShowFontStyle);
fontStyles.forEach((style) => style.addEventListener("click", onStyleSelected));
fontLight.addEventListener("click", onFontLight);
fontRegular.addEventListener("click", onFontRegular);
fontBold.addEventListener("click", onFontBold);
fontSizeSlider.addEventListener("change", onFontSliderChange);
inputText.addEventListener("change", onTextInput);
// 캔버스에 텍스트 삽입
canvas.addEventListener("dblclick", onDoubleClick);
