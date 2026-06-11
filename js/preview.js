"use strict";

import { uploadParaCloudinary } from "./cloudinary.js";

export function preview({ target }) {
  document.getElementById("preview-image").src = URL.createObjectURL(
    target.files[0],
  );
}

document.getElementById("preview-input").addEventListener("change", preview);

