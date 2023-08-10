import { useRouter } from "next/router";
import Graph from "../components/Graph";

export default function Home({ results }) {
  const router = useRouter();

  return (
    <div className="contents">
      <div className="searchArea w-full mx-auto my-50 h-50 border-b-1 border-gray">
        <div className="title max-w-xl flex items-center justify-between h-30 mx-auto mt-0 mb-10">
          <p className="m-auto">Search</p>
        </div>
        <div className="tags flex justify-center">
          <span className="tag">#iot</span>
          <span className="tag">#spring</span>
          <span className="tag">#kernel</span>
        </div>
        <div className="searchBox w-full max-w-3xl m-auto justify-between flex items-stretch border-2 border-black">
          <input className="w-full h-47 inline-block leading-47 p-0"></input>
        </div>
        <div className="searchbutton max-w-xl flex items-center justify-between h-30 mx-auto mt-0 mb-10">
          <button className="m-auto">search</button>
        </div>
      </div>
      <div className="container flex justify-around items-center items-center h-30 mx-auto my-20">
          <div className="graph_area mx-50">
            <Graph width={"100%"} />
          </div>
          <div className="graph_area mx-50">
            <Graph width={"100%"} />
          </div>  
      </div>
        <style jsx global>{`
          .searchArea {
            border-bottom: solid 1px gray;
          }

          .searchBox {
            height: 50px;
          }

          .tags {
            margin-bottom: 5px;
          }

          .tag {
            margin: 5px 6px;
            color: white;
            border: solid 1 black;
            background-color: gray;
            border-radius: 30px;
            padding: 3px 8px;
            font-weight:lighter;
            font-size: 0.8em;
          }

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
