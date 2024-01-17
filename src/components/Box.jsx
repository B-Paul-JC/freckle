export const Box = ({ props }) => {
  const { clicker } = props;

  return <button onClick={clicker} className="box-spaces"></button>;
};
