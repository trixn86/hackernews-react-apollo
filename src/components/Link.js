import React, { Component } from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

import {AUTH_TOKEN} from '../constants';
import {timeDifferenceForDate} from '../utils';


class Link extends Component {
    render() {
        const authToken = localStorage.getItem(AUTH_TOKEN);
        const {index, link} = this.props;

        return (
            <div className="flex mt2 items-start">
                <div className="flex items-center">
                    <span className="gray">{index + 1}.</span>
                    {authToken && (
                        <div className="ml1 gray f11" onClick={() => this._voteForLink()}>
                            ▲
                        </div>
                    )}
                </div>
                <div className="ml1">
                    <div>
                        {link.description} ({link.url})
                    </div>
                    <div className="f6 lh-copy gray">
                        {link.votes.length} votes | by{' '}
                        {link.postedBy
                            ? link.postedBy.name
                            : 'Unknown'}{' '}
                        {timeDifferenceForDate(link.createdAt)}
                    </div>
                </div>
            </div>
        );
    }

    _voteForLink = async () => {
        const {link: {id: linkId}, voteMutation, updateStoreAfterVote} = this.props;

        await voteMutation({
            variables: {
                linkId,
            },
            update: (store, {data: {vote}}) => {
                updateStoreAfterVote(store, vote, linkId)
            }
        })
    }
}

const VOTE_MUTATION = gql`
    mutation VoteMutation($linkId: ID!) {
        vote(linkId: $linkId) {
            id
            link {
                votes {
                    id
                    user {
                        id
                    }
                }
            }
            user {
                id
            }
        }
    }
`;


export default graphql(VOTE_MUTATION, {name: 'voteMutation'})(Link);
