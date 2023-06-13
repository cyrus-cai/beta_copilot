import { Button, Card, Image, Link, Text } from "@geist-ui/core";

interface CardProps {
  imageSrc: String;
  title: String;
  description: String;
  url: String;
  AppStatus: number;
  createdAt?: String;
  existed?: boolean;
  handleAdd?: () => Promise<void>;
  handleRemove?: () => Promise<void>;
}

const CardComponent: React.FC<CardProps> = ({
  title,
  description,
  existed,
  handleAdd,
  handleRemove,
}) => {
  return (
    <Card width="400px">
      <Image
        src="https://user-images.githubusercontent.com/11304944/76085431-fd036480-5fec-11ea-8412-9e581425344a.png"
        height="200px"
        width="400px"
        draggable={false}
        alt="image"
      />
      <Text h4 mb={0}>
        {title}
      </Text>
      <Text type="secondary" small>
        {description}
      </Text>
      {
        existed && <Card.Footer>
          <Button auto type="abort" disabled scale={0.35} onClick={handleAdd}>
            Already Added
          </Button>
        </Card.Footer>}
      {handleAdd && <Card.Footer>
        <Button auto type="success" scale={0.35} onClick={handleAdd}>
          Add to My Space
        </Button>
      </Card.Footer>}
      {handleRemove && <Card.Footer>
        <Button auto type="error" scale={0.35} onClick={handleRemove}>
          Remove from My Space
        </Button>
      </Card.Footer>}
    </Card>
  );
};

export default CardComponent;
