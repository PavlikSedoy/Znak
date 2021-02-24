const uploadInput = document.getElementById('file'),
    fileNameSpan = document.getElementById('chooseFileText'),
    uploadIcon = document.getElementById('uploadIcon'),
    uploadCheckIcon = document.getElementById('uploadCheckIcon');

uploadInput.addEventListener('change', e => {
    let fileName, res;

    if ( uploadInput.value ) {
        fileName = e.srcElement.files[0].name;
        fileNameSpan.innerText = fileName;
        uploadIcon.style.display = 'none';
        uploadCheckIcon.style.display = 'block';
    }
});