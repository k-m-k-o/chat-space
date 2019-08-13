require 'rails_helper'

describe Message do
  describe "#create" do
    #メッセージが保存できるパターン
    context "can save" do
      it "メッセージがあれば保存できるテスト" do
        message = build(:message, body: nil)
        expect(message).to be_valid
      end
      it "画像があれば保存できるテスト" do
        message = build(:message, image: nil)
        expect(message).to be_valid
      end  
      it "メッセージと画像があれば保存できるテスト" do
        message = build(:message)
        expect(message).to be_valid
      end  
    end
    #メッセージが保存できないパターン
    context "can't save" do
      it "メッセージも画像もない場合保存できないテスト" do
        message = build(:message, body: nil, image: nil)
        message.valid?
        expect(message.errors[:body]).to include("を入力してください")
      end  
      it "group_idがない場合保存できないテスト" do
        message = build(:message, group: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end 
      it "user_idがない場合保存できないテスト" do
        message = build(:message, user: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end 
    end 
  end
end