const fileInput = document.getElementById("file");
const saveBtn = document.getElementById("save");

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

fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);
