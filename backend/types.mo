import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";

module {
  public type UserId = Principal;

  public type VideoId = Text;

  public type NewProfile = {
    fullName : Text;
    email : Text;
    isAdmin : Bool;
  };

  public type Profile = {
    id : UserId;
    fullName : Text;
    email : Text;
    isAdmin : Bool;
  };

  public type NewVideo = {
    title : Text;
    description : ?Text;
    length : Time.Time;
    fileUrl : Text;
    thumbnailUrl : Text;
    uploader : UserId;
  };

  public type Video = {
    id : VideoId;
    slug : Text;
    title : Text;
    description : ?Text;
    length : Time.Time;
    fileUrl : Text;
    thumbnailUrl : Text;
    uploader : UserId;
    uploadTime : Time.Time;

  };

};
