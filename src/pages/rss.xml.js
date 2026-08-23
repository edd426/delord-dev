import rss from '@astrojs/rss';

export function GET(context) {
  return rss({
    title: 'delord.dev',
    description: 'Notes on platform engineering and the careful measurement of AI coding agents, by Evan DeLord.',
    site: context.site,
    items: [
      {
        title: 'The Claude autobiographies',
        description:
          'Every new Claude model gets an empty repository and an invitation to make something autobiographical. Seven works so far — a game that forgets itself, a chapbook, a critical edition of a single draw, a fable with a temperature dial.',
        link: '/work/claude-autobiographies',
        pubDate: new Date('2026-08-23'),
      },
    ],
  });
}
