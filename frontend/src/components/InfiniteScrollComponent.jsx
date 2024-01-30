import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";

function InfiniteScrollComponent({
  apiEndpoint,
  scrollClass,
  boxClass,
  listClass,
  limit = 10,
  children,
}) {
  const [items, setItems] = useState([]);
  const [offset, setOffset] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const initialFetchDoneRef = useRef(false); // Ref to track initial fetch

  const fetchData = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        `${apiEndpoint}?offset=${offset}&limit=${limit}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setItems((prevItems) => [...prevItems, ...data]);
      setOffset((prevOffset) => prevOffset + 1);
      setHasMore(data.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint, limit, loading, offset]);

  useEffect(() => {
    if (!initialFetchDoneRef.current) {
      initialFetchDoneRef.current = true;
      fetchData();
    }
  }, []);

  const isBottom = (el) => {
    const scrollPosition = el.scrollTop + el.clientHeight;
    const bottomPosition = el.scrollHeight;
    return scrollPosition >= bottomPosition;
  };

  const handleScroll = useCallback(() => {
    if (
      containerRef.current &&
      isBottom(containerRef.current) &&
      hasMore &&
      !loading
    ) {
      fetchData();
    }
  }, [fetchData, hasMore, loading]);

  return (
    <div
      className={scrollClass}
      ref={containerRef}
      onScroll={(event) => handleScroll(event)}
    >
      <div className={boxClass}>
        <div className={listClass}>
          {items.map((item, index) => children(item, index))}
          {!hasMore && <p>No more items to load</p>}
          {loading && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

InfiniteScrollComponent.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  scrollClass: PropTypes.string.isRequired,
  boxClass: PropTypes.string.isRequired,
  listClass: PropTypes.string.isRequired,
  limit: PropTypes.number,
  children: PropTypes.func.isRequired,
};

InfiniteScrollComponent.defaultProps = {
  limit: 10,
};

export default InfiniteScrollComponent;
