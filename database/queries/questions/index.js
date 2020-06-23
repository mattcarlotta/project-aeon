module.exports = {
  createNewQuestion:
    "INSERT INTO questions(userid, body, tags, title, uniquetitle) VALUES ($1, $2, $3, $4, $5) RETURNING id",
  downvoteQuestion:
    "UPDATE questions SET downvoters=array_append(downvoters, $2), upvoters=array_remove(upvoters, $2) WHERE id=$1 RETURNING id",
  findQuestion: `UPDATE questions SET views=views+1 WHERE id=$1; 
    SELECT q.*, cardinality(q.upvoters)-cardinality(q.downvoters) AS votes, $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted, u.username FROM questions q JOIN users u ON q.userid=u.id WHERE q.id=$1
    `,
  findUpdatedQuestion:
    "SELECT q.id, q.userid, q.date, q.body, q.answered, q.views, cardinality(q.upvoters)-cardinality(q.downvoters) AS votes, $2=ANY(q.upvoters) AS upvoted, $2=ANY(q.downvoters) AS downvoted, q.title, q.uniquetitle, q.tags, u.username FROM questions q JOIN users u ON q.userid=u.id WHERE q.id=$1",
  findAllQuestionsByTagLimitAndOffset:
    "SELECT q.id, q.userid, q.date, q.body, q.answered, q.views, cardinality(q.upvoters)-cardinality(q.downvoters) AS votes, $4=ANY(q.upvoters) AS upvoted, $4=ANY(q.downvoters) AS downvoted, q.title, q.uniquetitle, q.tags, u.username FROM questions q JOIN users u ON q.userid = u.id WHERE q.tags @> $1 ORDER BY q.date DESC LIMIT $2 OFFSET $3",
  upvoteQuestion:
    "UPDATE questions SET upvoters=array_append(upvoters, $2), downvoters=array_remove(downvoters, $2) WHERE id=$1 RETURNING id",
  removevoteFromQuestion:
    "UPDATE questions SET upvoters=array_remove(upvoters, $2), downvoters=array_remove(downvoters, $2) WHERE id=$1 RETURNING id",
};
