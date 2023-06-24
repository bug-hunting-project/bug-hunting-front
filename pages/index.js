import { useRouter } from "next/router";
import Graph from "../components/Graph";

export default function Home({ results }) {
  const router = useRouter();

  return (
    <div className="contents bg-blue-100 w-1000 my-20">
      <div className="container flex mx-0 my-auto">
          <div className="graph_area w-1/2 flex-1 px-10 justify-center">
            <Graph />
          </div>
          <div className="graph_area w-1/2 flex-1 px-10 justify-center">
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
