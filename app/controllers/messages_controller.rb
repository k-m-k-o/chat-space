class MessagesController < ApplicationController
  def index

  end  

  def create

  end  

  private

  def message_params
    params.require(:message).permit(:body, :image).merge(user_id: current_user.id, group_id: params[:id])
  end

end
