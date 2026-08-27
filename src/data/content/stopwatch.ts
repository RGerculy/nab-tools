import type { ToolContent } from './types';

export const stopwatchContent: ToolContent = {
  slug: 'stopwatch',
  intro: [
    'A precise stopwatch is one of those tools everyone needs occasionally — timing a task, a workout, a speech, or a speedrun. This one runs in your browser with millisecond precision, lap times, and split tracking, and it keeps working even if you switch tabs.',
    'No signup, no server — the stopwatch is a pure client-side tool that works offline.',
  ],
  sections: [
    {
      heading: 'Laps vs splits',
      paragraphs: [
        'Lap timing is the stopwatch feature people underestimate. A lap records the time since the last lap (the interval), while a split records cumulative time from the start. The classic workflow: hit Lap at each milestone, and you get both the segment time and the running total.',
        'This stopwatch records each lap\u2019s interval as you take it — perfect for workout sets, sprint intervals, or tracking how long each stage of a task takes.',
      ],
    },
    {
      heading: 'Why precision matters',
      paragraphs: [
        'The stopwatch updates at ~30 Hz (33 ms), which is smoother than the human eye can follow and far beyond what phone stopwatches display. Under the hood it computes elapsed time from Date.now() differences, so it is accurate to the millisecond — no drift even over long sessions.',
        'One honest caveat: browsers throttle timers in background tabs aggressively, so the display may lag if the tab is hidden for a long time. The underlying time is still computed correctly when you return.',
      ],
    },
    {
      heading: 'Good uses',
      paragraphs: [],
      list: [
        'Workouts — time sets, rest intervals, and total session length.',
        'Productivity — time-box tasks with a visible counter (the Hawthorne effect is real).',
        'Speech and presentation practice — hit your allotted time.',
        'Cooking — replace the phone timer with a big readable counter.',
        'Speedruns and gaming — track runs or session time.',
      ],
    },
  ],
  faqs: [
    { q: 'How precise is the stopwatch?', a: 'It displays centiseconds (10 ms) and computes from the system clock, so it is accurate to the millisecond. Updates render at ~30 Hz.' },
    { q: 'Does the stopwatch keep running if I switch tabs?', a: 'Yes — elapsed time is computed from the clock, not accumulated ticks, so it stays accurate even if the tab is throttled in the background.' },
    { q: 'What is a lap?', a: 'A lap records the time since the last lap, giving you interval times for each segment of a longer session.' },
    { q: 'Can I save or export my times?', a: 'Yes — the Export CSV button downloads all your laps as a CSV file, one lap per row, which opens in any spreadsheet.' },
    { q: 'Is the stopwatch free?', a: 'Yes — it runs entirely in your browser, requires no account, and collects no data.', },
  ],
  relatedSlugs: ['countdown-timer', 'timestamp-converter'],
};
