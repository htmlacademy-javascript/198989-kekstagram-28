import {setOnFormSubmit, setOnUploadFormChange, closeModal} from './user-form.js';
import {createGallery} from './gallery.js';
import {getData, sendData} from './api.js';
import {showAlert, debounce, getSorteredPhotos, initSort} from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

setOnUploadFormChange();

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  const debouncedCreateGallery = debounce(createGallery);
  initSort(data, debouncedCreateGallery);
  createGallery(getSorteredPhotos());
} catch (err) {
  showAlert(err.message);
}
