import Array "mo:base/Array";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Database "./database";
import Types "./types";

module {
  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type UserId = Types.UserId;

  type VideoId = Types.VideoId;
  type Video = Types.Video;
  type NewVideo = Types.NewVideo;

  // Profiles
  public func getProfile(directory : Database.Directory, userId : UserId) : Profile {
    let existing = directory.findOne(userId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          id = userId;
          fullName = "";
          email = "";
          isAdmin = false;
        };
      };
    };
  };

  public func getVideo(directory : Database.Videos, videoId : VideoId) : Video {
    let existing = directory.findOne(videoId);
    switch (existing) {
      case (?existing) { existing };
      case (null) {
        {
          id = videoId;
          slug = "";
          title = "";
          description = ?"";
          length = 0;
          fileUrl = "";
          thumbnailUrl = "";
          uploader = Principal.fromText("");
          uploadTime = 0;
        };
      };
    };
  };
  // Authorization

  public func hasAccess(userId : UserId, profile : Profile) : Bool {
    userId == profile.id or profile.isAdmin;
  };

  public func canUpdateVideo(uploader : Principal, video : Video) : Bool {
    uploader == video.uploader;
  };

};
