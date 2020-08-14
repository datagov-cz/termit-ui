import * as React from "react";
import Term from "../../model/Term";
import VocabularyUtils from "../../util/VocabularyUtils";
import Comment from "../../model/Comment";
import {connect} from "react-redux";
import {ThunkDispatch} from "../../util/Types";
import {
    createTermComment,
    loadTermComments,
    reactToComment,
    removeCommentReaction
} from "../../action/AsyncCommentActions";
import CreateCommentForm from "./CreateCommentForm";
import CommentList from "./CommentList";
import "./Comments.scss";

interface CommentsProps {
    term: Term;

    loadComments: (termIri: string) => Promise<Comment[]>;
    createComment: (comment: Comment, termIRI: string) => Promise<any>;
    addReaction: (comment: Comment, reactionType: string) => Promise<any>;
    removeReaction: (comment: Comment) => Promise<any>;
}

const Comments: React.FC<CommentsProps> = props => {
    const {loadComments, createComment, addReaction, removeReaction, term} = props;
    const [comments, setComments] = React.useState<Comment[]>([]);
    React.useEffect(() => {
        loadComments(term.iri).then(data => setComments(data));
    }, [loadComments, term]);
    const onSubmit = (comment: Comment) => {
        return createComment(comment, term.iri).then(() => {
            loadComments(term.iri).then(data => setComments(data));
        });
    }

    return <div id="term-comments" className="comments m-1 mt-3">
        <CommentList comments={comments} addReaction={addReaction} removeReaction={removeReaction}/>
        {comments.length > 0 && <hr className="mt-1 mb-1 border-top"/>}
        <CreateCommentForm onSubmit={onSubmit}/>
    </div>;
}

export default connect(undefined, (dispatch: ThunkDispatch) => {
    return {
        loadComments: (termIri: string) => dispatch(loadTermComments(VocabularyUtils.create(termIri))),
        createComment: (comment: Comment, termIri: string) => dispatch(createTermComment(comment, VocabularyUtils.create(termIri))),
        addReaction: (comment: Comment, reactionType: string) => dispatch(reactToComment(VocabularyUtils.create(comment.iri!), reactionType)),
        removeReaction: (comment: Comment) => dispatch(removeCommentReaction(VocabularyUtils.create(comment.iri!)))
    };
})(Comments);
