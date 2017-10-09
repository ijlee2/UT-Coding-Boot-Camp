import React from "react";

// This Col component offers us the convinience of being able to set a column's "size" prop instead of its className
// We can also omit the col- at the start of each Bootstrap column class, e.g. size="md-12" instead of className="col-md-12"

const Col = props => {
  const size = props.size.split(" ").map(size => "col-" + size).join(" ");
  return (
    <div className={size}>
      {props.children}
    </div>
  );
};

export default Col;
