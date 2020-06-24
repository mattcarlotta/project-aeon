module.exports = {
  createNewComment:
    "INSERT INTO comments(uid, body, qid, tid) VALUES ($1, $2, $3, $4)",
  findComments: `
    SELECT json_agg(x) as comments
    FROM (
      SELECT json_build_object(
        'id', c.id, 
        'uid', c.uid,
        'rid', c.rid,
        'date', c.date,
        'body', c.body,
        'upvoted', $2=ANY(c.upvoters),
        'downvoted', $2=ANY(c.upvoters),
        'votes', cardinality(c.upvoters)-cardinality(c.downvoters)
      ) as x
        FROM comments c
        WHERE c.qid=$1
        GROUP BY c.id
        ORDER BY c.date DESC
    ) x
  `
};

// INSERT INTO comments(userid, body, qid, tid) VALUES ('2b227348-b663-11ea-885b-430902e4963c', 'test', 1, 1)
