import React, { useState } from "react";

const CommentForm = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const UserCurrent = "yasser"; // Utilisateur actuel

  // Ajouter un nouveau commentaire
  function handleAddComment(e) {
    e.preventDefault();

    // hna ni nverifier ida machi vide comment dyali
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        // creation l objet jdid w nzido f liste dyal comments
        id: Date.now(), //unique id pour chaque commentaire ili howa la date dyal creation
        content: newComment,
        User: UserCurrent,
        createdAt: new Date(),
        replies: [],
      },
    ]);
    setNewComment("");
  }

  // Supprimer un commentaire (uniquement si c'est le commentaire de l'utilisateur actuel)
  //items hia liste ta3 comment
  function handleDelete(id, items = comments) {
    return items.filter((item) => {
      if (item.id === id && item.User !== UserCurrent) return true; // Ne pas supprimer si ce n'est pas le commentaire de l'utilisateur actuel
      if (item.id === id) return false;
      item.replies = handleDelete(id, item.replies);
      return true;
    });
  }

  // Modifier un commentaire (uniquement si c'est le commentaire de l'utilisateur actuel)
  function handleEdit(id, newContent, items = comments) {
    return items.map((item) => {
      if (item.id === id && item.User === UserCurrent) {
        return { ...item, content: newContent };
      }
      return { ...item, replies: handleEdit(id, newContent, item.replies) };
    });
  }

  // Répondre à un commentaire
  function handleReply(parentId, content, items = comments) {
    return items.map((item) => {
      if (item.id === parentId) {
        const reply = {
          id: Date.now(),
          content,
          User: UserCurrent,
          createdAt: new Date(),
          replies: [],
        };
        return { ...item, replies: [...item.replies, reply] };
      }
      return { ...item, replies: handleReply(parentId, content, item.replies) };
    });
  }

  return (
    <div className="comment-section">
      <form onSubmit={handleAddComment}>
        <textarea
          placeholder="Your comment.."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit"> + Add</button>
      </form>
      <div>
        {comments.map((c) => (
          <CommentItem
            key={c.id}
            comment={c}
            currentUser={UserCurrent}
            onDelete={(id) => setComments(handleDelete(id))}
            onEdit={(id, content) => setComments(handleEdit(id, content))}
            onReply={(id, content) => setComments(handleReply(id, content))}
          />
        ))}
      </div>
    </div>
  );
};

// Composant CommentItem commaantaire single
const CommentItem = ({ comment, currentUser, onDelete, onEdit, onReply }) => {
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [replying, setReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="author">{comment.User}</span>
        <span className="date">
          {comment.createdAt.toLocaleString("fr-FR")}
        </span>
      </div>
      {editing ? (
        <div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button
            className="save-NoSave-button"
            onClick={() => {
              onEdit(comment.id, editContent);
              setEditing(false);
            }}
          >
            Save
          </button>
          <button
            className="save-NoSave-button"
            onClick={() => setEditing(false)}
          >
            cancel
          </button>
        </div>
      ) : (
        // Afficher le contenu du commentaire
        <div className="comment-content">{comment.content}</div>
      )}
      <div className="comment-actions">
        <button onClick={() => setReplying(!replying)}>Reply</button>
        {comment.User === currentUser && ( // Vérifie si l'utilisateur actuel est l'auteur du commentaire
          <>
            <button onClick={() => setEditing(true)}>Edit</button>
            <button onClick={() => onDelete(comment.id)}>Delete</button>
          </>
        )}
      </div>
      {replying && (
        <div className="reply-form">
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Votre réponse..."
          />
          <button
            onClick={() => {
              onReply(comment.id, replyContent);
              setReplyContent("");
              setReplying(false);
            }}
          >
            Publish
          </button>
        </div>
      )}
      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onDelete={onDelete}
              onEdit={onEdit}
              onReply={onReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentForm;
