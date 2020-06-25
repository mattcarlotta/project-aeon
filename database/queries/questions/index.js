module.exports = {
  createNewQuestion:
    "INSERT INTO questions(uid, body, description, tags, title, uniquetitle) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
  downvoteQuestion:
    "UPDATE questions SET downvoters=array_append(downvoters, $2), upvoters=array_remove(upvoters, $2) WHERE id=$1 RETURNING id",
  findUpdatedQuestion:
    "SELECT cardinality(q.upvoters)-cardinality(q.downvoters) AS votes, $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted, u.username FROM questions q JOIN users u ON q.uid=u.id WHERE q.id=$1",
  findQuestion:
    "SELECT q.id, q.uid, q.date ,q.answered, q.views, q.title, q.uniquetitle, q.body, q.description, q.tags,cardinality(q.upvoters)-cardinality(q.downvoters) AS votes, $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted, (SELECT json_agg(x) as comments FROM (SELECT json_build_object('id', c.id, 'uid', c.uid, 'qid', c.qid, 'rid', c.rid, 'date', c.date, 'body', c.body, 'upvoted', $2=ANY(c.upvoters),'downvoted', $2=ANY(c.upvoters),'votes', cardinality(c.upvoters)-cardinality(c.downvoters), 'username', u.username) as x FROM comments c JOIN users u ON c.uid = u.id WHERE c.qid=$1 GROUP BY c.id, u.id ORDER BY c.date ASC) x) as comments, u.username FROM questions q JOIN users u ON q.uid=u.id WHERE q.id=$1",
  findAllQuestionsByTagLimitAndOffset:
    "SELECT q.id, q.uid, q.date, q.body, q.description, q.answered, q.views, cardinality(q.upvoters)-cardinality(q.downvoters) AS votes, $4=ANY(q.upvoters) AS upvoted, $4=ANY(q.downvoters) AS downvoted, q.title, q.uniquetitle, q.tags, u.username FROM questions q JOIN users u ON q.uid = u.id WHERE q.tags @> $1 ORDER BY q.date DESC LIMIT $2 OFFSET $3",
  upvoteQuestion:
    "UPDATE questions SET upvoters=array_append(upvoters, $2), downvoters=array_remove(downvoters, $2) WHERE id=$1 RETURNING id",
  removeVoteFromQuestion:
    "UPDATE questions SET upvoters=array_remove(upvoters, $2), downvoters=array_remove(downvoters, $2) WHERE id=$1 RETURNING id",
  updateQuestionViewCount: "UPDATE questions SET views=views+1 WHERE id=$1",
  voteOnOwnQuestion: "SELECT id FROM questions WHERE id=$1 AND uid=$2",
  votedOnQuestion:
    "SELECT $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted FROM questions q WHERE q.id=$1"
};
