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
    </div>
  );

}
