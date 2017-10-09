import React from "react";
import { Link, Route } from "react-router-dom";
import Learn from "./Learn";

const Contact = props =>
  <div>
    <h1>Contact Page</h1>
    <p>
      Integer cursus bibendum sem non pretium. Vestibulum in aliquet sem, quis
      molestie urna. Aliquam semper ultrices varius. Aliquam faucibus sit amet
      magna a ultrices. Aenean pellentesque placerat lacus imperdiet efficitur.
      In felis nisl, luctus non ante euismod, tincidunt bibendum mi. In a
      molestie nisl, eu sodales diam. Nam tincidunt lacus quis magna posuere,
      eget tristique dui dapibus. Maecenas fermentum elementum faucibus. Quisque
      nec metus vestibulum, egestas massa eu, sollicitudin ipsum. Nulla
      facilisi. Sed ut erat ligula. Nam tincidunt nunc in nibh dictum
      ullamcorper. Class aptent taciti sociosqu ad litora torquent per conubia
      nostra, per inceptos himenaeos. Etiam ornare rutrum felis at rhoncus.
      Etiam vel condimentum magna, quis tempor nulla.
    </p>
    <Link to={`${props.match.url}/learn`} className="btn btn-default">
      Learn More
    </Link>{" "}
    <Link to="/contact" className="btn btn-default">
      Learn Less
    </Link>
    <Route exact path={`${props.match.url}/learn`} component={Learn} />
  </div>;

export default Contact;
