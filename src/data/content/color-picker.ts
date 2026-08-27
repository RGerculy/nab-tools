import type { ToolContent } from './types';

export const colorPickerContent: ToolContent = {
  slug: 'color-picker',
  intro: [
    'Colors are specified differently depending on where you use them: HEX in HTML and CSS, RGB in design tools and code, HSL when you are reasoning about hue and lightness, CMYK for print. This picker converts between all of them instantly — and checks text contrast against WCAG standards while you work.',
    'Everything runs locally in your browser: pick a color visually, type a value in any format, and all the others update live.',
  ],
  sections: [
    {
      heading: 'HEX, RGB, HSL — what is the difference?',
      paragraphs: [
        'All three describe the same color; they just use different coordinates:',
      ],
      list: [
        'HEX (#00D4AA) — the web standard. Six hex digits: two each for red, green, blue. Compact and universally supported in CSS/HTML.',
        'RGB (rgb(0, 212, 170)) — the same red/green/blue channels, written in decimal 0–255. Common in design tools and JavaScript.',
        'HSL (hsl(166, 100%, 42%)) — hue (0–360°), saturation, lightness. Intuitive for creating palettes: change hue to shift the color, adjust lightness for shades and tints.',
        'CMYK — cyan/magenta/yellow/key. The print model. Convert here when handing colors to a printer; expect slight shifts versus screen.',
      ],
    },
    {
      heading: 'Reading color from a screen or image',
      paragraphs: [
        'To grab a color from anywhere on your screen: on Windows, use PowerToys Color Picker (Win+Shift+C) or the built-in Snipping Tool; on macOS, the Digital Color Meter app; on mobile, screenshot and use the eyedropper in an editing app.',
        'When you have the hex code, paste it here to see every other format, the matching shades, and how it performs against white and black text.',
      ],
    },
    {
      heading: 'WCAG contrast ratios and accessibility',
      paragraphs: [
        'Text needs sufficient contrast against its background to be readable — especially for users with low vision. WCAG defines ratios: 4.5:1 for normal text, 3:1 for large text (AA), and 7:1 for enhanced (AAA) compliance.',
        'This tool computes the contrast ratio of your color against both white and black text in real time, and labels the WCAG level achieved. If you design interfaces, make this check a habit — it is a legal requirement in many jurisdictions and a usability win everywhere.',
      ],
    },
    {
      heading: 'Building a palette from one color',
      paragraphs: [
        'The HSL view is the fastest way to build harmonious palettes. Start from your base color, then: vary lightness for shades (dark) and tints (light); nudge the hue ±30° for analogous colors; move hue 180° for a complementary accent; hold lightness constant and vary saturation for a muted set.',
        'Contrast-check every pair you plan to use for text — pretty palettes fail accessibility constantly, and this tool tells you exactly where.',
      ],
    },
  ],
  faqs: [
    { q: 'What is the difference between HEX and RGB?', a: 'Both are the same red/green/blue channels. HEX uses two hex digits per channel (00–FF); RGB uses decimal 0–255. Converting is pure base conversion.' },
    { q: 'What is HSL and why use it?', a: 'HSL describes color as hue (0–360°), saturation (%), and lightness (%). It is intuitive for creating palettes — adjust lightness for shades, hue for related colors — without guessing at channel values.' },
    { q: 'What is a WCAG contrast ratio?', a: 'A number (1:1 to 21:1) measuring the luminance difference between text and background. WCAG AA requires 4.5:1 for normal text, 7:1 for AAA.' },
    { q: 'Why does my print color look different from the screen?', a: 'Screens use additive RGB light; print uses subtractive CMYK ink. Gamuts differ, so CMYK conversion shifts colors. Always proof with your printer\u2019s profile.' },
    { q: 'Can I convert CMYK to HEX?', a: 'Yes — via RGB as an intermediate. The conversion is exact mathematically, but the printed result depends on the paper, ink, and printer profile.' },
    { q: 'What color format should I use in CSS?', a: 'HEX is the most common and compact. Modern CSS also supports hsl() and color-mix(), which are more maintainable for theming since you can adjust lightness programmatically.' },
  ],
  relatedSlugs: ['word-counter', 'qr-code-generator', 'password-generator'],
};
