module.exports = {
  createNewQuestion:
    "INSERT INTO questions(uid, body, description, tags, title, uniquetitle) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
  deleteQuestion:
    "UPDATE questions SET deleted=true WHERE id=$1 AND uid=$2 RETURNING deleted",
  downvoteQuestion:
    "UPDATE questions SET downvoters=array_append(downvoters, $2), upvoters=array_remove(upvoters, $2), votes=votes-1 WHERE id=$1 RETURNING id",
  findUpdatedQuestion:
    "SELECT q.votes, $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted, u.username FROM questions q JOIN users u ON q.uid=u.id WHERE q.id=$1",
  findQuestion:
    "SELECT q.id, q.uid, q.date, q.updated, q.deleted, q.answered, q.views, q.title, q.uniquetitle, q.body, q.description, q.tags, q.votes, $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted, (SELECT COALESCE(json_agg(x), '[]'::json) as comments FROM (SELECT json_build_object('id', c.id, 'uid', c.uid, 'qid', c.qid, 'rid', c.rid, 'date', c.date, 'updated', c.updated, 'body', c.body, 'upvoted', $2=ANY(c.upvoters),'downvoted', $2=ANY(c.downvoters),'votes', c.votes, 'username', u.username) as x FROM comments c JOIN users u ON c.uid = u.id WHERE c.qid=$1 GROUP BY c.id, u.id ORDER BY c.date ASC) x) as comments, u.username FROM questions q JOIN users u ON q.uid=u.id WHERE q.id=$1 AND q.deleted=false OR q.id=$1 AND q.uid=$2",
  findAllQuestionsByTagLimitAndOffset:
    "SELECT q.id, q.uid, q.date, q.updated, q.body, q.description, q.answered, q.views, q.votes, $4=ANY(q.upvoters) AS upvoted, $4=ANY(q.downvoters) AS downvoted, q.title, q.uniquetitle, q.tags, u.username FROM questions q JOIN users u ON q.uid = u.id WHERE q.tags @> $1 AND q.deleted=false ORDER BY q.date DESC LIMIT $2 OFFSET $3",
  upvoteQuestion:
    "UPDATE questions SET upvoters=array_append(upvoters, $2), downvoters=array_remove(downvoters, $2), votes=votes+1 WHERE id=$1 RETURNING id",
  removeVoteFromQuestion:
    "UPDATE questions SET upvoters=array_remove(upvoters, $2), downvoters=array_remove(downvoters, $2), votes=votes+$3 WHERE id=$1 RETURNING id",
  restoreQuestion:
    "UPDATE questions SET deleted=false WHERE id=$1 AND uid=$2 RETURNING deleted",
  updateQuestion:
    "UPDATE questions SET body=$3, description=$4, tags=$5, title=$6, uniquetitle=$7, updated=$8 WHERE id=$1 AND uid=$2;SELECT id, body, tags, title, uniquetitle, updated FROM questions where id=$1 AND uid=$2",
  updateQuestionViewCount: "UPDATE questions SET views=views+1 WHERE id=$1",
  voteOnOwnQuestion: "SELECT id FROM questions WHERE id=$1 AND uid=$2",
  votedOnQuestion:
    "SELECT $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted FROM questions q WHERE q.id=$1"
};
