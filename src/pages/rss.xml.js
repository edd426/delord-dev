import rss from '@astrojs/rss';

export function GET(context) {
  return rss({
    title: 'delord.dev',
    description: 'Notes on platform engineering and the careful measurement of AI coding agents, by Evan DeLord.',
    site: context.site,
    items: [],
  });
}
