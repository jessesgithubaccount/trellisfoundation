// All session recaps live here. To add a new recap, copy the block below,
// give it a new "slug" (the web address part, no spaces) and fill it in.
// The first item is the one shown first on the Sessions page.
//
// Each recap is built from "sections". Every section has a heading ("h")
// and a list of "blocks". A block is ONE of these:
//   { p: 'A paragraph of text' }
//   { quote: 'A highlighted quotation' }
//   { ol: [ ...items ] }   a numbered list
//   { ul: [ ...items ] }   a bulleted list
//   { key: 'A highlighted key idea' }
// A list item is either plain text, or { t: 'Title', d: 'Description' },
// or { t: 'Title', sub: ['smaller item', 'smaller item'] }.
//
// "date" is optional: leave it out and no date is shown.
// "sample: true" shows a Sample badge -- leave it out for real recaps.
// "image" can be any file in public/assets (add your own session photos there).

export const SESSIONS = [
  {
    slug: 'session-1-1-growth-effectiveness-purpose-contribution',
    number: '1.1',
    title: 'Growth, Effectiveness, Purpose & Contribution',
    image: '/assets/session-1-1.webp',
    imagePosition: '50% 35%',
    sections: [
      {
        h: 'Introduction',
        blocks: [{ p: 'Below are some key takeaways from Saturday’s session, together with a call for volunteers.' }],
      },
      {
        h: 'The 7 Pillars of Growth',
        blocks: [
          { p: 'Tony highlighted that our growth within this mentorship will be focused around 7 pillars:' },
          {
            ol: ['Mental', 'Physical (Stature)', 'Spiritual', 'Social', 'Financial', 'Impact & Contribution', 'Purpose & Destiny'],
          },
          { p: 'These seven pillars provide the framework through which growth will be approached throughout the mentorship.' },
        ],
      },
      {
        h: 'Effectiveness Over Success',
        blocks: [
          { p: 'Tony emphasized an important principle:' },
          {
            quote:
              'Effectiveness over success: Success without matching character growth can be destructive, so the aim is to be effective, spending our time on what matters. Impact follows from effectiveness, and success follows from impact.',
          },
          { p: 'The goal is not simply to pursue success. Success without corresponding character growth can become destructive. Instead, the focus should be on becoming effective and intentionally spending time on things that truly matter.' },
          { p: 'The progression is: Effectiveness → Impact → Success.' },
          { key: 'Key idea: Success should be a result of meaningful impact, while meaningful impact follows from effectiveness.' },
        ],
      },
      {
        h: 'Upcoming Topics',
        blocks: [
          { p: 'The upcoming sessions will explore several important topics:' },
          { ul: ['The 7 Levels of Intelligence', 'Escape Velocity', 'Building According to Pattern, based on Myles Munroe’s idea'] },
          { p: 'These topics will form part of the continued learning within the mentorship.' },
        ],
      },
      {
        h: 'Recommendation: Dedicated Reflection',
        blocks: [
          { p: 'A key recommendation from the session is to dedicate at least 1 hour every week to intentional reflection.' },
          { key: 'Key idea: Regular reflection creates dedicated space to think deeply about your growth, direction, purpose and effectiveness.' },
        ],
      },
      {
        h: 'Homework: Personal Reflection',
        blocks: [
          { p: 'Participants were asked to reflect on the following questions and come ready to discuss them.' },
          {
            ol: [
              { t: 'Who are you, and where are you from?', d: 'Reflect on your identity and your background.' },
              { t: 'What is your assignment, and why are you here?', d: 'Consider the purpose behind your presence and the work you believe you are meant to accomplish.' },
              { t: 'What do you want to be defined by?', d: 'Think about the qualities, values and contributions you want people to associate with you.' },
              { t: 'What are you most passionate about, and what bothers you most?', d: 'Identify the things that deeply motivate you, as well as the things that strongly concern or frustrate you.' },
              { t: 'Where do you get the most return for the effort you put in?', d: 'Identify the area where you are gifted and where your effort produces the greatest return.' },
              { t: 'How do you want to measure your own success?', d: 'Consider the personal standards and measures you will use to determine whether you are successful.' },
            ],
          },
          { key: 'Important: Come prepared to discuss your reflections on these questions during the mentorship.' },
        ],
      },
      {
        h: 'Reading',
        blocks: [
          { p: 'The recommended reading is Mindset by Carol Dweck.' },
          { p: 'The book was recommended as part of the continued personal development and learning within the mentorship.' },
        ],
      },
      {
        h: 'TOT Model: Training of Trainers',
        blocks: [
          { p: 'The TOT model, or Training of Trainers, is an approach where people who are trained go on to train others.' },
          { p: 'In the context of this mentorship, each participant will mentor at least three people. This follows the spirit of “Each one teach one.” The objective is to multiply the Program’s reach well beyond the core group.' },
          { p: 'The approach can be represented as: Core Group → Each Participant → At Least 3 People → Wider Reach.' },
          { key: 'Key idea: Rather than limiting the impact of the Program to the original participants, each person becomes a multiplier by passing what they learn to others.' },
        ],
      },
      {
        h: 'Curriculum',
        blocks: [
          { p: 'Tony heavily reiterated that the approach towards this mentorship is going to be based on a structured curriculum. He is going to share the curriculum with us ahead of the next session.' },
          { key: 'Important: The mentorship will follow a structured learning approach, with the curriculum guiding the topics and progression of future sessions.' },
        ],
      },
      {
        h: 'Summary',
        blocks: [
          {
            ul: [
              {
                t: 'The mentorship’s growth framework is built around 7 pillars:',
                sub: ['Mental', 'Physical (Stature)', 'Spiritual', 'Social', 'Financial', 'Impact & Contribution', 'Purpose & Destiny'],
              },
              'The focus should be on effectiveness over success.',
              'Success without corresponding character growth can be destructive.',
              'The intended progression is effectiveness → impact → success.',
              {
                t: 'Upcoming topics include:',
                sub: ['The 7 Levels of Intelligence', 'Escape Velocity', 'Building According to Pattern'],
              },
              'Participants are encouraged to dedicate at least one hour every week to reflection.',
              'Homework involves reflecting on six personal questions about identity, assignment, definition, passion, giftedness and success.',
              'The recommended reading is Mindset by Carol Dweck.',
              'The Training of Trainers (TOT) model will be used to extend the mentorship’s reach.',
              'Each participant will mentor at least three people, following the principle of “each one teach one.”',
              'The mentorship will follow a structured curriculum, which Tony will share ahead of the next session.',
            ],
          },
          { key: 'Key takeaway: The mentorship is designed not simply to produce successful people, but to develop people who are effective, impactful, purposeful, and capable of multiplying what they learn by teaching others.' },
        ],
      },
    ],
  },
]

export const findSession = (slug) => SESSIONS.find((s) => s.slug === slug)
