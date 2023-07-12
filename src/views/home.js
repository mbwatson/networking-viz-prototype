import { useMemo } from "react";
import data from "../content/data.yaml";
import ForceGraph2D from "react-force-graph-2d";
import { SizeMe } from "react-sizeme";

//

const createPeopleNode = ({ id, name }) => ({
  id,
  name,
  val: 5,
  color: "coral",
});

const createOrganizationNode = ({ id, name, color }) => ({
  id,
  name,
  color,
  val: 15,
});

export const HomeView = () => {
  const { people, organizations } = data;

  const nodes = useMemo(() => {
    return [
      ...people.map(createPeopleNode),
      ...organizations.map(createOrganizationNode),
    ];
  }, []);

  const links = useMemo(() => {
    return [
      ...people.map(({ id, organization_id }) => ({
        source: id,
        target: organization_id,
      })),
    ];
  }, []);

  return (
    <div
      style={{
        height: "800px",
        border: "1px dashed #00788c",
      }}
    >
      <SizeMe monitorHeight>
        {({ size }) => {
          console.log(size);
          return (
            <ForceGraph2D
              width={size.width}
              height={size.height}
              graphData={{ nodes, links }}
            />
          );
        }}
      </SizeMe>
      {/*<pre>{JSON.stringify({ nodes, links }, null, 2)}</pre>*/}
    </div>
  );
};
