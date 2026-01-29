const tabEdit = document.getElementById('tab-edit');
const tabPreview = document.getElementById('tab-preview');
const editorContainer = document.getElementById('editorContainer');
const previewContainer = document.getElementById('previewContainer');
const previewFrame = document.getElementById('previewFrame');

function showTab(tab) {
  if (tab === 'edit') {
    tabEdit.classList.add('active');
    tabPreview.classList.remove('active');

    // Fade out preview
    previewContainer.classList.remove('active');
    setTimeout(() => {
      previewContainer.classList.add('hidden');

      // Fade in editor
      editorContainer.classList.remove('hidden');
      setTimeout(() => editorContainer.classList.add('active'), 10);
    }, 300);

  } else if (tab === 'preview') {
    tabPreview.classList.add('active');
    tabEdit.classList.remove('active');

    // Update preview content
    const htmlContent = codeEditor.getValue();
    const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();

    // Fade out editor
    editorContainer.classList.remove('active');
    setTimeout(() => {
      editorContainer.classList.add('hidden');

      // Fade in preview
      previewContainer.classList.remove('hidden');
      setTimeout(() => previewContainer.classList.add('active'), 10);
    }, 300);
  }
}

tabEdit.addEventListener('click', () => showTab('edit'));
tabPreview.addEventListener('click', () => showTab('preview'));