import Head from "~components/Navigation/Head";
import withAuthentication from "~containers/App/withAuthentication";

const Dashboard = () => (
	<>
		<Head title="Dashboard" />
		<h1>Dashboard</h1>
	</>
);

export default withAuthentication(Dashboard);
