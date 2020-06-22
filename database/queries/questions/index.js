module.exports = {
  createNewQuestion:
    "INSERT INTO questions(userid, body, tags, title, uniquetitle) VALUES ($1, $2, $3, $4, $5) RETURNING key",
  downvoteQuestion:
    "UPDATE questions SET downvoters=array_append(downvoters, $2), upvoters=array_remove(upvoters, $2) WHERE key=$1 RETURNING key",
  findQuestion: `UPDATE questions SET views=views+1 WHERE key=$1; 
    SELECT q.*, cardinality(q.upvoters)-cardinality(q.downvoters) AS votes, $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted, u.username, u.reputation as userrep, u.key as userkey FROM questions q JOIN users u ON q.userid=u.id WHERE q.key=$1
    `,
  findUpdatedQuestion:
    "SELECT q.key, q.userid, q.date, q.body, q.answered, q.views, cardinality(q.upvoters)-cardinality(q.downvoters) AS votes, $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted, q.title, q.uniquetitle, q.tags, u.username, u.reputation as userrep, u.key as userkey FROM questions q JOIN users u ON q.userid=u.id WHERE q.key=$1",
  findAllQuestionsByTagLimitAndOffset:
    "SELECT q.key, q.userid, q.date, q.body, q.answered, q.views, cardinality(q.upvoters)-cardinality(q.downvoters) AS votes, $4=ANY(q.upvoters) AS upvoted, $4=ANY(q.downvoters) AS downvoted, q.title, q.uniquetitle, q.tags, u.username, u.reputation AS userrep, u.key as userkey FROM questions q JOIN users u ON q.userid = u.id WHERE q.tags @> $1 ORDER BY q.date DESC LIMIT $2 OFFSET $3",
  upvoteQuestion:
    "UPDATE questions SET upvoters=array_append(upvoters, $2), downvoters=array_remove(downvoters, $2) WHERE key=$1 RETURNING key",
  removevoteFromQuestion:
    "UPDATE questions SET upvoters=array_remove(upvoters, $2), downvoters=array_remove(downvoters, $2) WHERE key=$1 RETURNING key",
};
