# User.create(
#   username: 'badboy',
#   password: '123',
#   phone_number: 555-555-5551 )

User.create(
  username: 'rapa',
  password: 'dura',
  phone_number: 555-555-5551 )

Trip.create(
  user_id: 2,
  trip_name: 'SF to LA',
  origin: 'San Francisco',
  destination: 'Los Angeles',
  depart_time: Time.now + 24.hours,
  reminder_minutes: '10',
  reminder_time: Time.now + 24.hours - 30.minutes)

Trip.create(
  user_id: 2,
  trip_name: 'LA to SD',
  origin: 'Los Angeles',
  destination: 'San Diego',
  depart_time: Time.now + 48.hours,
  reminder_minutes: '30',
  reminder_time: Time.now + 48.hours - 30.minutes)