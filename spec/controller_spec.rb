require 'spec_helper'

descript "index controller" do
  it "responds with a successful status" do
    expect(last_response.status).to eq(200)

  end
end

# Test response status
# Mock a new record to the database.  Test that when it pulls that entry, it shows on the view.

#