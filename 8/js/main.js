import {loadPhoto} from './user-form.js';
import {createGallery} from './gallery.js';
import {createPhotos} from './data.js';

createGallery(createPhotos());
loadPhoto();
