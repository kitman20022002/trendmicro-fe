import React from "react";
import Spinner from "../component/UI/Spinner";
import Forecast from "../component/Forecast/Forecast";
import './Card.css';

function Cards(props) {
  let data = (<Spinner />);
  if (props.isLoaded) {
    data = (
      <main className="card__main fade-in">
        <div className="flex detail-info-container flex-warp">
          <Forecast data={props.data} />
        </div>
      </main>
    );
  }
  return data;
}

export default Cards;
