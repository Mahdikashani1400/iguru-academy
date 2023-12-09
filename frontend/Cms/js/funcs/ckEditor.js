let ckEditorBody =
    ClassicEditor
        .create(document.querySelector('#editor'), {


            language: 'fa',

        })
        .catch(error => {
            console.error(error);
        });

// export { ckEditorBody }