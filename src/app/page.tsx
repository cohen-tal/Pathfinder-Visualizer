import GraphComponent from "./components/graph/GraphComponent";

export default function Home() {
  return (
    //todo: change to GraphContainer component that will contain GraphComponent and GraphControls components
    <main className="flex min-h-[40dvh] flex-col items-center justify-between gap-4">
      <GraphComponent traversalAlgorithm="" startNode={0} endNode={5} />
    </main>
  );
}
