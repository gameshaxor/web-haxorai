const firebaseConfig = {
  apiKey: "AIzaSyDelR6U0wODl_68ktPH-sd_gk0ZcwjG6Ek",
  authDomain: "webhaxor.firebaseapp.com",
  databaseURL: "https://webhaxor-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "webhaxor",
  storageBucket: "webhaxor.appspot.com",
  messagingSenderId: "1012640228111",
  appId: "1:1012640228111:web:55fd66da4210c5120c547a",
  measurementId: "G-PBGR4TXJ2W"
};
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const storageRef = firebase.storage().ref();
const filesRef = firebase.database().ref("open");

const info = document.getElementById('info');
const editor = document.getElementById('editor');
const saveBtn = document.getElementById('save-btn');
const cancelBtn = document.getElementById('cancel-btn');
const fileInput = document.getElementById('fileInput');
const filenameDisplay = document.getElementById('filenameDisplay');

const params = new URLSearchParams(window.location.search);
const expectedFilename = params.get('file');
filenameDisplay.textContent = expectedFilename || '(no filename specified)';

if (!expectedFilename) {
  info.textContent = 'Error: No filename specified in URL.';
  fileInput.style.display = 'none';
  saveBtn.style.display = 'none';
  cancelBtn.style.display = 'none';
  editor.style.display = 'none';
}

let fileKey = null;
let userEmail = null;
let codeEditor = null;

auth.onAuthStateChanged(user => {
  if (!user) {
    info.textContent = 'You must login first. Redirecting to login...';
    fileInput.style.display = 'none';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    editor.style.display = 'none';
    setTimeout(() => {
      window.location.href = './'; // kembali ke index.html (https://web.haxorai.com/console)
    }, 3000);
    return;
  }
  userEmail = user.email;

  filesRef.orderByChild('name').equalTo(expectedFilename).once('value').then(snapshot => {
    if (!snapshot.exists()) {
      info.textContent = 'File not found in database.';
      fileInput.style.display = 'none';
      saveBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
      editor.style.display = 'none';
      return;
    }
    const files = snapshot.val();
    for (const key in files) {
      if (files[key].userProfile?.email === userEmail) {
        fileKey = key;
        break;
      }
    }
    if (!fileKey) {
      info.textContent = "You don't have permission to edit this file.";
      fileInput.style.display = 'none';
      saveBtn.style.display = 'none';
      cancelBtn.style.display = 'none';
      editor.style.display = 'none';
      return;
    }
    info.textContent = `Please upload the file with name: "${expectedFilename}" to start editing.`;
    fileInput.style.display = 'inline-block';
  }).catch(err => {
    info.textContent = 'Error querying database: ' + err.message;
    fileInput.style.display = 'none';
    saveBtn.style.display = 'none';
    cancelBtn.style.display = 'none';
    editor.style.display = 'none';
  });
});

fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  if (file.name !== expectedFilename) {
    alert(`File name must be exactly "${expectedFilename}". Please select the correct file.`);
    fileInput.value = '';
    return;
  }

  // Ubah title halaman sesuai nama file
  document.title = `Edit File HTML - ${file.name}`;

  const reader = new FileReader();
  reader.onload = (e) => {
    // Munculkan tab, editor, preview
    document.getElementById('tabContainer').style.display = 'flex';
    document.getElementById('editorContainer').style.display = '';
    document.getElementById('previewContainer').style.display = '';

    if (!codeEditor) {
      codeEditor = CodeMirror.fromTextArea(editor, {
        mode: "htmlmixed",
        theme: "material-darker",
        lineNumbers: true,
        tabSize: 2,
        indentWithTabs: true,
        lineWrapping: true
      });
    }
    codeEditor.setValue(e.target.result);

    saveBtn.disabled = false;
    info.textContent = `Editing file: ${expectedFilename}`;
  };
  reader.readAsText(file);
});

// Saat Save ditekan, ambil konten dari CodeMirror
saveBtn.addEventListener('click', () => {
  saveBtn.disabled = true;
  info.textContent = 'Saving...';
  info.style.color = '#eee';

  if (!fileKey || !userEmail) {
    info.textContent = 'Missing file metadata.';
    saveBtn.disabled = false;
    return;
  }

  const content = codeEditor ? codeEditor.getValue() : editor.value;
  const blob = new Blob([content], { type: 'text/html' });

  storageRef.child('open/' + expectedFilename).put(blob).then(() => {
    const sizeKB = (blob.size / 1024).toFixed(2) + ' KB';
    const created = new Date().toLocaleString();
    return filesRef.child(fileKey).update({ size: sizeKB, created: created }).then(() => {
      info.textContent = 'File saved successfully.';
      info.style.color = '#00ff91';
      saveBtn.disabled = false;
      setTimeout(() => {
        info.textContent = `Editing file: ${expectedFilename}`;
        info.style.color = '#eee';
      }, 3000);
    });
  }).catch(err => {
    info.textContent = 'Error saving file: ' + err.message;
    info.style.color = '#ff6b6b';
    saveBtn.disabled = false;
  });
});

// Tombol cancel dengan konfirmasi
cancelBtn.addEventListener('click', () => {
  const confirmExit = confirm("Are you sure you want to leave this page? Unsaved changes will be lost.");
  if (confirmExit) {
    window.close();
  }
});

// Peringatan saat halaman akan ditutup atau direfresh
window.addEventListener("beforeunload", function (e) {
  const confirmationMessage = "Are you sure you want to leave this page? Unsaved changes will be lost.";
  e.preventDefault();
  e.returnValue = confirmationMessage;
  return confirmationMessage;
});