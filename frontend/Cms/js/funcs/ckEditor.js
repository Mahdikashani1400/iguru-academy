let ckEditorBody =
    ClassicEditor
        .create(document.querySelector('#descCourse'), {


            language: 'fa',

        })
        .catch(error => {
            console.error(error);
        });

export { ckEditorBody }