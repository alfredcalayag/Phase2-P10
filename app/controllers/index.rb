get '/' do
  erb :login
end


get '/users' do
  @trips = Trip.all
  erb :index
end






# Consider scrapping:
# post '/send' do
#   phone_number = ENV['MY_PHONE']
#   message = params[:message]
#   sendtext(phone_number, message)
#   p "Message sent to #{phone_number}"
# end

# get '/getkey' do
#   key = ENV['MAPQUEST_KEY']
#   myUrl = "http://www.mapquestapi.com/sdk/js/v7.2.s/mqa.toolkit.js?key=" + key
#   p myUrl
#   content_type :json
#   {scriptUrl: myUrl}.to_json
# end
