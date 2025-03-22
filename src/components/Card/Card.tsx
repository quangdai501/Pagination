import {MockData} from '../../mocks'
type CardProps = {
  cardData: MockData;
};

const Card: React.FC<CardProps> = ({ cardData }) => {
  return (
    <div className="card">
      <h1 className="card__header">{cardData.header}</h1>
      <div className="card__content">{cardData.content}</div>
    </div>
  );
};

export default Card;
