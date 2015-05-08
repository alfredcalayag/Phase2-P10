##A-to-B
Receive scheduled text messages of the driving traffic conditions to your POI before your departure.

##The Idea
I used to drive a lot to-and-from work.  Looking up the traffic conditions was a repetitive task.  Hitting the road only to be stuck as soon as I hit the freeway was getting old, and I was tired of my time being spent in traffic rather than being productive elsewhere.  Since I've only gotten lazier, I thought it would be useful to automate this task.  Instead of manually looking this up every time, how about I build an app that does it for me?

###How it works
Fill out a form asking for your starting address and ending address, time of departure, and cell phone number.  A new entry will be created in the database with this information.

Currently, in lieue of a scheduled operation, you will need to click the "Test" button which triggers the map and text message features.

(Eventually) You would receive a text message x minutes prior to your scheduled departure time notifying you of the traffic conditions on your route.  All clear, wait it out and make better use of your time, or do you enjoy jamming to the radiou while sitting in traffic?


###Usage
A-to-B is still in development and is a work-in-progress and has only reached its conceptual stages. This is a student project to test out something I thought was useful and likely will not be deployed.  For the text message feature to work, I'm using a free Twilio developer account which only allows me to send sample text messages to my phone number only.  To expand this to allow just anyone to use would require a subscription for that support.

###Technologies
- Sinatra: Ruby framework
- Postgres: Database
- Javascript: Loading the Mapquest Toolkit, AJAX to retrieve traffic and map data
- HTML/CSS: Front-end design
- Twilio API: SMS messaging
- MapQuest API: Traffic data
- (Under experimentation)Sidekiq + Redis: Background jobs

###To Do:
- Set up the route that creates the new entry to start a background job
- Add features to allow editing of existing entries
- Consider a free mailer solution instead a text message.  This way, it could be more deployment-friendly for the public.