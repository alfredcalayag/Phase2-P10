class CreateTripsTable < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.belongs_to :user

      t.string  :trip_name
      t.string  :origin
      t.string  :destination

      t.string  :reminder_minutes
      t.datetime  :depart_time
      t.datetime  :arrival_time
      t.datetime  :reminder_time

      t.timestamps
    end
  end
end
