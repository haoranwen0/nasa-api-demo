import React, { useState, useEffect } from "react";
import Card from "./Card";
import { Bars } from "react-loading-icons";

import "../css/SearchPage.css";

function SearchPage(props) {
  const url = localStorage.getItem("url");
  const [data, updateData] = useState({
    collection: { items: [], metadata: { total_hits: 0 } },
  });
  const [loading, updateLoading] = useState(false);
  const [hitCountMax, updateHitCountMax] = useState(0);
  const [hitCountMin, updateHitCountMin] = useState(0);
  const [finalDiff, updateFinalDiff] = useState(0);

  useEffect(() => {
    fetchData(url, "first time");
    // console.log("fetched");
    //eslint-disable-next-line
  }, [props]);

  const handlePrev = () => {
    fetchData(data.collection.links[0].href, "prev");
  };

  const handleNext = () => {
    if (data.collection.links.length > 1) {
      fetchData(data.collection.links[1].href, "next");
    } else {
      fetchData(data.collection.links[0].href, "next");
    }
  };

  async function fetchData(url, state) {
    updateLoading((prev) => !prev);
    let httpsUrl = "";
    if (url[4] !== "s") {
      httpsUrl = url.substring(0, 4) + "s" + url.substring(4);
    } else {
      httpsUrl = url;
    }
    // console.log(httpsUrl);
    const response = await fetch(httpsUrl);
    const data = await response.json();
    // console.log(data);
    if (state === "first time") {
      updateHitCountMax(data.collection.items.length);
      if (data.collection.metadata.total_hits > 0) {
        updateHitCountMin(1);
      }
    } else if (state === "next") {
      const diff = data.collection.metadata.total_hits - hitCountMax;
      updateHitCountMin((prev) => prev + 100);
      updateHitCountMax((prev) => prev + data.collection.items.length);
      if (diff < 100) {
        updateFinalDiff(diff);
      }
    } else if (state === "prev") {
      updateHitCountMin((prev) => prev - 100);
      if (hitCountMax === data.collection.metadata.total_hits) {
        updateHitCountMax((prev) => prev - finalDiff);
      } else {
        updateHitCountMax((prev) => prev - 100);
      }
    }
    updateData(data);
    updateLoading((prev) => !prev);
  }

  return (
    <div className="search-page">
      <div className="search-page-wrapper">
        {loading ? (
          <Bars stroke="#160040" width="35" speed={1} />
        ) : (
          <>
            <div className="search-results-container">
              <span>
                Showing {hitCountMin} - {hitCountMax} of{" "}
                {data.collection.metadata.total_hits} hits.
              </span>
              <div className="search-selections">
                {data.collection.links && (
                  <>
                    {(data.collection.links.length > 1 ||
                      data.collection.links[0].rel === "prev") && (
                      <span
                        onClick={handlePrev}
                        className="hover-underline-animation"
                      >
                        Previous
                      </span>
                    )}
                    {(data.collection.links.length > 1 ||
                      data.collection.links[0].rel === "next") && (
                      <span
                        onClick={handleNext}
                        className="hover-underline-animation"
                      >
                        Next
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
            {data.collection.items.map((result, index) => (
              <Card
                key={index}
                title={result.data[0].title}
                description={result.data[0].description}
                mediaType={result.links[0].render}
                date={new Date(result.data[0].date_created).toString()}
                url={result.links[0].href}
                share={true}
              />
            ))}
            <div
              style={{ paddingBottom: "1px", height: "0px", width: "100%" }}
            />
            {data.collection.metadata.total_hits > 100 && (
              <div className="search-results-container">
                <span>
                  Showing {hitCountMin} - {hitCountMax} of{" "}
                  {data.collection.metadata.total_hits} hits.
                </span>
                <div className="search-selections">
                  {data.collection.links && (
                    <>
                      {(data.collection.links.length > 1 ||
                        data.collection.links[0].rel === "prev") && (
                        <span
                          onClick={handlePrev}
                          className="hover-underline-animation"
                        >
                          Previous
                        </span>
                      )}
                      {(data.collection.links.length > 1 ||
                        data.collection.links[0].rel === "next") && (
                        <span
                          onClick={handleNext}
                          className="hover-underline-animation"
                        >
                          Next
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
