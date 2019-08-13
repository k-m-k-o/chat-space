require 'rails_helper'

describe MessagesController do
  let(:group) {create(:group)}
  let(:user) {create(:user)}
  describe "Get #index" do
    context "user_signed_in" do
      before do
        login user
        get :index, params: { group_id: group.id }
      end  
      it "アクション内で定義したインスタンス変数があるか" do
        expect(assigns(:message)).to be_a_new(Message)
      end
      
      it "グループが一致しているか" do
        expect(assigns(:group)).to eq group
      end 

      it "indexに遷移しているか" do
        expect(@responce).to render_template :index
      end  
    end
    
    context "not user_signed_in" do
      before do
        get :index, params: { group_id: group.id }
      end  

      it "意図したビューにリダイレクトできているか" do
        expect(@responce).to redirect_to(new_user_session_path)
      end
    
    end  
  end 
  
  describe "Post #create" do
    context "user_signed_in" do
      let(:params){ { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
      before do 
        login user
      end  
      subject {
        post :create,
        params: params
      }
      it "メッセージ保存可否の確認" do
        expect{ subject }.to change(Message, :count).by(1)
      end  

      it "メッセージ保存後のグループメッセージ画面への遷移確認" do
        subject
        expect(@responce).to redirect_to(group_messages_path(group))
      end

    end 
    context "user_signed_in but can't save" do
      let(:second_params){ { group_id: group.id, user_id: user.id, message: attributes_for(:message, body: nil, image: nil) } }
      subject{
        post :create,
        params: second_params
      }
      before do
        login user
      end  
      it "メッセージが保存できてないことの確認" do
        expect{ subject }.not_to change(Message, :count)
      end  
      it "メッセージ画面のレンダーの確認" do
        subject
        expect(@responce).to render_template :index
      end
    end  
    context "not user_signed_in" do
      let(:params){ { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }
      it "ログインできていない場合のリダイレクトの確認" do
        post :create , params: params
        expect(@responce).to redirect_to(new_user_session_path)
      end 
    end  
  end  
end  