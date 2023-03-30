import {setFormSubmitHandler, setUploadFormChangeHandler, closeModal} from './user-form.js';
import {createGallery} from './gallery.js';
import {getData, sendData} from './api.js';
import {showAlert, debounce, getSorteredPhotos, init} from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

setUploadFormChangeHandler();

setFormSubmitHandler(async (data) => {
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
  init(data, debouncedCreateGallery);
  createGallery(getSorteredPhotos());
} catch (err) {
  showAlert(err.message);
}
