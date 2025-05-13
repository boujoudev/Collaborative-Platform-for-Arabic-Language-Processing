import React from "react";
import AddPost from "./AddPost";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const ForumEntetIn = () => {
  return (
    <header className="headerForumEntetIn">
      <div className="bannerForumEntetIn"></div>
      <div className="contentForumEntetIn">
        <div className="infoForumEntetIn">
          <img
            src="/lovable-uploads/cad6fe61-d974-436a-9cbf-c5894f3fc0c2.png"
            alt="Profile"
            className="avatar"
          />
          <h2 className="nameForumEntetIn">nlpalgorithms</h2>
        </div>
        <div className="actionsForumEntetIn">
          <Dialog>
            <DialogTrigger asChild>
              <button className="btn btn-postForumEntetIn">
                <span>+</span>
                <span>Create Post</span>
              </button>
            </DialogTrigger>
            <DialogContent className="PostDialogContent">
              <AddPost />
            </DialogContent>
          </Dialog>
          <button className="btn btn-notify ForumEntetIn">
            <span>
              <i class="fa-solid fa-bell"></i>
            </span>
          </button>

          <button className="btn btn-joinForumEntetIn">Join</button>
        </div>
      </div>
    </header>
  );
};

export default ForumEntetIn;
