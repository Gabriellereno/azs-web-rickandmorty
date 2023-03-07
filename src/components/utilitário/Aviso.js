import React from "react";

function Aviso({ className, message }) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    setValue(message);
    setTimeout(() => {
      setValue(false);
    }, 9000);
  }, []);
  return (
    <>
      {value && (
        <div className={className}>
          <p>{value}</p>
        </div>
      )}
    </>
  );
}
export default Aviso;
