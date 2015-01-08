p "Running the helper file"


def sumpin_helper
  p "sumpin_helper reached"
end


def sendtext(phone_number, message)
  # put your own credentials here
  account_sid = ENV['TWILIO_ID']
  auth_token = ENV['TWILIO_TOKEN']

  # set up a client to talk to the Twilio REST API
  @client = Twilio::REST::Client.new account_sid, auth_token

  phone_number = ENV['MY_PHONE']
  twilio_phone = ENV['TWILIO_PHONE']

  @client.account.messages.create({
    :from => twilio_phone,
    :to => phone_number,
    :body => message
  })
end