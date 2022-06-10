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

document.forms.fileForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const result = document.querySelector(".result");
    const resultImg = document.getElementById("imgResult");
    
    // basado en : https://spacejelly.dev/posts/how-to-programmatically-upload-images-to-cloudinary-in-react-next-js/
    const formData = new FormData();

    for (const file of event.target[1].files) {
        formData.append('file', file);
    }

    // Debe ser : 'upload_preset' , 'MI PRESET'
    formData.append('upload_preset', 'da-vinci-uploads');

    // debe ser https://api.cloudinary.com/v1_1/[TU NOMBRE DE CLOUDINARY]/image/upload
    const data = await fetch('https://api.cloudinary.com/v1_1/dgsdmtyxf/image/upload', {
        method: 'POST',
        body: formData
    }).then(r => r.json())
    .then((json) => {
        result.innerText = JSON.stringify(json);
        result.classList.add('text-success');
        resultImg.src = json.secure_url;

        return json;
    })
    .then(json => {
        const newForm = new FormData();

        newForm.set('name', 'upload-form')
        newForm.set('data', JSON.stringify(json));

        fetch("/", {
                body: newForm,
                method: "POST",
            })
            .then(() => {
                console.log('success');
            })
            .catch((error) => {
                console.log('error');
            });
    })
    .catch((error) => {
        console.log('error!!', error);
    });

    /** fetch("/", {
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
    */
});
