import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import cards from '../pages/cards';
import Error from './ErrorMessage';
import { CARDS_FOR_TODAY_QUERY } from './Cards'

const UPDATE_ANSWER_MUTATION = gql`
  mutation updateCardAnswer($cardId: ID!, $answer: String!) {
    updateCardAnswer(id: $cardId, answer: $answer) {
      id
      level
    }
  }
`;

class Card extends React.Component {
  state = {
    answered: false,
  };
  handleClick = e => {
    this.setState({
      answered: true,
    })
  }
  handleFeedback = async (feedback, updateAnswerMutation) => {
    await updateAnswerMutation({
      variables: {
        id: this.props.card.id,
        answer: feedback,
      },
    })
  }
  render() {
    const { card } = this.props;
    return (
      <div>
        {
          this.state.answered ?
          <Mutation
            mutation={UPDATE_ANSWER_MUTATION}
            variables={{
              cardId: card.id,
            }}
            refetchQueries={[{ query: CARDS_FOR_TODAY_QUERY }]}
          >
            {(updateCardAnswer, { loading, error }) => (
              <div className="back-content" >
                <Error error={error} />
                <button disabled={loading} onClick={e => this.handleFeedback('OK', updateCardAnswer)}>
                  OK
                </button>
                <button disabled={loading} onClick={e => this.handleFeedback('NOT_OK', updateCardAnswer)}>
                  NOT OK
                </button>
              </div>
            )}
          </Mutation>
          :
          <div className="front-content" onClick={this.handleClick} >
            {card.frontContent}
          </div>
        }
      </div>
    );
  }
}
export default Card;
export { UPDATE_ANSWER_MUTATION };
