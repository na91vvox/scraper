import { useState, useEffect } from 'react';
import '../App.css';
import Lister from './Lister';
import useScrapedItemFetcher from '../hooks/ScrapedItemFetcherHook';
import Pagination from './Pagination';
import { QueryResponse } from '../model/FetchResponse';

export const RESULT_COUNT_PER_PAGE = 50;

function App() {
  const { fetch } = useScrapedItemFetcher();
  const [currentQuery, setCurrentQuery] = useState<QueryResponse>();

  async function handlePageChange(page: number) {
    try {
      const response = (await fetch(page));
      setCurrentQuery(response);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    handlePageChange(1);
  }, []);

  return (
    <main>
      {currentQuery &&
        <>
          <Pagination
            currentPage={currentQuery.currentPage}
            totalPages={currentQuery.totalPagesCount}
            onPageChange={handlePageChange}
          />
          <Lister items={currentQuery.items} />
        </>
      }
    </main>
  )
}

export default App;
