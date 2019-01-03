import React, { Component } from 'react'
import HtmlEditor from '../components/HtmlEditor'
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import Form from './styles/Form';
import Error from './ErrorMessage';
import { CARDS_FOR_TODAY_QUERY } from './Cards'

const CREATE_CARD_MUTATION = gql`
  mutation CREATE_CARD_MUTATION($frontContent: String!, $backContent: String!) {
    createCard(frontContent: $frontContent, backContent: $backContent) {
      id
    }
  }
`;

class NewCard extends React.Component {
  state = {
    frontContent: '',
    backContent: '',
  };

  handleFrontContentChange = value => {
    this.setState({ frontContent: value });
  };

  handleBackContentChange = value => {
    this.setState({ backContent: value });
  };

  render() {
    return (
      <Mutation
        mutation={CREATE_CARD_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CARDS_FOR_TODAY_QUERY }]}
      >
        {(createCard, { error, loading }) => (
          <Form
            method="post"
            onSubmit={async e => {
              e.preventDefault();
              await createCard();
              this.setState({ frontContent: '', backContent: '' });
            }}
          >
            <Error error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <h1>Add Card</h1>
              <label htmlFor="description">
                Front
                <HtmlEditor onChange={this.handleFrontContentChange} value={this.state.frontContent} />
              </label>
              <label htmlFor="description">
                Back
                <HtmlEditor onChange={this.handleBackContentChange} value={this.state.backContent} />
              </label>

              <button type="submit">Save</button>
            </fieldset >
          </Form>
        )}
      </Mutation>
    )
  }
}

export default NewCard;
export { CREATE_CARD_MUTATION };