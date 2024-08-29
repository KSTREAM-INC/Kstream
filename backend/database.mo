import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Types "./types";
import Helpers "helpers";

module {
  type NewProfile = Types.NewProfile;
  type Profile = Types.Profile;
  type UserId = Types.UserId;
  type VideoId = Types.VideoId;
  type NewVideo = Types.NewVideo;
  type Video = Types.Video;

  public class Directory(store : [(UserId, Profile)]) {
    // Initialize the HashMap from stored data

    private func initHashMap() : HashMap.HashMap<UserId, Profile> {
      let map = HashMap.HashMap<UserId, Profile>(1, isEq, Principal.hash);
      for ((userId, profile) in store.vals()) {
        map.put(userId, profile);
      };
      map;
    };

    let storage : HashMap.HashMap<UserId, Profile> = initHashMap();

    public func createOne(userId : UserId, profile : NewProfile) : ?Profile {
      storage.put(userId, makeProfile(userId, profile));
      storage.get(userId);
    };

    public func updateOne(userId : UserId, profile : Profile) : ?Profile {
      storage.put(userId, profile);
      storage.get(userId);
    };

    public func findOne(userId : UserId) : ?Profile {
      storage.get(userId);
    };

    public func findMany(userIds : [UserId]) : [?Profile] {
      func getProfile(userId : UserId) : ?Profile {
        switch (storage.get(userId)) {
          case (?profile) { ?profile }; // If the profile exists, return it
          case null { null }; // If not, return null
        };
      };
      Array.map<UserId, ?Profile>(userIds, getProfile);
    };

    public func findBy(term : Text) : [Profile] {
      var profiles : [Profile] = [];
      for ((id, profile) in storage.entries()) {
        let fullName = profile.fullName;
        if (Helpers.includesText(fullName, term)) {
          profiles := Array.append<Profile>(profiles, [profile]);
        };
      };
      profiles;
    };

    // Helpers

    func makeProfile(userId : UserId, profile : NewProfile) : Profile {
      {
        id = userId;
        fullName = profile.fullName;
        email = profile.email;
        isAdmin = profile.isAdmin;
      };
    };

  };

  public class Videos(store : [(VideoId, Video)]) {
    private func initHashMap() : HashMap.HashMap<VideoId, Video> {
      let map = HashMap.HashMap<VideoId, Video>(1, func(y : VideoId, x : VideoId) : Bool { y == x }, Text.hash);
      for ((videoId, video) in store.vals()) {
        map.put(videoId, video);
      };
      map;
    };

    let storage : HashMap.HashMap<VideoId, Video> = initHashMap();

    public func createOne(videoId : VideoId, video : NewVideo) : ?Video {
      storage.put(videoId, makeVideo(video));
      storage.get(videoId);
    };

    public func updateOne(videoId : VideoId, profile : Video) : ?Video {
      storage.put(videoId, profile);
      storage.get(videoId);
    };

    public func findOne(videoId : VideoId) : ?Video {
      storage.get(videoId);
    };

    public func findMany(videoId : [VideoId]) : [?Video] {
      func getVideo(videoId : VideoId) : ?Video {
        switch (storage.get(videoId)) {
          case (?video) { ?video }; // If the profile exists, return it
          case null { null }; // If not, return null
        };
      };
      Array.map<VideoId, ?Video>(videoId, getVideo);
    };

    public func findBy(term : Text) : [Video] {
      var videos : [Video] = [];
      for ((id, video) in storage.entries()) {
        let title = video.title;
        if (Helpers.includesText(title, term)) {
          videos := Array.append<Video>(videos, [video]);
        };
      };
      videos;
    };

    // Helpers

    func makeVideo(video : NewVideo) : Video {
      {
        id = Nat.toText(storage.size());
        slug = generateSlug(video.title);
        title = video.title;
        description = video.description;
        length = video.length;
        fileUrl = video.fileUrl;
        thumbnailUrl = video.thumbnailUrl;
        uploader = video.uploader;
        uploadTime = Time.now();
      };
    };

    func generateSlug(text : Text) : Text {
      var slug : Text = Text.replace(text, #char ' ', "_");
      slug;
    };
  };

  func isEq(x : UserId, y : UserId) : Bool { x == y };
};
