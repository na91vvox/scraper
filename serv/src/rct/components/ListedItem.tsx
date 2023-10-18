import { ScrapedItem } from "../model/ScrapedItem";

type ListedItemProps = ScrapedItem;

const ListedItem: React.FC<ListedItemProps> = ({ title, image }) => {
    return (
        <article>
            <p>{title}</p>
            <img src={image} alt="Obrázek nemovitosti"></img>
        </article>
    );
};

export default ListedItem;
