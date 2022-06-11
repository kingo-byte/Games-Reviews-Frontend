import React from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
// import useFetch from "../hooks/useFetch";

const REVIEW = gql`
  query get($id: ID!) {
    review(id: $id) {
      data {
        id
        attributes {
          title
          body
          rating
          categories {
            data {
              id
              attributes {
                name
              }
            }
          }
        }
      }
    }
  }
`;

function ReviewDetails() {
  //this gives us the id of the review
  const { id } = useParams();

  // const { loading, error, data } = useFetch(
  //   "http://localhost:1337/api/reviews/" + id
  // );

  const { loading, error, data } = useQuery(REVIEW, {
    variables: { id: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <div className="review-card">
        <div className="rating">{data.review.data.attributes.rating}</div>
        <h2>{data.review.data.attributes.title}</h2>

        <small>
          {data.review.data.attributes.categories.data.map((c) => (
            <small key={c.id}>{c.attributes.name}</small>
          ))}
        </small>

        <p>{data.review.data.attributes.body} </p>
      </div>
    </div>
  );
}

export default ReviewDetails;
