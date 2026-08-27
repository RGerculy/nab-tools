import type { ToolContent } from './types';

export const countdownTimerContent: ToolContent = {
  slug: 'countdown-timer',
  intro: [
    'A countdown timer for the moments that need one: cooking, workouts, pomodoro focus sessions, presentations, or taking a break. Set any time from seconds to hours, pick a preset, and let the big display count down — with an optional alert when time is up.',
    'The timer runs entirely in your browser, works offline, and never sends anything anywhere.',
  ],
  sections: [
    {
      heading: 'The presets and what they are for',
      paragraphs: [],
      list: [
        '1 / 3 / 5 minutes — quick breaks, tea, and short sprints.',
        '10 minutes — standard meeting countdown or a focused work block.',
        '15 minutes — the classic break size between deep-work sessions.',
        '25 minutes — the pomodoro technique: 25 minutes of focus, then a 5-minute break.',
      ],
      tip: 'For pomodoro: run 25 minutes of focus, 5 minutes of rest, and repeat. The 25-minute preset is right there.',
    },
    {
      heading: 'The alert sound',
      paragraphs: [
        'When the timer hits zero, a short beep plays — if your browser allows audio. Browsers require a user gesture before audio can play, so make sure you have interacted with the page (clicked Start) at least once; after that the alert works reliably.',
        'If no sound plays, it is usually autoplay policy, not a bug — and the big red zero display is visible regardless.',
      ],
    },
    {
      heading: 'Time input formats',
      paragraphs: [
        'The input accepts MM:SS or HH:MM:SS: "5:00" means 5 minutes, "1:30:00" means 90 minutes, and plain numbers like "90" are read as 1 minute 30 seconds. Press Enter or the reset button to apply.',
        'This flexibility is deliberate: typing "5:00" is natural for minutes, while "1:30:00" works for longer sessions.',
      ],
    },
  ],
  faqs: [
    { q: 'How do I set a timer for 5 minutes?', a: 'Click the "5 min" preset, or type 5:00 in the input and press Enter.' },
    { q: 'Why did the sound not play?', a: 'Browsers block audio until you interact with the page. Click Start once (or anywhere on the page), and the alert will work on future runs. Sound may also be muted — toggle the speaker button.' },
    { q: 'What is the pomodoro technique?', a: 'Work in 25-minute focused blocks with 5-minute breaks. The 25-minute preset is built in for exactly this.' },
    { q: 'Does the timer keep running in the background?', a: 'Yes — it counts down from the clock, so it stays accurate even if the tab is throttled in the background. For long-running timers, consider keeping the tab visible.' },
    { q: 'Is the countdown timer free?', a: 'Yes — it runs entirely in your browser and requires no account.' },
  ],
  relatedSlugs: ['stopwatch', 'timestamp-converter', 'random-number-generator'],
};
