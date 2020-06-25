module.exports = {
  createNewComment:
    "INSERT INTO comments(uid, body, qid, rid) VALUES ($1, $2, $3, $4) RETURNING id",
  downvoteComment:
    "UPDATE comments SET downvoters=array_append(downvoters, $2), upvoters=array_remove(upvoters, $2) WHERE id=$1 RETURNING id",
  findComment:
    "SELECT c.id, c.uid, c.qid, c.rid, c.body, c.date, $2=ANY(c.upvoters) as upvoted, $2=ANY(c.downvoters) as downvoted,cardinality(c.upvoters)-cardinality(c.downvoters) as votes, u.username FROM comments c JOIN users u ON c.uid = u.id WHERE c.id=$1",
  findComments:
    "SELECT json_agg(x) as comments FROM (SELECT json_build_object('id', c.id, 'uid', c.uid, 'qid', c.qid, 'rid', c.rid, 'date', c.date, 'body', c.body, 'upvoted', $2=ANY(c.upvoters),'downvoted', $2=ANY(c.downvoters),'votes', cardinality(c.upvoters)-cardinality(c.downvoters), 'username', u.username) as x FROM comments c JOIN users u ON c.uid = u.id WHERE c.qid=$1 GROUP BY c.id, u.id ORDER BY c.date ASC) x",
  upvoteComment:
    "UPDATE comments SET upvoters=array_append(upvoters, $2), downvoters=array_remove(downvoters, $2) WHERE id=$1 RETURNING id",
  removeVoteFromComment:
    "UPDATE comments SET upvoters=array_remove(upvoters, $2), downvoters=array_remove(downvoters, $2) WHERE id=$1 RETURNING id",
  voteOnOwnComment: "SELECT id FROM comments WHERE id=$1 AND uid=$2",
  votedOnComment:
    "SELECT $2=ANY(upvoters) AS upvoted, $2=ANY(downvoters) AS downvoted FROM comments WHERE id=$1"
};

// INSERT INTO comments(userid, body, qid, tid) VALUES ('2b227348-b663-11ea-885b-430902e4963c', 'test', 1, 1)
