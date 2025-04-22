import { User } from "lucide-react";
import React, { useState } from "react";

const CommentForm = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const UserCurrent = "aymene"; // Utilisateur actuel

  // Ajouter un nouveau commentaire
  function handleAddComment(e) {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      {
        id: Date.now(),
        content: newComment,
        User: UserCurrent,
        createdAt: new Date(),
        replies: [],
      },
    ]);
    setNewComment("");
  }

  // Supprimer un commentaire (uniquement si c'est le commentaire de l'utilisateur actuel)
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
          placeholder="Votre commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Ajouter</button>
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

// Composant CommentItem
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
            onClick={() => {
              onEdit(comment.id, editContent);
              setEditing(false);
            }}
          >
            Enregistrer
          </button>
          <button onClick={() => setEditing(false)}>Annuler</button>
        </div>
      ) : (
        <div className="comment-content">{comment.content}</div>
      )}
      <div className="comment-actions">
        <button onClick={() => setReplying(!replying)}>Répondre</button>
        {comment.User === currentUser && ( // Vérifie si l'utilisateur actuel est l'auteur du commentaire
          <>
            <button onClick={() => setEditing(true)}>Modifier</button>
            <button onClick={() => onDelete(comment.id)}>Supprimer</button>
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
            Publier
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
