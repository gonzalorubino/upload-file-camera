const preview = document.getElementById('previewImg')
const inputElement = document.getElementById('upload');

const makePreview = (event) => {
    if (event.target.files && event.target.files[0]) {
        const img = event.target.files[0];

        // <img...> le seteo el SRC como el file uplodeado
        preview.src = URL.createObjectURL(img);
    }
};

upload.addEventListener("change", (ev) => {
    makePreview(ev);
});

document.forms.fileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const result = document.querySelector(".result");

    fetch("/", {
            body: new FormData(event.target),
            method: "POST",
        })
        .then(() => {
            result.innerText = "Success";
            result.classList.add('text-success');
        })
        .catch((error) => {
            result.innerText = `Failed: ${error}`;
            result.classList.add('text-danger');
        });
});
