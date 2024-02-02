'use strict'

// Begin module requirements
const error = require('feathers-errors')
// End module requirements

// Begin service definition
module.exports = (app) => {
  app.get('/directors', (req, res, next) => {
    res.render('about.hbs', {
      title: 'Directors - Zesty Productions',
      people: [
        {
          name: 'Hannah Carpenter',
          location: 'Boston, MA / Los Angeles, CA',
          about: `I’m interested in making both narrative and experimental films that emphasize representation of marginalized groups and documentaries about overlooked rituals. Directing relies on organization, coordination and communication.  My background in producing opens me up to big ideas, while my experience in camera draws me to the fine details of the image. I’m excited to work on stories that people are willing to share, whether with the world or their own niche audience.`,
          img: '/images/IMG_2334.JPG'
        },
        {
          name: 'Claudia Frye',
          location: 'Boston, MA',
          about: `Good marketing fuels me, like branded content or adverts with fun, audience-based plots that engage people to new perspectives and connect them to their products. The story worth making is the story that shares a feeling or experience that makes you go “you said that perfectly”. It’s equal to the feeling of finding a perfectly concise and clear poem— that experience is yours, you as the audience owns it.`,
          img: '/images/IMG_2333.JPG'
        },
        {
          name: 'Ariana Anderson',
          location: 'New York, NY / Boston, MA',
          about: `With so much experience as an actor, I can intuit when someone is uncomfortable on camera. There’s a lot more to communicate besides saying "next time, be sadder" or "cuter" or "angrier" and being a process-oriented as opposed to a result-oriented director makes me able to talk to them in a language they understand. Being an actor makes me more collaborative with my cast and crew; I’m not afraid of being on the spot.`,
          img: '/images/IMG_2335.JPG'
        },
        {
          name: 'Grayson Kohs',
          location: 'New York, NY / Boston, MA  ',
          about: `There's so much to see from a camera's viewfinder: A band rocking out, friends getting together on a new idea, an actor feeling the scene... These are stories unfolding in real time. It's the things I see which inform my directing style. That's why I love music and directing music videos: like in any song, there's that "pocket" during a shoot-- a moment when the vision is clear and everyone's in sync with the same energy. `,
          img: '/images/IMG_2337.JPG'
        },
      ]
    })
  })
}
// End service definition
