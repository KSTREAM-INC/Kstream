import Principal "mo:base/Principal";
import Text "mo:base/Text";
import List "mo:base/List";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Array "mo:base/Array";
import Types "./types";
import Database "./database";
import Utils "utils";

shared (msg) actor class Backend() {

  // Stable storage for profiles and videos as key-value pairs
  stable var storedProfiles : [(UserId, Profile)] = [];
  stable var storedVideos : [(VideoId, Video)] = [];

  var directory : Database.Directory = Database.Directory(storedProfiles);
  var videos : Database.Videos = Database.Videos(storedVideos);

  type UserId = Types.UserId;
  type Profile = Types.Profile;
  type NewProfile = Types.NewProfile;

  type VideoId = Types.VideoId;
  type Video = Types.Video;
  type NewVideo = Types.NewVideo;

  // Register a new user
  public shared (msg) func create(profile : NewProfile) : async ?Profile {
    directory.createOne(msg.caller, profile);
  };

  // Profile

  public shared (msg) func update(profile : Profile) : async ?Profile {
    switch (Utils.hasAccess(msg.caller, profile)) {
      case true {
        directory.updateOne(profile.id, profile);
      };
      case false {
        null;
      };
    };
  };

  public query (msg) func me() : async Profile {
    Utils.getProfile(directory, msg.caller);
  };

  public query func search(term : Text) : async [Profile] {
    directory.findBy(term);
  };

  public query func get(userId : UserId) : async Profile {
    Utils.getProfile(directory, userId);
  };

  public shared query (msg) func getOwnId() : async UserId { msg.caller };

  // VIDEOS

  public shared (msg) func createVideo(video : NewVideo) : async ?Video {
    videos.createOne(
      Nat.toText(storedVideos.size()),
      {
        title = video.title;
        description = video.description;
        length = video.length;
        fileUrl = video.fileUrl;
        thumbnailUrl = video.thumbnailUrl;
        uploader = msg.caller;
      },
    );
  };

  public shared (msg) func updateVideo(video : Video) : async ?Video {
    switch (Utils.canUpdateVideo(msg.caller, video)) {
      case true {
        videos.updateOne(video.id, video);
      };
      case false {
        null;
      };
    };
  };

  public query func searchVideo(term : Text) : async [Video] {
    videos.findBy(term);
  };

  public query func getVideo(videoId : VideoId) : async Video {
    Utils.getVideo(videos, videoId);
  };

  public query (message) func greet(name : Text) : async Text {
    return "Hello, " # name # "! = " # Principal.toText(message.caller);
  };
};
