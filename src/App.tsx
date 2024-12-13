import axios from "axios";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Item from "./components/Item";
import Spinner from "./components/Spinner/Spinner";
import { Launch } from "./lib/types";

function App() {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (currPage: number) => {
    const response = await axios.get(
      `https://api.spacexdata.com/v3/launches?page=${currPage}`
    );
    return response.data;
  };

  const handleSearch = debounce(async (term: string) => {
    setIsLoading(true);

    const data: Launch[] = await fetchData(0);
    const filteredLaunches = data.filter((launch) =>
      launch.mission_name.toLowerCase().includes(term.toLowerCase())
    );

    setLaunches(filteredLaunches);
    setIsLoading(false);
  }, 500);

  const handleLoadMore = async (page: number) => {
    setIsLoading(true);
    const response = await fetchData(page);
    console.log(response.data);
    if (!response.data) return setHasMore(false);
    setLaunches([...launches, ...response.data]);
    setIsLoading(false);
  };

  useEffect(() => {
    const initialLoad = async () => {
      setIsLoading(true);
      const data = await fetchData(0);
      setLaunches(data);
      setIsLoading(false);
    };

    initialLoad();
  }, []);

  return (
    <div className="container">
      <div className="">
        <input
          type="search"
          placeholder="Search Launches"
          onChange={(event) => {
            const term = event.currentTarget.value;

            handleSearch(term);
          }}
          className=""
        />
        <div className="launch__wrapper">
          <InfiniteScroll
            pageStart={0}
            loadMore={handleLoadMore}
            hasMore={hasMore}
            loader={<Spinner />}
          >
            {!isLoading && (
              <ul className="launch__list ">
                {launches.map((launch, index) => (
                  <li
                    key={`${launch.flight_number}-${index}`}
                    className="launch__item"
                  >
                    <Item {...launch} />
                  </li>
                ))}
              </ul>
            )}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default App;
