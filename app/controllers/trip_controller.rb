# Trip controller

# Provide a new trip form
get '/trips/new' do
  erb :new_trip
end


# Create a new trip for a specific user
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
