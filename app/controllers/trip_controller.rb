# Trip controller

# Provide a new trip form
get '/users/:user_id/trips/new' do
  @user_id = params[:user_id]
  erb :"trips/new_trip"
end


# Create a new trip for a specific user
post '/users/:user_id/trips' do
  reminder_minutes = params[:reminder_minutes].to_i
  depart_time = DateTime.parse(params[:depart_time])
  reminder_time = depart_time - reminder_minutes.minutes

  new_trip_data = {
    trip_name: params[:trip_name],
    origin: params[:origin],
    destination: params[:destination],
    reminder_minutes: params[:reminder_minutes],
    depart_time: depart_time,
    reminder_time: reminder_time,
    user_id: params[:user_id].to_i
  }

  new_trip = Trip.create(new_trip_data)
  redirect "/users/#{params[:user_id]}"
end


