import React, {PureComponent} from "react";
import Layout from "../components/layout";

class IndexPage extends PureComponent {
  render() {
    return <Layout>
      <h1 className="govuk-heading-xl">Hello World</h1>
    </Layout>
  }
}

export default IndexPage;