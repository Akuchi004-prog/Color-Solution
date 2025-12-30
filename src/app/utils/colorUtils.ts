/**
 * Extracts the dominant color from an image element using Canvas.
 * Returns a HEX string.
 */
export const getDominantColor = (imgElement: HTMLImageElement): string => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return '#000000';

  const width = imgElement.naturalWidth || imgElement.width;
  const height = imgElement.naturalHeight || imgElement.height;

  canvas.width = width;
  canvas.height = height;
  
  context.drawImage(imgElement, 0, 0, width, height);
  
  // Sample pixels from the center of the image to avoid borders/backgrounds if possible,
  // or just sample the whole image if small enough.
  // For performance, we can resize the draw to a smaller canvas (e.g. 50x50)
  
  const smallCanvas = document.createElement('canvas');
  const ctx = smallCanvas.getContext('2d');
  if (!ctx) return '#000000';
  
  smallCanvas.width = 50;
  smallCanvas.height = 50;
  ctx.drawImage(imgElement, 0, 0, 50, 50);
  
  const imageData = ctx.getImageData(0, 0, 50, 50).data;
  const colorCounts: Record<string, number> = {};
  let maxCount = 0;
  let dominantColor = '#000000';

  // Iterate over pixels (step by 4 for RGBA)
  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const a = imageData[i + 3];

    // Skip transparent pixels
    if (a < 128) continue;

    // Quantize colors to group similar ones (round to nearest 10)
    const qr = Math.round(r / 10) * 10;
    const qg = Math.round(g / 10) * 10;
    const qb = Math.round(b / 10) * 10;

    const key = `${qr},${qg},${qb}`;
    colorCounts[key] = (colorCounts[key] || 0) + 1;

    if (colorCounts[key] > maxCount) {
      maxCount = colorCounts[key];
      // Convert back to hex for the result
      dominantColor = rgbToHex(qr, qg, qb);
    }
  }

  return dominantColor;
};

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}
