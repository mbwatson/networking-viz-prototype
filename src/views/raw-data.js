import data from "../content/data.yaml";

//

export const RawDataView = () => {
  return <pre style={{ fontSize: "75%" }}>{JSON.stringify(data, null, 2)}</pre>;
};
