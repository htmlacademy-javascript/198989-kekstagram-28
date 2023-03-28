import {setOnFormSubmit, loadPhoto, closeModal} from './user-form.js';
import {createGallery} from './gallery.js';
//import {createPhotos} from './data.js';
import {getData, sendData} from './api.js';
import {showAlert} from './util.js';
import {showSuccessMessage, showErrorMessage} from './message.js';

//createGallery(createPhotos());
loadPhoto();

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
  createGallery(data);
} catch (err) {
  showAlert(err.message);
}
