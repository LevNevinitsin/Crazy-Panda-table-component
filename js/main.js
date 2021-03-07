import { createComponent } from './component.js';

const MAX_ELEMENTS_NUMBER = 50;

const body = document.body;

body.appendChild(createComponent(MAX_ELEMENTS_NUMBER));
