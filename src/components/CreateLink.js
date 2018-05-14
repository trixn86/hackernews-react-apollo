import React, {Component} from 'react';
import gql from 'graphql-tag';
import {graphql} from 'react-apollo';

class CreateLink extends Component {
    state = {
        description: '',
        url: '',
    };

    _createLink = async () => {
        const { description, url } = this.state;
        await this.props.postMutation({
            variables: {
                description,
                url,
            },
        })
    };

    render() {
        const {description, url} = this.state;

        return (
            <div>
                <div className="flex flex-column mt3">
                    <input
                        className="mb2"
                        value={description}
                        onChange={e => this.setState({description: e.target.value})}
                        type="text"
                        placeholder="A description for the link"
                    />
                    <input
                        className="mb2"
                        value={url}
                        onChange={e => this.setState({url: e.target.value})}
                        type="text"
                        placeholder="The URL for the link"
                    />
                </div>
                <button onClick={() => this._createLink()}>Submit</button>
            </div>
        );
    }
}

const POST_MUTATION = gql`
    mutation PostMutation($description: String!, $url: String!) {
        post(description: $description, url: $url) {
            id
            createdAt
            url
            description
        }
    }
`;

export default graphql(POST_MUTATION, {name: 'postMutation'})(CreateLink);
