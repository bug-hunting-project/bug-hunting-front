import { useRouter } from "next/router";
import Graph from "../components/Graph";

export default function Home({ results }) {
  const router = useRouter();

  return (
    <div className="contents">
      <div className="searchArea block flex items-center justify-between w-full mx-auto my-50 h-50">
        <div className="title max-w-1000">
          Search
        </div>
        <div className="searchBox w-full max-w-1000 m-auto justify-between flex items-stretch border-2 border-red-500">
          <div className="searchinput">
            <input></input>
          </div>
        </div>
        <div className="searchbutton">
            <button>search</button>
          </div>
      </div>
      <div className="container flex justify-around items-center">
          <div className="graph_area">
            <Graph />
          </div>
          <div className="graph_area ">
            <Graph />
          </div>  
      </div>
        <style jsx global>{`
          font-family{
            font-family: 'omyu_pretty';
            src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
        `}</style>
    </div>
  );

}
