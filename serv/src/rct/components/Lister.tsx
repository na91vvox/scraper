import { ScrapedItem } from "../model/ScrapedItem";
import ListedItem from "./ListedItem";

interface ListerProps {
    items: ScrapedItem[];
}

const Lister: React.FC<ListerProps> = ({items}) => {
    return (
        <>
            {items.map(item => <ListedItem {...item} />)}
        </>
    );
};

export default Lister;
