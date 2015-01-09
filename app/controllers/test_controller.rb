# get '/test' do
#   MyWorker.late_night_work
# end


# CURRENTLY NOT IN USE

# get '/' do
#   sumpin_helper
#   erb :twilio_test
# end

# get '/mapquest' do
#   erb :mapquest_test
# end

# post '/send' do
#   phone_number = ENV['MY_PHONE']
#   message = params[:message]
#   sendtext(phone_number, message)
#   p "Message sent to #{phone_number}"
# end

# post '/test' do
#   p "Got an ajax"
#   phone_number = params[:phone]
#   time = params[:time]
#   timeWithTraffic = params[:timeWithTraffic]
#   message = "Time: #{time} min, Time with current traffic: #{timeWithTraffic} min."
#   sendtext(phone_number, message)
#   p "Message sent to #{phone_number}"

# end