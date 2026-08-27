import type { ToolContent } from './types';

export const imageResizerContent: ToolContent = {
  slug: 'image-resizer',
  intro: ['Resize and recompress an image in your browser. Choose a file, set the output dimensions, keep or unlock the aspect ratio, and download a JPEG, PNG, or WebP copy.', 'The image is decoded and drawn with the browser canvas API. It is not uploaded.'],
  sections: [
    { heading: 'Resize versus crop', paragraphs: ['Resizing changes the width and height of the whole image. Cropping removes part of the image before resizing. This tool preserves the full frame; use an editor when you need to change the composition.'] },
    { heading: 'Choose dimensions carefully', paragraphs: ['Keeping the aspect ratio prevents stretching. If you unlock it, you can set any width and height, but circles and faces may look distorted. Reducing pixel dimensions usually reduces file size; increasing them cannot recreate detail that was never captured.'] },
    { heading: 'JPEG, PNG, or WebP', paragraphs: ['JPEG is a good choice for photographs and supports quality control. PNG preserves sharp edges and transparency but can be larger. WebP often provides a smaller modern web image, although you should check compatibility for older workflows.'], tip: 'Keep the original file and treat the downloaded image as an export, especially when resizing down.' },
  ],
  faqs: [
    { q: 'Are my images uploaded?', a: 'No. The file is read and processed in your browser using an image element and canvas.' },
    { q: 'How do I keep an image from stretching?', a: 'Leave Keep ratio enabled. Changing one dimension then calculates the other from the original aspect ratio.' },
    { q: 'Does resizing improve image quality?', a: 'Reducing dimensions can make a file faster to load. Enlarging an image cannot restore missing detail and may look soft.' },
    { q: 'Which format is best?', a: 'JPEG suits photographs, PNG suits transparency and crisp graphics, and WebP is often a compact web-friendly choice.' },
  ],
  relatedSlugs: ['qr-code-generator', 'color-picker'],
};
