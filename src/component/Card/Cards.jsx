import React from "react";
import Forecast from "../Forecast/Forecast";
import './Card.css';

function Cards(props) {
  const {data} = props;

  return (
    <main className="card__main fade-in">
      <div className="flex detail-info-container flex-warp">
        {data ? <Forecast data={data} /> : <p data-testid="error-message">Error</p>}
      </div>
    </main>
  )
}

export default Cards;
