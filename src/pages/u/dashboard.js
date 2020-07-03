import Head from "~components/Navigation/Head";
import withAuthentication from "~containers/App/withAuthentication";

const Dashboard = () => (
  <>
    <Head title="Dashboard" url="u/dashboard" />
    <h1>Dashboard</h1>
  </>
);

export default withAuthentication(Dashboard);
