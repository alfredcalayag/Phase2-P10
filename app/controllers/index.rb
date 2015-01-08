get '/' do
  erb :login
end

get '/getkey' do
  key = ENV['MAPQUEST_KEY']
  myUrl = "http://www.mapquestapi.com/sdk/js/v7.2.s/mqa.toolkit.js?key=" + key
  p myUrl
  content_type :json
  {scriptUrl: myUrl}.to_json
end

get '/trips' do
  @trips = Trip.all
  erb :index
end

get '/trips/new' do
  erb :new_trip
end

post '/trips' do
  reminder_minutes = params[:reminder_minutes].to_i
  depart_time = DateTime.parse(params[:depart_time])
  reminder_time = depart_time - reminder_minutes.minutes


  new_trip_data = {
    trip_name: params[:trip_name],
    origin: params[:origin],
    destination: params[:destination],
    reminder_minutes: params[:reminder_minutes],
    depart_time: depart_time,
    reminder_time: reminder_time
  }

  new_trip = Trip.create(new_trip_data)
  redirect '/trips'
end



post '/send' do
  phone_number = ENV['MY_PHONE']
  message = params[:message]
  sendtext(phone_number, message)
  p "Message sent to #{phone_number}"
end

post '/test' do
  p "Got an ajax"
  phone_number = ENV['MY_PHONE']
  time = params[:time]
  timeWithTraffic = params[:timeWithTraffic]
  origin = params[:origin]
  destination = params[:destination]
  message = "Leaving now from #{origin} to #{destination}? Estimated time is #{time} min without traffic. Currently, with traffic it will take #{timeWithTraffic} min."
  sendtext(phone_number, message)
  p "Message sent to #{phone_number}"

end


