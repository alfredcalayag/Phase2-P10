# SMS Controller

# Compile message, send sms, and return traffic data
post '/users/:user_id?=sms' do
  # TODO: Refactor into helper methods to filter and convert time

  phone_number = ENV['MY_PHONE']
  time = params[:time]
  timeWithTraffic = params[:timeWithTraffic]
  origin = params[:origin]
  destination = params[:destination]
  message = "Leaving now from #{origin} to #{destination}? Estimated time is #{time} min without traffic. Currently, with traffic it will take #{timeWithTraffic} min."
  sendtext(phone_number, message)
  p "Message sent to #{phone_number}"

  content_type :json
  {time: time, timeWithTraffic: timeWithTraffic, origin: origin, destination: destination}.to_json
end