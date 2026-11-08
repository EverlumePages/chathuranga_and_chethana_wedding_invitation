# Lotus wedding invitation

Run `npm start`, then visit http://localhost:4173. No install or build step is required. `npm run check` checks JavaScript syntax. The site can also be served by any static web host.

Edit `config.js` for names, Sinhala wording, dates, schedule, venue, map destination, RSVP contact, and demo status. The HTML includes sample fallback content for visitors without JavaScript; update that fallback alongside configuration when preparing the real wedding invitation.

The first visit opens the sealed card, then the first four seconds of the supplied couple film. Visitors can skip either step. Opening completion is remembered for the browser session. Reduced-motion visitors go directly to the invitation and may explicitly replay the film. Audio is muted by default. No guest information is collected or stored.

Before public launch: replace all sample details; confirm Sinhala spelling and wording; set the real map link and Sri Lankan WhatsApp number (94 plus nine digits); turn off demo mode; update HTML fallback, sharing metadata and canonical absolute sharing-image URL; remove the noindex directive only when intended. Confirm Poruwa timing with the family. Demo mode never opens WhatsApp, even if a number is supplied.

Original references remain in `images/`. Optimized derivatives are in `assets/`. The opening uses assets/couple-intro.mp4, trimmed to 0:00?0:04 from images/couple.mp4. Its sound is opt-in; the original video is preserved. Google Fonts provide the specified fonts with local fallback fonts if unavailable. No publication has been performed.
