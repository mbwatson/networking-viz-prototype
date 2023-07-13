import { useMemo } from "react";
import data from "../content/data.yaml";
import ForceGraph2D from "react-force-graph-2d";
import { SizeMe } from "react-sizeme";

//

const createPeopleNode = ({ id, name }) => ({
  id,
  name,
  val: 2,
  color: '#666',
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
  }, [people, organizations]);

  const links = useMemo(() => {
    return people.reduce((acc, person) => {
      return [
        ...acc,
        ...person.organization_ids.map(orgId => ({
          source: person.id,
          target: orgId,
        })),
      ]
    }, []);
  }, [people, organizations]);

  console.log(links)

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
