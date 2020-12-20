import * as React from "react";
import Forecast from "../Forecast/Forecast";
import './Card.css';


interface ICardProps {
  data: {
    consolidated_weather: []
  }
}

function Cards(props: ICardProps) {
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
