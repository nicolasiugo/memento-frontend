import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Card from './Card';

const CARDS_FOR_TODAY_QUERY = gql`
  query CARDS_FOR_TODAY_QUERY {
    cardsForToday {
      id
      level
      frontContent
      backContent
      lastReviewdAt
    }
  }
`;


const Center = styled.div`
  text-align: center;
`;


class Cards extends Component {
  render() {
    return (
      <Center>
        <Query
          query={CARDS_FOR_TODAY_QUERY}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;

            const cards = data.cardsForToday;
            if (!cards || cards.length == 0) {
              return (
                <div>
                  Ya repasaste todas las cartas del día.
                  Volvé mañana!
                </div>
              );
            } else {
              return (
                <Card card={cards[0]}  key={cards[0].id} />
              );
            }
          }}
        </Query>
      </Center>
    );
  }
}

export default Cards;
export { CARDS_FOR_TODAY_QUERY };
