# Sidekiq defers scheduling to other, better suited gems.
# If you want to run a job regularly, here's an example
# of using the 'clockwork' gem to push jobs to Sidekiq
# regularly.

# require boot & environment for a Rails app
# require_relative "../config/boot"
# require_relative "../config/environment"



require "clockwork"
require "sidekiq"
require "redis"
require "./config/environment"


class MyWorker
  include Sidekiq::Worker

  def perform(count)
    puts "Job ##{count}: Late night, so tired..."
  end

  def self.late_night_work
    10.times do |x|
      perform_async(x)
    end
  end

end

class HourlyWorker
  include Sidekiq::Worker

  def perform
    p "Hello There"
  #   cleanup_database
  #   format_hard_drive
  end
  # def greet
  # end
end

module Clockwork
#   # Kick off a bunch of jobs early in the morning


  # every 1.day, 'my_worker.late_night_work', :at => '4:30 am' do
    # MyWorker.late_night_work
#   end

  # every 1.hour do

  handler do |job|
    puts "running #{job}"
  end

  every 10.seconds, 'our test clockwork' do
    HourlyWorker.perform_async
  end
end
